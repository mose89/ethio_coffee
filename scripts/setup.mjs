/**
 * One-step local setup (Windows, macOS, Linux):  npm run setup
 *
 *  1. creates .env.local with a random secret (if missing)
 *  2. creates the local database
 *  3. asks for an email and password for the website editor (/admin)
 *  4. loads the starter categories, draft articles and photos
 */
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import readline from "node:readline/promises";

const run = (label, args, env = {}) => {
  console.log(`\n→ ${label}…`);
  const r = spawnSync("npx", args, { stdio: "inherit", shell: true, env: { ...process.env, ...env } });
  if (r.status !== 0) {
    console.error(`\n✖ ${label} failed. Scroll up for the error message.`);
    process.exit(1);
  }
};

if (!fs.existsSync(".env.local")) {
  fs.writeFileSync(".env.local", `PAYLOAD_SECRET=${randomBytes(32).toString("hex")}\n`);
  console.log("✔ Created .env.local with a random secret");
}

run("Creating the local database", ["payload", "migrate"]);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
console.log("\nChoose the login for the website editor (you can change it later).");
let email = "";
while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) email = (await rl.question("  Email: ")).trim();
let password = "";
while (password.length < 12) {
  password = await rl.question("  Password (at least 12 characters): ");
  if (password.length < 12) console.log("  That's too short, please try again.");
}
rl.close();

run("Creating your editor login", ["payload", "run", "scripts/create-admin.ts"], { ADMIN_EMAIL: email, ADMIN_PASSWORD: password });
run("Adding the starter articles (as drafts)", ["payload", "run", "scripts/seed.ts"]);
run("Adding the photos", ["payload", "run", "scripts/import-photos.ts"]);

console.log(`
✔ All set.

Next, type:   npm run dev
Then open:    http://localhost:3000        (the website)
              http://localhost:3000/admin  (the editor, log in with ${email})
`);
