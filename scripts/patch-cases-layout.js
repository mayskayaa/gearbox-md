import { neon } from "@neondatabase/serverless";

import { DEFAULT_SECTIONS } from "../src/lib/seed-data.js";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);
const seedCases = DEFAULT_SECTIONS.find((s) => s.key === "cases");

const rows = await sql`SELECT content_ru, content_ro FROM sections WHERE key = 'cases'`;
const row = rows[0];
if (!row) {
  console.log("No cases section");
  process.exit(0);
}

const contentRu = { ...(row.content_ru || {}), items: seedCases.contentRu.items };
const contentRo = { ...(row.content_ro || {}), items: seedCases.contentRo.items };

await sql`
  UPDATE sections
  SET content_ru = ${JSON.stringify(contentRu)}::jsonb,
      content_ro = ${JSON.stringify(contentRo)}::jsonb,
      updated_at = now()
  WHERE key = 'cases'
`;

console.log("Updated cases section text layout (titles, paragraphs, line breaks)");
