"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FieldName = "product" | "name" | "email" | "company" | "country" | "quantity" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const MESSAGE_HINTS: Record<string, string> = {
  green: "For example: region or cup profile, process, grade, timing, packaging, certifications or documents you need.",
  roasted: "For example: whole bean or ground, pack type, one-off or regular supply, timing, and any labelling rules in your market.",
  unsure: "Tell us a little about your business and what you are hoping to find.",
  "": "Anything that helps us understand your requirement: region, process, grade, format, timing or documents.",
};

const FIELD_ORDER: FieldName[] = ["product", "name", "email", "company", "country", "quantity", "message"];

export function InquiryForm({
  contactEmail,
  responseTime,
  turnstileSiteKey,
}: {
  contactEmail: string;
  responseTime: string;
  turnstileSiteKey: string;
}) {
  const [product, setProduct] = useState("");
  const [unsure, setUnsure] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const startedRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    const preset = new URLSearchParams(window.location.search).get("product");
    if (preset && ["green", "roasted", "unsure"].includes(preset)) setProduct(preset);
  }, []);

  useEffect(() => {
    if (status === "error") summaryRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status, errors]);

  const fallback = contactEmail ? ` If the problem continues, email us at ${contactEmail}.` : "";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrors({});
    setMessage("");
    const data = new FormData(event.currentTarget);
    data.set("source_page", window.location.pathname + window.location.search);
    try {
      const res = await fetch(event.currentTarget.action, {
        method: "POST",
        body: new URLSearchParams(data as unknown as Record<string, string>),
        headers: { Accept: "application/json" },
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; message?: string; errors?: Errors; reference?: string } | null;
      if (res.ok && body?.ok) {
        setReference(body.reference && body.reference !== "received" ? body.reference : "");
        setStatus("success");
        window.scrollTo({ top: 0 });
        return;
      }
      setErrors(body?.errors ?? {});
      setMessage((body?.message ?? "Your inquiry could not be sent.") + (body?.errors ? "" : fallback));
      setStatus("error");
    } catch {
      setMessage("Your inquiry could not be sent because of a connection problem. Please check your connection and try again." + fallback);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h2 ref={successRef} tabIndex={-1}>
          Thank you. We’ve received your inquiry.
        </h2>
        {reference && (
          <p>
            Your reference is <strong>{reference}</strong>.
          </p>
        )}
        <p>
          We’ll reply to the email address you gave{responseTime ? ` within ${responseTime}` : ""}, usually with a few questions about your
          requirement. Please check your spam folder if you don’t see our reply.
        </p>
        <p>
          <Link className="text-link" href="/how-it-works">
            Read how the process works <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    );
  }

  const errorId = (f: FieldName) => (errors[f] ? `${f}-error` : undefined);
  const describedBy = (f: FieldName, hint?: string) => [hint, errorId(f)].filter(Boolean).join(" ") || undefined;
  const fieldError = (f: FieldName) =>
    errors[f] ? (
      <p className="field-error" id={`${f}-error`}>
        <span aria-hidden="true">! </span>
        {errors[f]}
      </p>
    ) : null;

  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  return (
    <form className="inquiry-form" action="/api/inquiry" method="post" noValidate onSubmit={onSubmit}>
      {status === "error" && (
        <div className="form-alert" role="alert" tabIndex={-1} ref={summaryRef}>
          <p className="form-alert-title">Your inquiry has not been sent.</p>
          <p>{message}</p>
          {errorList.length > 0 && (
            <ul>
              {errorList.map((f) => (
                <li key={f}>
                  <a href={`#field-${f}`}>{errors[f]}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <fieldset className="field product-field" id="field-product" aria-describedby={errorId("product")}>
        <legend>
          What are you looking for? <span className="req">(required)</span>
        </legend>
        {fieldError("product")}
        <div className="choice-row">
          {[
            ["green", "Green coffee", "Unroasted, for roasting or trading"],
            ["roasted", "Roasted coffee", "For distribution, retail or hospitality"],
            ["unsure", "Not sure yet", "Tell us about your needs"],
          ].map(([value, label, sub]) => (
            <label key={value} className={`choice choice-${value}`}>
              <input
                type="radio"
                name="product"
                value={value}
                checked={product === value}
                onChange={() => setProduct(value)}
                required
              />
              <span className="choice-text">
                <span className="choice-label">{label}</span>
                <span className="choice-sub">{sub}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field-grid">
        <div className="field" id="field-name">
          <label htmlFor="name">
            Your name <span className="req">(required)</span>
          </label>
          {fieldError("name")}
          <input id="name" name="name" type="text" autoComplete="name" maxLength={120} required aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
        </div>
        <div className="field" id="field-email">
          <label htmlFor="email">
            Work email <span className="req">(required)</span>
          </label>
          {fieldError("email")}
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
        </div>
        <div className="field" id="field-company">
          <label htmlFor="company">
            Company <span className="req">(required)</span>
          </label>
          {fieldError("company")}
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={160} required aria-invalid={!!errors.company} aria-describedby={describedBy("company")} />
        </div>
        <div className="field" id="field-country">
          <label htmlFor="country">
            Destination country <span className="req">(required)</span>
          </label>
          <p className="hint" id="country-hint">Where the coffee would be shipped to.</p>
          {fieldError("country")}
          <input id="country" name="country" type="text" autoComplete="country-name" maxLength={80} required aria-invalid={!!errors.country} aria-describedby={describedBy("country", "country-hint")} />
        </div>
      </div>

      <fieldset className="field" id="field-quantity" aria-describedby={describedBy("quantity", "quantity-hint")}>
        <legend>
          Approximate quantity <span className="req">(required, or tick “not sure yet”)</span>
        </legend>
        <p className="hint" id="quantity-hint">
          A rough figure per order or per year is fine. For reference, green coffee is often traded in 60 kg bags.
        </p>
        {fieldError("quantity")}
        <div className="quantity-row">
          <div>
            <label htmlFor="quantity_amount" className="visually-hidden">
              Amount
            </label>
            <input id="quantity_amount" name="quantity_amount" type="text" inputMode="decimal" placeholder="Amount" maxLength={12} disabled={unsure} aria-invalid={!!errors.quantity} />
          </div>
          <div>
            <label htmlFor="quantity_unit" className="visually-hidden">
              Unit
            </label>
            <select id="quantity_unit" name="quantity_unit" defaultValue="" disabled={unsure} aria-invalid={!!errors.quantity}>
              <option value="" disabled>
                Choose a unit
              </option>
              <option value="kg">kg</option>
              <option value="bags60">60 kg bags</option>
              <option value="tonnes">metric tonnes</option>
              <option value="containers">shipping containers</option>
            </select>
          </div>
          <label className="check">
            <input type="checkbox" name="quantity_unsure" value="yes" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} />
            <span>I’m not sure yet</span>
          </label>
        </div>
      </fieldset>

      <div className="field" id="field-message">
        <label htmlFor="message">
          Requirements or message <span className="opt">(optional)</span>
        </label>
        <p className="hint" id="message-hint">
          {MESSAGE_HINTS[product] ?? MESSAGE_HINTS[""]}
        </p>
        {fieldError("message")}
        <textarea id="message" name="message" rows={6} maxLength={4000} aria-invalid={!!errors.message} aria-describedby={describedBy("message", "message-hint")} />
      </div>

      {/* Spam protection: hidden from people; bots tend to fill it in. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="form_started" ref={startedRef} defaultValue="" />
      <input type="hidden" name="source_page" defaultValue="/inquiry" />

      {turnstileSiteKey && (
        <>
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
        </>
      )}

      <p className="privacy-line">
        We use your details only to respond to your inquiry and, where needed, share your requirement with exporters in our network to
        check what they can offer. See our <Link href="/privacy">privacy notice</Link>.
      </p>

      <button className="button button-green button-submit" type="submit" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
      <p className="visually-hidden" aria-live="polite">
        {status === "submitting" ? "Sending your inquiry" : ""}
      </p>
    </form>
  );
}
