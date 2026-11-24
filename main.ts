// Entry program for make.fun bounty-entrants-03:
// "Bring the most entrants to the bounties you make on make.fun".
// This program reads BOUNTY.json at the repository root — the list of
// make.fun bounties this entry sponsors and counts — validates it, and
// prints a summary. It takes no input, makes no network calls, and uses
// only the Node.js standard library.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(root, "BOUNTY.json"), "utf8");
const data = JSON.parse(raw);

if (!data || !Array.isArray(data.bounties)) {
  console.error("BOUNTY.json must hold {\"bounties\": [...]}");
  process.exit(1);
}

const seen = new Set();
for (const item of data.bounties) {
  if (typeof item !== "string" || !item) {
    console.error("every bounty in BOUNTY.json must be a non-empty string");
    process.exit(1);
  }
  const slug = item
    .replace(/^https:\/\/make\.fun\/bounty\//, "")
    .replace(/^https:\/\/make\.fun\/c\//, "");
  if (seen.has(slug)) {
    console.error(`duplicate bounty in BOUNTY.json: ${slug}`);
    process.exit(1);
  }
  seen.add(slug);
}

console.log("bounty-entrants-03 entry");
console.log(`bounties counted: ${data.bounties.length}`);
for (const item of data.bounties) console.log(`- ${item}`);
