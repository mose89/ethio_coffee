import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("development CSP still allows React's eval() debugger", () => {
  const src = readFileSync(join(root, "next.config.ts"), "utf8");
  assert.match(src, /NODE_ENV/, "CSP must branch on NODE_ENV so production stays strict");
  assert.match(src, /unsafe-eval/, "script-src must include 'unsafe-eval' in development");
  assert.match(src, /isDev \? " 'unsafe-eval'" : ""/, "unsafe-eval must be development-only");
});

test("root body ignores attributes injected by browser extensions", () => {
  const src = readFileSync(join(root, "app/(site)/layout.tsx"), "utf8");
  assert.match(src, /<body[^>]*suppressHydrationWarning/, "body needs suppressHydrationWarning for ColorZilla and similar extensions");
});
