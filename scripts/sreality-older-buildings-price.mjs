/**
 * Sreality API — scrape prodejních cen pro starší zástavbu (cihlové + panelové domy)
 *
 * Účel: Nahradit ČBA Monitor transakční ceny (pre-1995, pouze hypotéky) konzistentním
 * zdrojem nabídkových cen pro stejnou populaci bytů jako najemne.ts (cihlová + panelová).
 *
 * Filtr budov:
 *   building_type_cb[]=1  → cihlová zástavba
 *   building_type_cb[]=2  → panelová zástavba
 *   (vynechány: novostavby, montované, pasivní, nízkoenergetické)
 *
 * Haircut (nabídková → transakční cena):
 *   Kalibrován z měst, kde ČBA Monitor je spolehlivý (Praha, Brno, Ústí nad Labem):
 *   ČBA Monitor Q4 2025 transakční cena / Sreality starší zástavba nabídková cena
 *   → empirický korekční faktor pro převod nabídkových cen na transakční.
 *
 * Výstup:
 *   - Medián nabídkové ceny Kč/m² per město per dispozice
 *   - Nové dispozicní koeficienty z filtered populace
 *   - Haircut faktor (empiricky kalibrovaný)
 *   - Finální transakční ceny po haircut
 *
 * Script: scripts/sreality-older-buildings-price.mjs
 */

const CITIES = [
  { slug: "praha",            localityParam: "locality_region_id=10"   },
  { slug: "brno",             localityParam: "locality_district_id=72"  },
  { slug: "ostrava",          localityParam: "locality_district_id=65"  },
  { slug: "plzen",            localityParam: "locality_district_id=12"  },
  { slug: "ceske-budejovice", localityParam: "locality_district_id=1"   },
  { slug: "hradec-kralove",   localityParam: "locality_district_id=28"  },
  { slug: "liberec",          localityParam: "locality_district_id=22"  },
  { slug: "olomouc",          localityParam: "locality_district_id=42"  },
  { slug: "pardubice",        localityParam: "locality_district_id=32"  },
  { slug: "usti-nad-labem",   localityParam: "locality_district_id=27"  },
  { slug: "karlovy-vary",     localityParam: "locality_district_id=10"  },
  { slug: "jihlava",          localityParam: "locality_district_id=67"  },
  { slug: "zlin",             localityParam: "locality_district_id=38"  },
];

// category_sub_cb: 2=1+kk, 4=2+kk, 6=3+kk, 8=4+kk
const DISPOSITIONS = [
  { label: "1+kk", subCb: 2 },
  { label: "2+kk", subCb: 4 },
  { label: "3+kk", subCb: 6 },
  { label: "4+kk", subCb: 8 },
];

// building_type_cb: 1=cihlová, 2=panelová (starší zástavba)
const BUILDING_TYPE_FILTER = "building_type_cb%5B%5D=1&building_type_cb%5B%5D=2";

const PER_PAGE = 200;
const DELAY_MS = 400;

// ČBA Monitor Q4 2025 transakční ceny (Kč/m²) — použity pro kalibraci haircut
// Pro Praha, Brno, Ústí je ČBA Monitor spolehlivý (gap vs Sreality ~5-7 % = normální sleva)
const CBA_MONITOR_Q4_2025 = {
  "praha":          145_000,
  "brno":           114_300,
  "hradec-kralove":  86_100,
  "pardubice":       84_000,
  "ceske-budejovice":81_100,
  "olomouc":         79_200,
  "plzen":           78_400,
  "zlin":            75_700,
  "liberec":         74_200,
  "jihlava":         68_100,
  "ostrava":         61_600,
  "karlovy-vary":    51_700,
  "usti-nad-labem":  46_400,
};

