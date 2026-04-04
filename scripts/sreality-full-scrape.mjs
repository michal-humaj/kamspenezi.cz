/**
 * Sreality API — kompletní scrape pro Tier 1 atributy
 *
 * Sbírá v jednom běhu:
 *   1. PRODEJ (category_type_cb=1) per dispozice per město:
 *      - medián výměry (m²) → squareMeters
 *      - medián ceny za m² → dispozicní koeficienty pro kupniCena
 *
 *   2. NÁJEM (category_type_cb=2) per dispozice per město:
 *      - medián ceny za m² → dispozicní koeficienty pro najemne
 *
 * Datum spuštění: viz výstup
 * Script: scripts/sreality-full-scrape.mjs
 */

const CITIES = [
  { slug: "praha",            saleParam:  "locality_region_id=10",   rentParam: "locality_region_id=10"   },
  { slug: "brno",             saleParam:  "locality_district_id=72",  rentParam: "locality_district_id=72"  },
  { slug: "ostrava",          saleParam:  "locality_district_id=65",  rentParam: "locality_district_id=65"  },
  { slug: "plzen",            saleParam:  "locality_district_id=12",  rentParam: "locality_district_id=12"  },
  { slug: "ceske-budejovice", saleParam:  "locality_district_id=1",   rentParam: "locality_district_id=1"   },
  { slug: "hradec-kralove",   saleParam:  "locality_district_id=28",  rentParam: "locality_district_id=28"  },
  { slug: "liberec",          saleParam:  "locality_district_id=22",  rentParam: "locality_district_id=22"  },
  { slug: "olomouc",          saleParam:  "locality_district_id=42",  rentParam: "locality_district_id=42"  },
  { slug: "pardubice",        saleParam:  "locality_district_id=32",  rentParam: "locality_district_id=32"  },
  { slug: "usti-nad-labem",   saleParam:  "locality_district_id=27",  rentParam: "locality_district_id=27"  },
  { slug: "karlovy-vary",     saleParam:  "locality_district_id=10",  rentParam: "locality_district_id=10"  },
  { slug: "jihlava",          saleParam:  "locality_district_id=67",  rentParam: "locality_district_id=67"  },
  { slug: "zlin",             saleParam:  "locality_district_id=38",  rentParam: "locality_district_id=38"  },
];

// category_sub_cb: 2=1+kk, 4=2+kk, 6=3+kk, 8=4+kk
const DISPOSITIONS = [
  { label: "1+kk", subCb: 2 },
  { label: "2+kk", subCb: 4 },
  { label: "3+kk", subCb: 6 },
  { label: "4+kk", subCb: 8 },
];

const PER_PAGE = 200;
const DELAY_MS = 350;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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

async function scrapeOneCombination({ categoryTypeCb, localityParam, disposition, priceFilter }) {
  const areas = [];
  const pricesPerM2 = [];
  let page = 1;
  let total = null;

  while (true) {
    await sleep(DELAY_MS);
    const url = `https://www.sreality.cz/api/cs/v2/estates`
      + `?category_main_cb=1`
      + `&category_type_cb=${categoryTypeCb}`
      + `&category_sub_cb=${disposition.subCb}`
      + `&${localityParam}`
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
      if (pricePerM2 < priceFilter.min || pricePerM2 > priceFilter.max) continue;

      areas.push(area);
      pricesPerM2.push(pricePerM2);
    }

    const fetched = (page - 1) * PER_PAGE + estates.length;
    if (fetched >= total || estates.length < PER_PAGE) break;
    page++;
  }

  return { areas, pricesPerM2, total: total ?? 0 };
}


