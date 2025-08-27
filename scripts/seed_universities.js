require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

/**
 * Uses Node 18+ global fetch
 */

async function fetchUniversitiesByCountry(country) {
  const url = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${country}: ${res.status}`);
  return res.json();
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Missing env: VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function upsertUniversities(unis) {
  if (!Array.isArray(unis) || unis.length === 0) return;
  // Deduplicate by slug to avoid multiple conflicts in one statement
  const bySlug = new Map();
  for (const u of unis) {
    const slug = slugify(u.name);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, {
        name: u.name,
        slug,
        country: u.country,
        website: (u.web_pages && u.web_pages[0]) || null,
        domain: (u.domains && u.domains[0]) || null,
      });
    }
  }

  const payload = Array.from(bySlug.values());

  // Upsert by unique slug
  const { error } = await supabase
    .from('universities')
    .upsert(payload, { onConflict: 'slug' });

  if (error) throw error;
}

async function main() {
  const countries = [
    'Canada', 'France', 'Germany', 'United Kingdom', 'United States',
    'Australia', 'Netherlands', 'Sweden', 'Switzerland', 'Norway', 'Turkey', 'China', 'Malaysia'
  ];

  for (const country of countries) {
    try {
      console.log(`Fetching universities for ${country}...`);
      const list = await fetchUniversitiesByCountry(country);
      console.log(`→ ${list.length} found. Inserting...`);
      await upsertUniversities(list);
      console.log(`✓ Inserted/updated ${country}`);
    } catch (err) {
      console.error(`✗ Skipping ${country} due to error:`, err?.message || err);
      continue;
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