// Kalibrační města — kde ČBA Monitor je důvěryhodný (gap ≤ 8 %)
const HAIRCUT_CALIBRATION_CITIES = ["praha", "brno", "usti-nad-labem"];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Ověří, že locality_param stále mapuje na správné město.
// Pokud Sreality změní ID lokality, scrape by tiše vracel data jiného města.
async function sanityCheckCity(slug, localityParam) {
  const url = `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&per_page=10&${localityParam}`;
  const data = await fetchPage(url);
  const estates = data._embedded?.estates ?? [];
  if (!estates.length) return { ok: false, msg: "žádné výsledky" };

  const expected = {
    "praha": "praha", "brno": "brno", "ostrava": "ostrava", "plzen": "plzen",
    "ceske-budejovice": "ceske", "hradec-kralove": "hradec",
    "liberec": "liberec", "olomouc": "olomouc", "pardubice": "pardubice",
    "usti-nad-labem": "usti", "karlovy-vary": "karlovy",
    "jihlava": "jihlava", "zlin": "zlin",
  };
  const prefix = expected[slug];
  const matches = estates.filter(e => e.seo?.locality?.startsWith(prefix)).length;
  const ratio = matches / estates.length;

  if (ratio < 0.4) {
    const sample = estates.slice(0, 3).map(e => e.seo?.locality).join(", ");
    return { ok: false, msg: `pouze ${matches}/${estates.length} odpovídá '${prefix}', vzorky: ${sample}` };
  }
  return { ok: true, msg: `${matches}/${estates.length} odpovídá '${prefix}'` };
}

function parseAreaFromName(name) {
  const match = name?.match(/(\d+)\s*m[²2]/);
  return match ? parseInt(match[1], 10) : null;
}

