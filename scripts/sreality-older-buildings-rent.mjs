/**
 * Sreality API — scrape nájemného pro starší zástavbu (cihlové + panelové domy)
 *
 * Účel: Opravit nesoulad v najemne.ts, kde Deloitte Rent Index pokrývá všechny
 * typy bytů (včetně developerských projektů), zatímco kupniCena.ts používá
 * ČBA Monitor data pouze pro pre-1995 zástavbu. Tento scrape sjednocuje populaci:
 * nájemné sbíráme pouze pro cihlové + panelové domy (= starší zástavba),
 * která odpovídá datové základně kupniCena.
 *
 * Filtr budov:
 *   building_type_cb[]=1  → cihlová zástavba
 *   building_type_cb[]=2  → panelová zástavba
 *   (vynechány: 3=smíšená, 4=ostatní, 5=montovaná, 6=nízkoenergetická, 7=pasivní, 8=novostavba)
 *
 * Výstup:
 *   - Medián nájemného Kč/m²/měsíc per město per dispozice
 *   - Vzorky n per kombinaci
 *   - Národní mediány dispozicních koeficientů (vůči 2+kk = 1.000)
 *
 * Datum spuštění: viz výstup
 * Script: scripts/sreality-older-buildings-rent.mjs
 */

const CITIES = [
  { slug: "praha",            rentParam: "locality_region_id=10"   },
  { slug: "brno",             rentParam: "locality_district_id=72"  },
  { slug: "ostrava",          rentParam: "locality_district_id=65"  },
  { slug: "plzen",            rentParam: "locality_district_id=12"  },
  { slug: "ceske-budejovice", rentParam: "locality_district_id=1"   },
  { slug: "hradec-kralove",   rentParam: "locality_district_id=28"  },
  { slug: "liberec",          rentParam: "locality_district_id=22"  },
  { slug: "olomouc",          rentParam: "locality_district_id=42"  },
  { slug: "pardubice",        rentParam: "locality_district_id=32"  },
  { slug: "usti-nad-labem",   rentParam: "locality_district_id=27"  },
  { slug: "karlovy-vary",     rentParam: "locality_district_id=10"  },
  { slug: "jihlava",          rentParam: "locality_district_id=67"  },
  { slug: "zlin",             rentParam: "locality_district_id=38"  },
];

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

// Nájemné: rozumný rozsah Kč/m²/měsíc
const RENT_PRICE_FILTER = { min: 80, max: 800 };

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Ověří, že locality_param stále mapuje na správné město.
// Pokud Sreality změní ID lokality, scrape by tiše vracel data jiného města.
async function sanityCheckCity(slug, localityParam) {
  const url = `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=2&per_page=10&${localityParam}`;
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
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

async function scrapeRent({ localityParam, disposition }) {
  const pricesPerM2 = [];
  let page = 1;
  let total = null;

  while (true) {
    await sleep(DELAY_MS);
    const url = `https://www.sreality.cz/api/cs/v2/estates`
      + `?category_main_cb=1`
      + `&category_type_cb=2`
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
      if (pricePerM2 < RENT_PRICE_FILTER.min || pricePerM2 > RENT_PRICE_FILTER.max) continue;

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
  console.log(`\n=== Sreality NÁJEM — starší zástavba (cihlová + panelová) — ${runDate} ===`);
  console.log(`Filtr: building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová)\n`);

  // ── SANITY CHECK ────────────────────────────────────────────────────────────
  console.log("Sanity check lokalit:");
  for (const city of CITIES) {
    await sleep(DELAY_MS);
    const check = await sanityCheckCity(city.slug, city.rentParam);
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
      const { pricesPerM2, total } = await scrapeRent({
        localityParam: city.rentParam,
        disposition: disp,
      });
      results[city.slug][disp.label] = {
        medianRentPerM2: pricesPerM2.length ? Math.round(median(pricesPerM2)) : null,
        n: pricesPerM2.length,
        total,
      };
      process.stdout.write(`${disp.label}(n=${pricesPerM2.length}) `);
    }
    console.log();
  }

  // ── VÝSLEDKY — medián Kč/m²/měsíc ──────────────────────────────────────────
  console.log("\n=== VÝSLEDKY: Medián nájemného Kč/m²/měsíc (starší zástavba) ===\n");
  console.log(["Město", "1+kk (n)", "2+kk (n)", "3+kk (n)", "4+kk (n)"].join("\t"));
  for (const city of CITIES) {
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const r = results[city.slug][disp.label];
      row.push(r?.medianRentPerM2 != null ? `${r.medianRentPerM2} (n=${r.n})` : `N/A (n=0)`);
    }
    console.log(row.join("\t"));
  }

  // ── DISPOZICNÍ KOEFICIENTY ───────────────────────────────────────────────────
  console.log("\n=== DISPOZICNÍ KOEFICIENTY (vůči 2+kk = 1.000) ===\n");
  const rentCoefs = { "1+kk": [], "3+kk": [], "4+kk": [] };
  console.log(["Město", "1+kk koef.", "2+kk", "3+kk koef.", "4+kk koef.", "Spolehlivost"].join("\t"));

  for (const city of CITIES) {
    const base = results[city.slug]["2+kk"]?.medianRentPerM2;
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
      if (!r?.medianRentPerM2) {
        row.push("N/A");
        warnings.push(`${disp.label}=N/A`);
        continue;
      }
      const coef = r.medianRentPerM2 / base;
      row.push(`${coef.toFixed(3)} (n=${r.n})`);
      if (r.n < 10) warnings.push(`${disp.label} n<10!`);
      rentCoefs[disp.label].push(coef);
    }
    row.push(warnings.length ? warnings.join(", ") : "OK");
    console.log(row.join("\t"));
  }

  console.log("\nNárodní mediány koeficientů (starší zástavba):");
  for (const [disp, coefs] of Object.entries(rentCoefs)) {
    if (coefs.length) {
      console.log(`  ${disp}: ${median(coefs)?.toFixed(3)} (z ${coefs.length} měst)`);
    } else {
      console.log(`  ${disp}: N/A — žádná spolehlivá data`);
    }
  }

  // ── SROVNÁNÍ S DELOITTE ──────────────────────────────────────────────────────
  const deloitte2kk = {
    "praha": 459, "brno": 392, "ostrava": 239, "plzen": 294,
    "ceske-budejovice": 277, "hradec-kralove": 317, "liberec": 271,
    "olomouc": 293, "pardubice": 307, "usti-nad-labem": 221,
    "karlovy-vary": 256, "jihlava": 256, "zlin": 290,
  };

  console.log("\n=== SROVNÁNÍ: Starší zástavba (Sreality) vs. Deloitte (všechny typy) — 2+kk ===\n");
  console.log(["Město", "Sreality starší", "Deloitte celkem", "Rozdíl %"].join("\t"));
  for (const city of CITIES) {
    const srealityVal = results[city.slug]["2+kk"]?.medianRentPerM2;
    const deloitteVal = deloitte2kk[city.slug];
    if (srealityVal && deloitteVal) {
      const diff = ((srealityVal - deloitteVal) / deloitteVal * 100).toFixed(1);
      console.log(`${city.slug}\t${srealityVal}\t${deloitteVal}\t${diff}%`);
    }
  }

  // ── RAW JSON ─────────────────────────────────────────────────────────────────
  console.log("\n=== RAW JSON ===\n");
  console.log(JSON.stringify({ runDate, buildingTypeFilter: "cihlová+panelová", rent: results }, null, 2));
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
