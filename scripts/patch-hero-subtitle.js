import { neon } from "@neondatabase/serverless";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`SELECT content_ru FROM sections WHERE key = 'hero'`;
const hero = rows[0];
if (!hero) {
  console.log("No hero section");
  process.exit(0);
}

const contentRu = hero.content_ru || {};
const oldSubtitle =
  "Узкоспециализированный сервис автоматических трансмиссий. Диагностика, ремонт и обслуживание любых типов АКПП - от легковых до спецтехники.";
const newSubtitle =
  "Узкоспециализированный сервис автоматических трансмиссий. Диагностика, ремонт и обслуживание любых типов АКПП -\nот легковых до спецтехники.";

if (contentRu.subtitle === newSubtitle) {
  console.log("Hero subtitle already updated");
  process.exit(0);
}

if (
  contentRu.subtitle &&
  contentRu.subtitle !== oldSubtitle &&
  !contentRu.subtitle.includes("АКПП - от легковых")
) {
  console.log("Hero subtitle was customized; updating line break only if pattern matches");
  contentRu.subtitle = contentRu.subtitle.replace("АКПП - от ", "АКПП -\nот ");
} else {
  contentRu.subtitle = newSubtitle;
}

await sql`
  UPDATE sections
  SET content_ru = ${JSON.stringify(contentRu)}::jsonb,
      updated_at = now()
  WHERE key = 'hero'
`;

console.log("Updated hero subtitle line break");
