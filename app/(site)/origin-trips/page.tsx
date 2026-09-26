import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/origin-trips",
  title: "Origin trips to Ethiopia’s coffee farms",
  description:
    "Visit the farms and washing stations behind your coffee. Origin trips to Ethiopia for roasters, importers and coffee teams, planned with you by a team that lives and works there.",
});

const INCLUDES = [
  { title: "Farms and washing stations", body: "Walk the farms, see the cherry arrive and follow it through washing, fermentation and drying." },
  { title: "The people behind the coffee", body: "Meet farmers and washing station teams, and hear how the season is going from the people doing the work." },
  { title: "Cupping at origin", body: "Taste coffees side by side with our team, and talk grades, processes and what fits your customers." },
  { title: "Ethiopian coffee culture", body: "Share a traditional coffee ceremony and experience the culture where coffee began." },
];

const PLAN = [
  "Tell us who is coming, when you’d like to travel and what you want to see.",
  "We propose a programme in Ethiopia: regions, visits, travel between them and the cost.",
  "We agree the details with you before you book anything.",
  "On the ground, our team travels with you and makes the introductions.",
];

const FAQ = [
  {
    q: "Who are origin trips for?",
    a: (
      <p>
        Roasters, importers, café owners and coffee teams who want to know where their coffee comes from, build relationships at origin,
        or choose coffee for the coming season. Customers and prospective customers are both welcome.
      </p>
    ),
  },
  {
    q: "When is the best time to go?",
    a: (
      <p>
        During the harvest, roughly October to January, you see picking, washing and drying in full swing. Visits outside the harvest are
        quieter but still worthwhile for meeting producers and cupping. We’ll suggest dates that fit what you want to see.
      </p>
    ),
  },
  {
    q: "Do I have to buy coffee to join?",
    a: <p>No. Many buyers visit before their first order. We plan each trip with you and agree the cost in advance.</p>,
  },
  {
    q: "How long is a trip?",
    a: (
      <p>
        It depends on how many regions you want to visit. Coffee regions are a long drive from Addis Ababa, so tell us how much time you
        have and we’ll propose a programme that fits.
      </p>
    ),
  },
];

export default async function OriginTripsPage() {
  const pc = (await getPageContent())?.trips;
  return (
    <>
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow">Origin trips</p>
            <h1 id="page-title">{pc?.heroTitle || "Every coffee has a story. Come and see where it begins."}</h1>
            <p className="lead">
              {pc?.heroIntro ||
                "Together we visit the farms, meet the people and experience the culture in Ethiopia’s coffee-growing heartlands. Origin trips for roasters, importers and coffee teams, planned with you by a team that lives and works there."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry?request=trip">
                Plan an origin trip
              </Link>
              <Link className="button button-outline" href="/coffees">
                Explore our coffees
              </Link>
            </div>
          </div>
          <Visual media={asMedia(pc?.heroImage)} fallback="highlands" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="includes-title">
        <div className="container">
          <p className="eyebrow">What a trip can include</p>
          <h2 id="includes-title">From cherry to cup, in person</h2>
          <p className="section-intro">Every trip is planned around your group and the season. These are the elements buyers ask for most.</p>
          <ul className="topic-grid topic-grid-4">
            {INCLUDES.map((i) => (
              <li key={i.title} className="topic">
                <h3>{i.title}</h3>
                <p>{i.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="plan-title">
        <div className="container media-split">
          <Visual media={asMedia(pc?.detailImage)} fallback="cherries" sizes="(min-width: 900px) 45vw, 100vw" className="split-visual" />
          <div className="prose">
            <p className="eyebrow">Planning</p>
            <h2 id="plan-title">How we plan your trip</h2>
            <ol className="plain-steps">
              {PLAN.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faq items={FAQ} id="trips-faq" title="Questions about origin trips" />
      <CtaBand title="Come to Ethiopia with us" href="/inquiry?request=trip" label="Plan an origin trip" body="Tell us who is coming and when you’d like to travel. We’ll come back with ideas for your programme." />
    </>
  );
}
