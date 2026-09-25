/** Cookieless Plausible events. No-ops when analytics isn't configured. */
type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { plausible?: PlausibleFn }).plausible;
  if (typeof fn === "function") fn(event, props ? { props } : undefined);
}