async function sanityCheckCity(slug, localityParam, categoryTypeCb) {
  // Fetch a sample of 10 listings and verify that the MAJORITY are from the expected city.
  // The first listing alone is unreliable (premium/featured listings can be from nearby villages).
  const url = `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=${categoryTypeCb}&per_page=10&${localityParam}`;
  const data = await fetchPage(url);
  const estates = data._embedded?.estates ?? [];
  if (!estates.length) return { ok: false, msg: "no listings returned" };

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

async function main() {
  const runDate = new Date().toISOString().slice(0, 10);
  console.log(`\n=== Sreality kompletní scrape — ${runDate} ===\n`);

  // ── SANITY CHECK ────────────────────────────────────────────────────────────
  console.log("Sanity check lokalit (prodej):");
  for (const city of CITIES) {
    await sleep(DELAY_MS);
    const check = await sanityCheckCity(city.slug, city.saleParam, 1);
    console.log(`  ${city.slug}: ${check.ok ? "OK" : "CHYBA — " + check.msg}`);
    if (!check.ok) {
      console.error(`\nCHYBA: locality_id pro ${city.slug} zřejmě již neplatí. Ukončuji.`);
      process.exit(1);
    }
  }
  console.log();

  // ── PRODEJ ──────────────────────────────────────────────────────────────────
  console.log("Scraping PRODEJ (squareMeters + kupniCena koeficienty)...");
  const salePriceFilter = { min: 15_000, max: 600_000 };
  const saleResults = {};

  for (const city of CITIES) {
    saleResults[city.slug] = {};
    process.stdout.write(`  ${city.slug}: `);
    for (const disp of DISPOSITIONS) {
      const { areas, pricesPerM2, total } = await scrapeOneCombination({
        categoryTypeCb: 1,
        localityParam: city.saleParam,
        disposition: disp,
        priceFilter: salePriceFilter,
      });
      saleResults[city.slug][disp.label] = {
        medianArea: areas.length ? Math.round(median(areas)) : null,
        medianPricePerM2: pricesPerM2.length ? Math.round(median(pricesPerM2)) : null,
        n: areas.length,
        total,
      };
      process.stdout.write(`${disp.label}(n=${areas.length}) `);
    }
    console.log();
  }

  // ── NÁJEM ───────────────────────────────────────────────────────────────────
  console.log("\nScraping NÁJEM (najemne koeficienty)...");
  // Rental price per m²/month: typical range 100–800 Kč/m²/měsíc
  const rentPriceFilter = { min: 80, max: 800 };
  const rentResults = {};

  for (const city of CITIES) {
    rentResults[city.slug] = {};
    process.stdout.write(`  ${city.slug}: `);
    for (const disp of DISPOSITIONS) {
      const { pricesPerM2, total } = await scrapeOneCombination({
        categoryTypeCb: 2,
        localityParam: city.rentParam,
        disposition: disp,
        priceFilter: rentPriceFilter,
      });
      rentResults[city.slug][disp.label] = {
        medianRentPerM2: pricesPerM2.length ? Math.round(median(pricesPerM2)) : null,
        n: pricesPerM2.length,
        total,
      };
      process.stdout.write(`${disp.label}(n=${pricesPerM2.length}) `);
    }
    console.log();
  }

  // ── VÝSLEDKY ─────────────────────────────────────────────────────────────────
  console.log("\n=== SQUAREMETERS: Medián výměry (m²) ===\n");
  console.log(["Město", "1+kk", "2+kk", "3+kk", "4+kk"].join("\t"));
  for (const city of CITIES) {
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const r = saleResults[city.slug][disp.label];
      row.push(r?.medianArea != null ? `${r.medianArea} (n=${r.n})` : "N/A");
    }
    console.log(row.join("\t"));
  }

  console.log("\n=== KUPNICENA: Dispozicní koeficienty (prodej, vůči 2+kk) ===\n");
  const saleCoefs = { "1+kk": [], "3+kk": [], "4+kk": [] };
  console.log(["Město", "1+kk koef.", "2+kk koef.", "3+kk koef.", "4+kk koef."].join("\t"));
  for (const city of CITIES) {
    const base = saleResults[city.slug]["2+kk"]?.medianPricePerM2;
    if (!base) continue;
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const med = saleResults[city.slug][disp.label]?.medianPricePerM2;
      if (med && base) {
        const coef = med / base;
        row.push(coef.toFixed(3));
        if (disp.label !== "2+kk") saleCoefs[disp.label].push(coef);
      } else {
        row.push("N/A");
      }
    }
    console.log(row.join("\t"));
  }
  console.log("\nNárodní mediány (kupniCena koeficienty):");
  for (const [disp, coefs] of Object.entries(saleCoefs)) {
    console.log(`  ${disp}: ${median(coefs)?.toFixed(3)} (z ${coefs.length} měst)`);
  }

  console.log("\n=== NAJEMNE: Dispozicní koeficienty (nájem, vůči 2+kk) ===\n");
  const rentCoefs = { "1+kk": [], "3+kk": [], "4+kk": [] };
  console.log(["Město", "1+kk Kč/m²", "2+kk Kč/m²", "3+kk Kč/m²", "4+kk Kč/m²", "1+kk koef.", "3+kk koef.", "4+kk koef."].join("\t"));
  for (const city of CITIES) {
    const base = rentResults[city.slug]["2+kk"]?.medianRentPerM2;
    if (!base) continue;
    const priceRow = [city.slug];
    const coefParts = [];
    for (const disp of DISPOSITIONS) {
      const med = rentResults[city.slug][disp.label]?.medianRentPerM2;
      priceRow.push(med != null ? `${med} (n=${rentResults[city.slug][disp.label].n})` : "N/A");
      if (disp.label !== "2+kk") {
        if (med && base) {
          const coef = med / base;
          coefParts.push(coef.toFixed(3));
          rentCoefs[disp.label].push(coef);
        } else {
          coefParts.push("N/A");
        }
      }
    }
    console.log([...priceRow, ...coefParts].join("\t"));
  }
  console.log("\nNárodní mediány (najemne koeficienty):");
  for (const [disp, coefs] of Object.entries(rentCoefs)) {
    console.log(`  ${disp}: ${median(coefs)?.toFixed(3)} (z ${coefs.length} měst)`);
  }

  // ── RAW JSON ─────────────────────────────────────────────────────────────────
  console.log("\n=== RAW JSON ===\n");
  console.log(JSON.stringify({ runDate, sale: saleResults, rent: rentResults }, null, 2));
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
