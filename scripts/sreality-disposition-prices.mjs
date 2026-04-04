/**
 * Sreality API scraper — cena za m² dle dispozice a města
 *
 * Účel: Zjistit dispozicní koeficienty (jak moc je 1+kk dražší na m² než 2+kk atd.)
 * Zdroj: Sreality.cz neoficiální API (nabídkové ceny, ne transakční)
 * Datum spuštění: viz výstup
 *
 * Výstup: Medián ceny za m² pro každé město × dispozice kombinaci
 *         + dispozicní koeficienty relativní k 2+kk
 */

const CITIES = [
  { slug: "praha",             localityParam: "locality_region_id=10"  },
  { slug: "brno",              localityParam: "locality_district_id=72" },
  { slug: "ostrava",           localityParam: "locality_district_id=65" },
  { slug: "plzen",             localityParam: "locality_district_id=12" },
  { slug: "ceske-budejovice",  localityParam: "locality_district_id=1"  },
  { slug: "hradec-kralove",    localityParam: "locality_district_id=28" },
  { slug: "liberec",           localityParam: "locality_district_id=22" },
  { slug: "olomouc",           localityParam: "locality_district_id=42" },
  { slug: "pardubice",         localityParam: "locality_district_id=32" },
  { slug: "usti-nad-labem",    localityParam: "locality_district_id=27" },
  { slug: "karlovy-vary",      localityParam: "locality_district_id=10" },
  { slug: "jihlava",           localityParam: "locality_district_id=67" },
  { slug: "zlin",              localityParam: "locality_district_id=38" },
];

// category_sub_cb: 2=1+kk, 4=2+kk, 6=3+kk, 8=4+kk
const DISPOSITIONS = [
  { label: "1+kk", subCb: 2 },
  { label: "2+kk", subCb: 4 },
  { label: "3+kk", subCb: 6 },
  { label: "4+kk", subCb: 8 },
];

const PER_PAGE = 200;
const DELAY_MS = 400; // politeness delay between requests

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function parseAreaFromName(name) {
  // "Prodej bytu 2+kk 44 m²" → 44
  const match = name?.match(/(\d+)\s*m[²2]/);
  return match ? parseInt(match[1], 10) : null;
}

function median(arr) {
  if (!arr.length) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
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

async function fetchAllForCityDisposition(city, disposition) {
  const pricesPerM2 = [];
  let page = 1;
  let total = null;

  while (true) {
    const url = `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&category_sub_cb=${disposition.subCb}&${city.localityParam}&per_page=${PER_PAGE}&page=${page}`;
    
    const data = await fetchPage(url);
    
    if (total === null) {
      total = data.result_size || 0;
    }
    
    const estates = data._embedded?.estates || [];
    if (estates.length === 0) break;

    for (const estate of estates) {
      // Skip auctions
      if (estate.is_auction) continue;

      // Guard: verify the listing name contains the expected disposition string
      // (catches rare API miscategorizations)
      if (!estate.name?.includes(disposition.label)) continue;
      
      const price = estate.price_czk?.value_raw;
      const area = parseAreaFromName(estate.name);
      
      if (!price || !area) continue;
      if (price <= 0 || area < 15 || area > 300) continue;
      
      const pricePerM2 = price / area;
      
      // Sanity bounds: 15 000 – 600 000 Kč/m² (i.e. Prague luxury is ~300k, Ústí cheapest ~40k)
      if (pricePerM2 < 15_000 || pricePerM2 > 600_000) continue;
      
      pricesPerM2.push(pricePerM2);
    }

    const fetched = (page - 1) * PER_PAGE + estates.length;
    if (fetched >= total || estates.length < PER_PAGE) break;
    
    page++;
    await sleep(DELAY_MS);
  }

  return { pricesPerM2, total };
}

async function main() {
  const runDate = new Date().toISOString().slice(0, 10);
  console.log(`\n=== Sreality scrape — dispozicní ceny za m² ===`);
  console.log(`Datum: ${runDate}`);
  console.log(`Zdroj: Sreality.cz API (nabídkové ceny — nikoli transakční)`);
  console.log(`Kategorie: prodej bytů, pouze +kk dispozice, bez aukcí\n`);

  // results[citySlug][disposition] = { median, n, raw }
  const results = {};

  for (const city of CITIES) {
    results[city.slug] = {};
    process.stdout.write(`${city.slug}: `);

    for (const disp of DISPOSITIONS) {
      await sleep(DELAY_MS);
      try {
        const { pricesPerM2, total } = await fetchAllForCityDisposition(city, disp);
        const med = median(pricesPerM2);
        results[city.slug][disp.label] = {
          medianPricePerM2: med ? Math.round(med) : null,
          n: pricesPerM2.length,
          totalListings: total,
        };
        process.stdout.write(`${disp.label}(n=${pricesPerM2.length}) `);
      } catch (err) {
        results[city.slug][disp.label] = { error: err.message };
        process.stdout.write(`${disp.label}(ERR) `);
      }
    }
    console.log();
  }

  // Print results table
  console.log("\n=== VÝSLEDKY: Medián ceny za m² (Kč/m²) ===\n");
  const header = ["Město", "1+kk", "2+kk", "3+kk", "4+kk"];
  console.log(header.join("\t"));
  
  for (const city of CITIES) {
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const r = results[city.slug][disp.label];
      row.push(r?.medianPricePerM2 ? `${r.medianPricePerM2.toLocaleString("cs-CZ")} (n=${r.n})` : "N/A");
    }
    console.log(row.join("\t"));
  }

  // Print disposition coefficients (relative to 2+kk)
  console.log("\n=== DISPOZICNÍ KOEFICIENTY (relative to 2+kk = 1.00) ===\n");
  const header2 = ["Město", "1+kk koef.", "2+kk koef.", "3+kk koef.", "4+kk koef."];
  console.log(header2.join("\t"));
  
  const allCoefficients = { "1+kk": [], "3+kk": [], "4+kk": [] };

  for (const city of CITIES) {
    const base = results[city.slug]["2+kk"]?.medianPricePerM2;
    if (!base) continue;
    
    const row = [city.slug];
    for (const disp of DISPOSITIONS) {
      const med = results[city.slug][disp.label]?.medianPricePerM2;
      if (med && base) {
        const coef = med / base;
        row.push(coef.toFixed(3));
        if (disp.label !== "2+kk") allCoefficients[disp.label].push(coef);
      } else {
        row.push("N/A");
      }
    }
    console.log(row.join("\t"));
  }

  // National medians of coefficients
  console.log("\n=== NÁRODNÍ MEDIÁN KOEFICIENTŮ ===\n");
  for (const [disp, coefs] of Object.entries(allCoefficients)) {
    const med = median(coefs);
    console.log(`${disp}: ${med ? med.toFixed(3) : "N/A"} (z ${coefs.length} měst)`);
  }

  // Raw JSON output for copy-paste into TS
  console.log("\n=== RAW JSON pro TypeScript ===\n");
  console.log(JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
