import { neon } from "@neondatabase/serverless";

import { DEFAULT_SECTIONS } from "../src/lib/seed-data.js";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);
const seedContacts = DEFAULT_SECTIONS.find((s) => s.key === "contacts");
const defaultMap = seedContacts.contentRu.map;

const rows = await sql`SELECT content_ru, content_ro FROM sections WHERE key = 'contacts'`;
const row = rows[0];
if (!row) {
  console.log("No contacts section");
  process.exit(0);
}

const contentRu = { ...(row.content_ru || {}), map: { ...defaultMap, ...(row.content_ru?.map || {}) } };
const contentRo = { ...(row.content_ro || {}), map: { ...defaultMap, ...(row.content_ro?.map || {}) } };

await sql`
  UPDATE sections
  SET content_ru = ${JSON.stringify(contentRu)}::jsonb,
      content_ro = ${JSON.stringify(contentRo)}::jsonb,
      updated_at = now()
  WHERE key = 'contacts'
`;

console.log("Added map config to contacts section");
