import { site } from "@/lib/site";

/** Loads Plausible (cookieless, no consent banner needed) when analytics_domain is set in site.config.json. */
export function Analytics() {
  if (!site.analyticsDomain) return null;
  return (
    <>
      <script defer data-domain={site.analyticsDomain} src="https://plausible.io/js/script.outbound-links.file-downloads.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
        }}
      />
    </>
  );
}
