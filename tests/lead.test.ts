import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "../lib/lead.ts";
import { validateInquiry } from "../lib/inquiry.ts";

const form = (fields: Record<string, string>) => new URLSearchParams(fields);
const download = {
  kind: "download",
  download: "ethiopian-coffee-buyers-checklist",
  name: "Ana Buyer",
  email: "Ana@Roastery.example",
  company: "Example Roastery",
  buyer_type: "roaster",
  source_page: "/resources",
};

test("accepts a complete download request and normalises it", () => {
  const r = validateLead(form(download));
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.lead.email, "ana@roastery.example");
    assert.equal(r.lead.buyerType, "roaster");
    assert.equal(r.lead.marketingConsent, false);
  }
});

test("records marketing consent only when ticked", () => {
  const r = validateLead(form({ ...download, marketing_consent: "yes" }));
  assert.equal(r.ok && r.lead.marketingConsent, true);
});

test("download requires name, company, business type and a valid download", () => {
  const r = validateLead(form({ kind: "download", download: "../etc/passwd", email: "a@b.example" }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["buyer_type", "company", "download", "name"]);
});

test("newsletter needs only an email and implies consent", () => {
  const r = validateLead(form({ kind: "newsletter", email: "news@roastery.example" }));
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.lead.kind, "newsletter");
    assert.equal(r.lead.download, "");
    assert.equal(r.lead.marketingConsent, true);
  }
});

test("rejects an invalid email", () => {
  const r = validateLead(form({ kind: "newsletter", email: "not-an-email" }));
  assert.equal(r.ok, false);
});

test("rejects prototype keys as business type", () => {
  for (const bad of ["constructor", "toString", "__proto__"]) {
    const r = validateLead(form({ ...download, buyer_type: bad }));
    assert.equal(r.ok, false, bad);
  }
});

test("ignores an external source page", () => {
  const r = validateLead(form({ ...download, source_page: "https://evil.example" }));
  assert.equal(r.ok && r.lead.sourcePage, "");
});

const inquiry = {
  product: "green",
  name: "Ana Buyer",
  email: "ana@roastery.example",
  company: "Example Roastery",
  country: "Germany",
  quantity_unsure: "yes",
};

test("inquiry request type defaults to quote and accepts samples", () => {
  const a = validateInquiry(form(inquiry));
  assert.equal(a.ok && a.inquiry.requestType, "quote");
  const b = validateInquiry(form({ ...inquiry, request_type: "samples" }));
  assert.equal(b.ok && b.inquiry.requestType, "samples");
});

test("inquiry rejects unknown or prototype request types and products", () => {
  assert.equal(validateInquiry(form({ ...inquiry, request_type: "discount" })).ok, false);
  assert.equal(validateInquiry(form({ ...inquiry, request_type: "constructor" })).ok, false);
  assert.equal(validateInquiry(form({ ...inquiry, product: "toString" })).ok, false);
});
