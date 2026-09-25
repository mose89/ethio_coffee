"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const BUYER_OPTIONS: [string, string][] = [
  ["importer", "Importer / trader"],
  ["roaster", "Roaster"],
  ["distributor", "Distributor / wholesaler"],
  ["retailer", "Retailer"],
  ["hospitality", "Hospitality"],
  ["other", "Other"],
];

const CONSENT = "Send me occasional Ethiopian crop updates and current coffee offers by email. I can unsubscribe at any time.";

type Result = { ok?: boolean; message?: string; errors?: Record<string, string>; downloadUrl?: string };

async function submit(form: HTMLFormElement): Promise<Result> {
  const data = new FormData(form);
  data.set("source_page", window.location.pathname);
  try {
    const res = await fetch("/api/lead", { method: "POST", body: new URLSearchParams(data as unknown as Record<string, string>), headers: { Accept: "application/json" } });
    const body = ((await res.json().catch(() => ({}))) ?? {}) as Result;
    return res.ok ? body : { ...body, ok: false };
  } catch {
    return { ok: false, message: "Connection problem. Please check your connection and try again." };
  }
}

function useStarted() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  return ref;
}

function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Leave this field empty
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function DownloadForm({ slug, title }: { slug: string; title: string }) {
  const id = useId();
  const started = useStarted();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<Result>({});
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state === "error") alertRef.current?.focus();
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  if (state === "done" && result.downloadUrl) {
    return (
      <div className="lead-done" role="status">
        <p ref={doneRef} tabIndex={-1} className="lead-done-title">
          Your download is ready.
        </p>
        <a className="button button-green" href={result.downloadUrl} onClick={() => track("Download", { file: slug })}>
          Download {title}
        </a>
        <p className="lead-note">
          The link works for 7 days. Want help applying it? <Link href="/inquiry">Send us your brief</Link>.
        </p>
      </div>
    );
  }

  const err = (k: string) => result.errors?.[k];
  return (
    <form
      className="lead-form"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const r = await submit(e.currentTarget);
        setResult(r);
        if (r.ok && r.downloadUrl) {
          track("Lead", { source: `download:${slug}` });
          setState("done");
          window.location.assign(r.downloadUrl);
        } else setState("error");
      }}
    >
      {state === "error" && (
        <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef}>
          <p className="form-alert-title">Not sent yet.</p>
          <p>{result.message}</p>
        </div>
      )}
      <input type="hidden" name="kind" value="download" />
      <input type="hidden" name="download" value={slug} />
      <div className="lead-grid">
        <div className="field">
          <label htmlFor={`${id}-name`}>Name</label>
          {err("name") && <p className="field-error" id={`${id}-name-e`}>{err("name")}</p>}
          <input id={`${id}-name`} name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby={err("name") ? `${id}-name-e` : undefined} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>Work email</label>
          {err("email") && <p className="field-error" id={`${id}-email-e`}>{err("email")}</p>}
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required aria-invalid={!!err("email")} aria-describedby={err("email") ? `${id}-email-e` : undefined} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-company`}>Company</label>
          {err("company") && <p className="field-error" id={`${id}-company-e`}>{err("company")}</p>}
          <input id={`${id}-company`} name="company" autoComplete="organization" required aria-invalid={!!err("company")} aria-describedby={err("company") ? `${id}-company-e` : undefined} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-type`}>Your business</label>
          {err("buyer_type") && <p className="field-error" id={`${id}-type-e`}>{err("buyer_type")}</p>}
          <select id={`${id}-type`} name="buyer_type" defaultValue="" required aria-invalid={!!err("buyer_type")} aria-describedby={err("buyer_type") ? `${id}-type-e` : undefined}>
            <option value="" disabled>
              Choose one
            </option>
            {BUYER_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className="check consent">
        <input type="checkbox" name="marketing_consent" value="yes" />
        <span>{CONSENT}</span>
      </label>
      <Honeypot />
      <input type="hidden" name="form_started" ref={started} defaultValue="" />
      <button className="button button-green" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Preparing…" : "Get the free download"}
      </button>
      <p className="lead-note">
        We’ll never share your details. See our <Link href="/privacy">privacy notice</Link>.
      </p>
    </form>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const started = useStarted();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<Result>({});

  if (state === "done") {
    return (
      <p className="newsletter-done" role="status">
        Thank you, you’re on the list. We’ll be in touch with the next crop update.
      </p>
    );
  }
  return (
    <form
      className={`newsletter-form${compact ? " compact" : ""}`}
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const r = await submit(e.currentTarget);
        setResult(r);
        if (r.ok) {
          track("Lead", { source: "newsletter" });
          setState("done");
        } else setState("error");
      }}
    >
      <input type="hidden" name="kind" value="newsletter" />
      <div className="newsletter-row">
        <label htmlFor={`${id}-email`} className="visually-hidden">
          Work email
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="Your work email" required aria-invalid={!!result.errors?.email} aria-describedby={`${id}-msg`} />
        <label htmlFor={`${id}-type`} className="visually-hidden">
          Your business
        </label>
        <select id={`${id}-type`} name="buyer_type" defaultValue="">
          <option value="">Your business (optional)</option>
          {BUYER_OPTIONS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <button className="button button-light" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Signing up…" : "Subscribe"}
        </button>
      </div>
      <Honeypot />
      <input type="hidden" name="form_started" ref={started} defaultValue="" />
      <p id={`${id}-msg`} className={state === "error" ? "newsletter-error" : "newsletter-note"} role={state === "error" ? "alert" : undefined}>
        {state === "error"
          ? result.errors?.email || result.message
          : "Occasional crop updates and current offers. No spam; unsubscribe any time."}
      </p>
    </form>
  );
}
