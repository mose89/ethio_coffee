import { test } from "node:test";
import assert from "node:assert/strict";
import { looksLikeSpam, validateInquiry } from "../lib/inquiry.ts";

const form = (fields: Record<string, string>) => new URLSearchParams(fields);
const valid = {
  product: "green",
  name: "Ana Buyer",
  email: "Ana@Roastery.example",
  company: "Example Roastery",
  country: "Germany",
  quantity_amount: "40",
  quantity_unit: "bags60",
  message: "Washed, grade 1",
  source_page: "/inquiry?product=green",
};

test("accepts a complete inquiry and normalises it", () => {
  const r = validateInquiry(form(valid));
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.inquiry.email, "ana@roastery.example");
    assert.deepEqual(r.inquiry.quantity, { amount: 40, unit: "bags60" });
  }
});

test("accepts 'not sure' quantity without amount or unit", () => {
  const r = validateInquiry(form({ ...valid, quantity_amount: "", quantity_unit: "", quantity_unsure: "yes" }));
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.inquiry.quantity, "unsure");
});

test("reports each missing or invalid field", () => {
  const r = validateInquiry(form({ product: "honey", email: "not-an-email", quantity_amount: "-3" }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["company", "country", "email", "name", "product", "quantity"]);
});

test("requires a unit when an amount is given", () => {
  const r = validateInquiry(form({ ...valid, quantity_unit: "" }));
  assert.equal(r.ok, false);
});

test("rejects over-long messages", () => {
  const r = validateInquiry(form({ ...valid, message: "x".repeat(4001) }));
  assert.equal(r.ok, false);
});

test("ignores source pages that are not site paths", () => {
  const r = validateInquiry(form({ ...valid, source_page: "https://evil.example" }));
  assert.equal(r.ok && r.inquiry.sourcePage, "");
});

test("spam heuristics: honeypot and too-fast submissions", () => {
  assert.equal(looksLikeSpam(form({ company_website: "http://spam" })), true);
  assert.equal(looksLikeSpam(form({ form_started: String(Date.now()) })), true);
  assert.equal(looksLikeSpam(form({ form_started: String(Date.now() - 60_000) })), false);
  assert.equal(looksLikeSpam(form({})), false); // no JavaScript: never rejected on timing
});
