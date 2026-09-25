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
    "Source roasted Ethiopian coffee for distribution, retail or hospitality through our Ethiopian exporter network. Tell us your format, quantity, destination and timing.",
});

const TOPICS = [
  { title: "Format", body: "Whole bean or ground, and the kind of pack your customers or your operation use." },
  { title: "Quantity and frequency", body: "An approximate volume per order, and whether you expect a one-off order or regular supply." },
  { title: "Destination", body: "The country the coffee would be shipped to, and whether you already import food products there." },
  { title: "Timing", body: "When you would need a first shipment, so we can check what is realistic." },
  { title: "Product and branding", body: "Whether you want an existing Ethiopian product, or have other arrangements in mind. We’ll tell you plainly what can and can’t be done." },
  { title: "Your market’s requirements", body: "Roasted coffee is a food product. Tell us about any registration, labelling or documentation your market or customers require." },
];

const FAQ = [
  {
    q: "What roasted coffee can you supply?",
    a: (
      <p>
        Roasted Ethiopian coffee can be sourced through exporters in our network. What’s available, including formats, pack types and
        minimum quantities, depends on the supplier and your market, so we confirm it for your specific inquiry rather than publishing a
        fixed list.
      </p>
    ),
  },
  {
    q: "How fresh will the coffee be when it arrives?",
    a: (
      <p>
        Freshness depends on roast timing, packaging, transit and storage. Before any quotation, we ask the supplier for roast dates,
        packaging details and their storage guidance, and discuss the shipping time to your destination with you.
      </p>
    ),
  },
  {
    q: "Can the coffee be packed under my own brand?",
    a: (
      <p>
        We don’t offer this as a standard service. If it matters to you, mention it in your inquiry and we’ll tell you whether it is
        possible for your requirement.
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
                "Roasted Ethiopian coffee can be sourced through our network of Ethiopian exporters. Because roasted coffee is time-sensitive and subject to food rules in your market, every inquiry starts with a conversation: we confirm format, quantity, destination and timing with you and the supplier before any quotation."}
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
            <h2 id="who-title">Who this is for</h2>
            <ul className="check-list">
              <li><strong>Distributors and wholesalers</strong> supplying retailers, offices or food service.</li>
              <li><strong>Retailers</strong> looking to stock roasted Ethiopian coffee.</li>
              <li><strong>Hotels, restaurant groups and other hospitality businesses</strong> buying in volume.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="topics-title">
        <div className="container">
          <h2 id="topics-title">What we’ll discuss with you</h2>
          <p className="section-intro">Share what you know in your inquiry. We’ll ask about the rest.</p>
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
      <CtaBand title="Interested in roasted Ethiopian coffee?" href="/inquiry?product=roasted" label="Send a roasted coffee inquiry" cue="roasted" />
    </div>
  );
}
