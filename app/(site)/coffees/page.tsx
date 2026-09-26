import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Visual } from "@/components/Visual";
import { asMedia, getPageContent } from "@/lib/cms";
import { GRADES, PROCESSES, REGIONS, SHIPPING_TERMS, SUPPLY_TYPES } from "@/lib/coffee";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/coffees",
  title: "Ethiopian coffee regions, grades and processes we supply",
  description:
    "Ethiopian green coffee from Yirgacheffe, Gedeb, Sidama, Guji, Limu, Jimma and more. Washed and natural, Grade 1 to Grade 5, from washing stations, single farms and estates. FOB Djibouti or FCA Addis Ababa.",
});

const FAQ = [
  {
    q: "Which grades can you supply?",
    a: (
      <p>
        Every Ethiopian export grade, washed or natural: specialty Grades 1 and 2, Grade 3, and commercial Grades 4 and 5. Which lots
        are available at each grade depends on the region and the harvest, so tell us what you need and we’ll tell you what we can offer
        this season.
      </p>
    ),
  },
  {
    q: "Can I buy from a region that isn’t listed?",
    a: (
      <p>
        Often, yes. The regions above are where we source most, but we can also look for coffee from other areas, such as Harrar in the
        east or the western regions. Ask us.
      </p>
    ),
  },
  {
    q: "What quality information comes with a lot?",
    a: (
      <p>
        Every export lot is inspected and graded by the Ethiopian Coffee and Tea Authority before it leaves the country. With each coffee
        we propose, we share the region, process, grade and crop year, together with the lot details and quality information we have for
        it, and samples where available.
      </p>
    ),
  },
  {
    q: "When is the best time to buy?",
    a: (
      <p>
        Harvest runs roughly from October to January, varying by region and altitude. The first washed coffees can ship around the turn
        of the year, and most of the crop ships from about February onwards. Contracting early gives you the widest choice.
      </p>
    ),
  },
];

export default async function CoffeesPage() {
  const pc = (await getPageContent())?.coffees;
  return (
    <div className="cue-green">
      <section className="page-hero page-hero-media" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow eyebrow-cue">Our coffees</p>
            <h1 id="page-title">{pc?.heroTitle || "The coffees of Ethiopia, direct from the source"}</h1>
            <p className="lead">
              {pc?.heroIntro ||
                "Ethiopia grows more distinct coffees than almost anywhere on earth. As a licensed exporter, we buy directly from farmers, washing stations and estates, and offer every export grade, washed or natural, from single-farm specialty lots to commercial coffee for blends."}
            </p>
            <div className="button-row">
              <Link className="button button-green" href="/inquiry?product=green&request=samples">
                Request samples
              </Link>
              <Link className="button button-outline" href="/inquiry?product=green">
                Request a quote
              </Link>
            </div>
          </div>
          <Visual media={asMedia(pc?.heroImage)} fallback="green" sizes="(min-width: 960px) 40vw, 100vw" priority className="page-hero-visual" />
        </div>
      </section>

      <section className="section" aria-labelledby="supply-title">
        <div className="container">
          <p className="eyebrow">Where it comes from</p>
          <h2 id="supply-title">Four ways to buy</h2>
          <ul className="topic-grid topic-grid-4">
            {SUPPLY_TYPES.map((s) => (
              <li key={s.title} className="topic">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="regions-title">
        <div className="container">
          <p className="eyebrow">Regions</p>
          <h2 id="regions-title">Where we source most</h2>
          <p className="section-intro">
            Typical profiles to start the conversation. Every lot is different, so we judge each one on its own sample.
          </p>
          <ul className="region-grid">
            {REGIONS.map((r) => (
              <li key={r.name} className="region">
                <h3>{r.name}</h3>
                <p>{r.profile}</p>
              </li>
            ))}
          </ul>
          <p className="section-note">Looking for another region, such as Harrar or the western highlands? Ask us.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Processing</p>
            <h2 id="process-title">Washed, natural and more</h2>
            <p className="muted">
              We handle processing and export preparation ourselves, from drying to hulling, sorting and grading, so quality is checked
              at every step.
            </p>
          </div>
          <ol className="help-list">
            {PROCESSES.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="grades-title">
        <div className="container">
          <p className="eyebrow">Grades</p>
          <h2 id="grades-title">Ethiopian export grades, explained</h2>
          <p className="section-intro">
            Before any coffee leaves Ethiopia, the Ethiopian Coffee and Tea Authority grades it on physical quality (defects, size and
            appearance, 40%) and cup quality (60%). Export coffee runs from Grade 1, the best, to Grade 5. Specialty lots may also carry a
            Q1 (85 points and above) or Q2 (80 to 84.75 points) designation.
          </p>
          <div className="spec-table-wrap">
            <table className="spec-table">
              <caption className="visually-hidden">Ethiopian export grades and their typical use</caption>
              <thead>
                <tr>
                  <th scope="col">Grade</th>
                  <th scope="col">Typical use</th>
                  <th scope="col">What to expect</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map((g) => (
                  <tr key={g.grade}>
                    <th scope="row">{g.grade}</th>
                    <td data-label="Typical use">{g.use}</td>
                    <td data-label="What to expect">{g.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="section-note">
            You’ll see names like “Yirgacheffe Grade 1 washed” or “Guji Grade 3 natural”: region, grade and process, in that order.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="varieties-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Varieties</p>
            <h2 id="varieties-title">Heirloom Ethiopia</h2>
          </div>
          <div className="prose">
            <p>
              Ethiopia is where arabica coffee comes from, and most of its coffee trees are local landraces and selections rather than the
              named varieties grown elsewhere. That is why Ethiopian lots are usually described as “Ethiopian heirloom”.
            </p>
            <p>
              Behind that label are regional landraces, such as Kurume, Wolisho and Dega in the south, and selections developed by the
              Jimma Agricultural Research Center, such as 74110 and 74112. Where a lot’s varieties are known, we tell you.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="shipping-title">
        <div className="container">
          <p className="eyebrow">Delivery</p>
          <h2 id="shipping-title">How your coffee leaves Ethiopia</h2>
          <ul className="topic-grid">
            {SHIPPING_TERMS.map((s) => (
              <li key={s.term} className="topic">
                <p className="topic-kicker">{s.mode}</p>
                <h3>{s.term}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQ} id="coffees-faq" />
      <CtaBand title="Tell us the coffee you’re looking for" href="/inquiry?product=green" label="Request a quote" cue="green" />
    </div>
  );
}
