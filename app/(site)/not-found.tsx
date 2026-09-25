import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="container narrow">
        <p className="eyebrow">Page not found</p>
        <h1 id="page-title">We couldn’t find that page</h1>
        <p className="lead">It may have moved. Try one of these instead:</p>
        <ul className="link-list">
          <li><Link href="/green-coffee">Green coffee</Link></li>
          <li><Link href="/roasted-coffee">Roasted coffee</Link></li>
          <li><Link href="/how-it-works">How it works</Link></li>
          <li><Link href="/inquiry">Send an inquiry</Link></li>
        </ul>
      </div>
    </section>
  );
}
