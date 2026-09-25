import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/roasted-coffee",
  title: "Roasted Ethiopian coffee for distributors and hospitality",
  description:
    "Roasted Ethiopian coffee for distributors, retailers and hospitality. Tell us your format, volume, market and timing; we confirm what can be delivered before anything is quoted.",
});

const TOPICS = [
  { title: "Format", body: "Whole bean or ground, and the pack your customers or your kitchen actually use." },
  { title: "Volume and frequency", body: "A rough volume per order, and whether you need a one-off shipment or regular supply." },
  { title: "Destination", body: "Where the coffee is going, and whether you already import food products into that market." },
  { title: "Timing", body: "When you need a first shipment, so we can plan roasting and transit realistically." },
  { title: "Product and branding", body: "An existing Ethiopian product, or something else in mind. We’ll tell you plainly what can and can’t be done." },
  { title: "Your market’s rules", body: "Roasted coffee is a food product. Tell us about the registration, labelling or documents your market or customers require." },
];

const FAQ = [
  {
    q: "What roasted coffee can you supply?",
    a: (
      <p>
        Roasted Ethiopian coffee from exporters in our network. Formats, pack types and minimum quantities depend on the supplier and your
        market, so we confirm them for your inquiry rather than publish a fixed list that may not apply to you.
      </p>
    ),
  },
  {
    q: "How fresh will the coffee be when it arrives?",
    a: (
      <p>
        That depends on roast date, packaging, transit and storage. Before any quotation we get the supplier’s roast-to-dispatch timing,
        packaging details and storage guidance, and talk through transit time to your destination with you.
      </p>
    ),
  },
  {
    q: "Can the coffee be packed under my own brand?",
    a: (
      <p>
        It isn’t a standard service. If your own brand matters, mention it in your inquiry and we’ll tell you honestly whether it can be
        done for your volume and market.
      </p>
    ),
  },
  {
    q: "Can smaller businesses order?",
    a: (
      <p>
        Yes, tell us what you need. Roasted coffee ships internationally from Ethiopia, so freight is a bigger share of the cost on small
        orders. We’ll tell you what’s realistic for your volume and destination before you commit.
      </p>
    ),
  },
];

export default async function RoastedCoffeePage() {
  const pc = (await getPageContent())?.roasted;
  return (
    <div className="cue-roasted">
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow eyebrow-cue">Roasted coffee</p>
            <h1 id="page-title">{pc?.heroTitle || "Roasted Ethiopian coffee for distributors, retailers and hospitality"}</h1>
            <p className="lead">
              {pc?.heroIntro ||
                "Ethiopian coffee roasted for your shelves, your cafés and your customers. Freshness and food rules matter from the day of roasting, so every inquiry starts with a conversation: we agree format, volume, destination and timing with you and the supplier before anything is quoted."}
            </p>
            <div className="button-row">
              <Link className="button button-roasted" href="/inquiry?product=roasted">
                Send a roasted coffee inquiry
              </Link>
              <Link className="button button-outline" href="/green-coffee">
                Looking for green coffee?
              </Link>
            </div>
          </div>
          <Visual media={asMedia(pc?.heroImage)} fallback="roasted" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="who-title">
        <div className="container media-split">
          <Visual media={asMedia(pc?.detailImage)} fallback="roasted" sizes="(min-width: 900px) 45vw, 100vw" className="split-visual" />
          <div className="prose">
            <h2 id="who-title">Who we source for</h2>
            <ul className="check-list">
              <li><strong>Distributors and wholesalers</strong> supplying retail, offices or food service.</li>
              <li><strong>Retailers</strong> adding Ethiopian coffee to their shelves.</li>
              <li><strong>Hotels, restaurant groups and cafés</strong> serving Ethiopian coffee to their guests.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="topics-title">
        <div className="container">
          <h2 id="topics-title">What we’ll agree before quoting</h2>
          <p className="section-intro">Share what you already know in your inquiry. We’ll ask about the rest.</p>
          <ul className="topic-grid">
            {TOPICS.map((t) => (
              <li key={t.title} className="topic">
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQ} id="roasted-faq" />
      <CtaBand title="Bring Ethiopian coffee to your customers" href="/inquiry?product=roasted" label="Send a roasted coffee inquiry" cue="roasted" />
    </div>
  );
}