function median(arr) {
  if (!arr.length) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

async function fetchPage(url) {
  const r = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Accept": "application/json",
    },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

async function scrapePrice({ localityParam, disposition }) {
  const pricesPerM2 = [];
  let page = 1;
  let total = null;

  while (true) {
    await sleep(DELAY_MS);
    const url = `https://www.sreality.cz/api/cs/v2/estates`
      + `?category_main_cb=1`
      + `&category_type_cb=1`       // prodej (sale)
      + `&category_sub_cb=${disposition.subCb}`
      + `&${localityParam}`
      + `&${BUILDING_TYPE_FILTER}`
      + `&per_page=${PER_PAGE}`
      + `&page=${page}`;

    const data = await fetchPage(url);
    if (total === null) total = data.result_size || 0;

    const estates = data._embedded?.estates || [];
    if (!estates.length) break;

    for (const estate of estates) {
      if (estate.is_auction) continue;
      if (!estate.name?.includes(disposition.label)) continue;

      const price = estate.price_czk?.value_raw;
      const area = parseAreaFromName(estate.name);

      if (!price || !area) continue;
      if (price <= 0 || area < 15 || area > 300) continue;

      const pricePerM2 = price / area;
      // Sanity bounds: 15 000–600 000 Kč/m²
      if (pricePerM2 < 15_000 || pricePerM2 > 600_000) continue;

      pricesPerM2.push(pricePerM2);
    }

    const fetched = (page - 1) * PER_PAGE + estates.length;
    if (fetched >= total || estates.length < PER_PAGE) break;
    page++;
  }

  return { pricesPerM2, total: total ?? 0 };
}

async function main() {
  const runDate = new Date().toISOString().slice(0, 10);
  console.log(`\n=== Sreality PRODEJ — starší zástavba (cihlová + panelová) — ${runDate} ===`);
  console.log(`Filtr: building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová)\n`);

  // ── SANITY CHECK ────────────────────────────────────────────────────────────
  console.log("Sanity check lokalit:");
  for (const city of CITIES) {
    await sleep(DELAY_MS);
    const check = await sanityCheckCity(city.slug, city.localityParam);
    console.log(`  ${city.slug}: ${check.ok ? "OK" : "CHYBA — " + check.msg}`);
    if (!check.ok) {
      console.error(`\nCHYBA: locality_id pro ${city.slug} zřejmě již neplatí. Ukončuji.`);
      process.exit(1);
    }
  }
  console.log();

  const results = {};

  for (const city of CITIES) {
    results[city.slug] = {};
    process.stdout.write(`  ${city.slug}: `);

    for (const disp of DISPOSITIONS) {
      const { pricesPerM2, total } = await scrapePrice({
        localityParam: city.localityParam,
        disposition: disp,
      });
      results[city.slug][disp.label] = {
        medianPricePerM2: pricesPerM2.length ? Math.round(median(pricesPerM2)) : null,
        n: pricesPerM2.length,
        total,
      };
      process.stdout.write(`${disp.label}(n=${pricesPerM2.length}) `);
    }
    console.log();
  }

  // ── VÝSLEDKY — nabídkové ceny Kč/m² ─────────────────────────────────────────
  console.log("\n=== VÝSLEDKY: Medián nabídkové ceny Kč/m² (starší zástavba) ===\n");
  console.log(["Město", "1+kk (n)", "2+kk (n)", "3+kk (n)", "4+kk (n)"].join("\t"));
  for (const city of CITIES) {
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const r = results[city.slug][disp.label];
      row.push(r?.medianPricePerM2 != null ? `${r.medianPricePerM2} (n=${r.n})` : `N/A (n=0)`);
    }
    console.log(row.join("\t"));
  }

  // ── DISPOZICNÍ KOEFICIENTY (z filtered populace) ─────────────────────────────
  console.log("\n=== DISPOZICNÍ KOEFICIENTY z starší zástavby (vůči 2+kk = 1.000) ===\n");
  const priceCoefs = { "1+kk": [], "3+kk": [], "4+kk": [] };
  console.log(["Město", "1+kk koef.", "2+kk", "3+kk koef.", "4+kk koef.", "Spolehlivost"].join("\t"));

  for (const city of CITIES) {
    const base = results[city.slug]["2+kk"]?.medianPricePerM2;
    if (!base) {
      console.log(`${city.slug}\tN/A\t-\tN/A\tN/A\tCHYBÍ 2+kk`);
      continue;
    }
    const row = [city.slug];
    const warnings = [];

    for (const disp of DISPOSITIONS) {
      const r = results[city.slug][disp.label];
      if (disp.label === "2+kk") {
        row.push(`1.000 (n=${r.n})`);
        continue;
      }
      if (!r?.medianPricePerM2) {
        row.push("N/A");
        warnings.push(`${disp.label}=N/A`);
        continue;
      }
      const coef = r.medianPricePerM2 / base;
      row.push(`${coef.toFixed(3)} (n=${r.n})`);
      if (r.n < 15) warnings.push(`${disp.label} n<15!`);
      priceCoefs[disp.label].push(coef);
    }
    row.push(warnings.length ? warnings.join(", ") : "OK");
    console.log(row.join("\t"));
  }

  console.log("\nNárodní mediány koeficientů (starší zástavba, prodej):");
  const nationalCoefs = {};
  for (const [disp, coefs] of Object.entries(priceCoefs)) {
    const med = median(coefs);
    nationalCoefs[disp] = med;
    if (coefs.length) {
      console.log(`  ${disp}: ${med?.toFixed(3)} (z ${coefs.length} měst)`);
    } else {
      console.log(`  ${disp}: N/A — žádná spolehlivá data`);
    }
  }

  // ── HAIRCUT KALIBRACE ─────────────────────────────────────────────────────────
  console.log("\n=== HAIRCUT KALIBRACE: ČBA Monitor transakční vs. Sreality nabídkové (2+kk) ===\n");
  console.log(["Město", "ČBA Monitor (tx)", "Sreality starší (ask)", "Haircut", "Korekční faktor"].join("\t"));

  const haircutFactors = [];
  for (const city of CITIES) {
    const cbaTx = CBA_MONITOR_Q4_2025[city.slug];
    const srealityAsk = results[city.slug]["2+kk"]?.medianPricePerM2;
    if (!cbaTx || !srealityAsk) continue;

    const factor = cbaTx / srealityAsk;
    const haircutPct = ((1 - factor) * 100).toFixed(1);
    const isCalibration = HAIRCUT_CALIBRATION_CITIES.includes(city.slug);

    console.log(`${city.slug}\t${cbaTx.toLocaleString()}\t${srealityAsk.toLocaleString()}\t${haircutPct}%\t${factor.toFixed(3)}${isCalibration ? " ← kalibrace" : ""}`);

    if (isCalibration && srealityAsk) {
      haircutFactors.push(factor);
    }
  }

  const empiricalHaircutFactor = median(haircutFactors);
  const empiricalHaircutPct = ((1 - empiricalHaircutFactor) * 100).toFixed(1);
  console.log(`\nEmpirický haircut faktor (medián z ${HAIRCUT_CALIBRATION_CITIES.join(", ")}): ${empiricalHaircutFactor?.toFixed(3)}`);
  console.log(`→ Nabídkové ceny jsou v průměru ${empiricalHaircutPct}% nad transakčními cenami`);

  // ── FINÁLNÍ TRANSAKČNÍ CENY PO HAIRCUT ───────────────────────────────────────
  console.log("\n=== FINÁLNÍ HODNOTY: Odhadované transakční ceny Kč/m² (po haircut) ===\n");
  console.log("(nabídková cena × haircut faktor, zaokrouhleno na 100 Kč/m²)\n");
  console.log(["Město", "Nabídková 2+kk", "Faktor", "Transakční 2+kk", "ČBA Monitor", "Rozdíl od ČBA"].join("\t"));

  const finalTxPrices = {};
  for (const city of CITIES) {
    const srealityAsk2kk = results[city.slug]["2+kk"]?.medianPricePerM2;
    const n2kk = results[city.slug]["2+kk"]?.n ?? 0;

    if (!srealityAsk2kk) {
      console.log(`${city.slug}\tN/A\t-\tN/A\t${CBA_MONITOR_Q4_2025[city.slug]}\t-`);
      continue;
    }

    const txPrice = Math.round(srealityAsk2kk * empiricalHaircutFactor / 100) * 100;
    const cba = CBA_MONITOR_Q4_2025[city.slug];
    const diffFromCba = cba ? `${((txPrice - cba) / cba * 100).toFixed(1)}%` : "N/A";

    finalTxPrices[city.slug] = { txPrice2kk: txPrice, n: n2kk, srealityAsk: srealityAsk2kk };
    console.log(`${city.slug}\t${srealityAsk2kk.toLocaleString()}\t${empiricalHaircutFactor?.toFixed(3)}\t${txPrice.toLocaleString()}\t${cba?.toLocaleString() ?? "N/A"}\t${diffFromCba}`);
  }

  // ── TYPESCRIPT VÝSTUP ─────────────────────────────────────────────────────────
  console.log("\n=== TYPESCRIPT SNIPPET — zkopírovat do kupni-cena.ts ===\n");
  console.log(`// Nabídkové ceny Kč/m² — starší zástavba (cihlová + panelová), Sreality ${runDate}`);
  console.log(`// Haircut faktor ${empiricalHaircutFactor?.toFixed(3)} (kalibrován z Praha/Brno/Ústí vs. ČBA Monitor Q4 2025)`);
  console.log(`const srealityStarsiZastavba2kk_${runDate.replace(/-/g, "_")}: PerCity<number> = {`);
  for (const city of CITIES) {
    const d = finalTxPrices[city.slug];
    if (d) {
      console.log(`  "${city.slug}": ${d.txPrice2kk}, // Sreality starší zástavba ask ${d.srealityAsk.toLocaleString()} × ${empiricalHaircutFactor?.toFixed(3)} = ${d.txPrice2kk.toLocaleString()} Kč/m² (n=${d.n})`);
    } else {
      console.log(`  "${city.slug}": ${CBA_MONITOR_Q4_2025[city.slug]}, // fallback ČBA Monitor — nedostatečný vzorek Sreality`);
    }
  }
  console.log(`};`);

  // ── RAW JSON ──────────────────────────────────────────────────────────────────
  console.log("\n=== RAW JSON ===\n");
  console.log(JSON.stringify({
    runDate,
    buildingTypeFilter: "cihlová+panelová",
    empiricalHaircutFactor,
    empiricalHaircutPct: parseFloat(empiricalHaircutPct),
    calibrationCities: HAIRCUT_CALIBRATION_CITIES,
    nationalCoefs,
    prices: results,
    finalTxPrices,
  }, null, 2));
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
