import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead } from "@/components/site/SiteShell";
import { BOOKSELLERS } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About the shop — Maré Alta" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHead
        pt="A casa"
        en="About the shop"
        deck="Why a small shop by the river still bothers to choose, and who is choosing."
        image="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000&q=80"
        imageAlt="A grand reading room with long tables"
      />
      <section className="ma-section">
        <div className="ma-wrap">
          <div className="row g-5 align-items-start">
            <div className="col-lg-7">
              <p className="ma-kicker ma-kicker--left">A história</p>
              <h2 className="ma-h2 ma-h2--left">The shop’s story</h2>
              <div className="ma-prose">
                <p>
                  Maré Alta opened because the evenings along the Tagus were already
                  full of people with nowhere to take a book except home. The name
                  means high tide: the river, and the way the room fills after six.
                </p>
                <p>
                  We sell new books in Portuguese and English. We are not trying to
                  be a giant catalogue. If you want every prize-winner from the last
                  decade, the big shops up the hill will oblige. If you want the
                  book someone here finished on the ferry, this is the counter.
                </p>
                <p>
                  Locals come for a shop with opinions. Expats and remote workers
                  come for English that is not only airport paperbacks, and for a
                  club that learns their name. Visitors come because the street is
                  easy to miss and the book they leave with is not.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <figure className="ma-figure">
                <img
                  src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1400&q=80"
                  alt="Lisbon rooftops and the river in late light"
                />
                <figcaption>A short walk from Cais do Sodré. The hill does the rest.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="ma-section ma-section--tint">
        <div className="ma-wrap">
          <p className="ma-kicker">As pessoas</p>
          <h2 className="ma-h2">The booksellers</h2>
          <div className="row g-4">
            {BOOKSELLERS.map((person) => (
              <div className="col-md-4" key={person.name}>
                <article className="ma-person">
                  <span className="ma-person__mark" aria-hidden="true">
                    {person.initials}
                  </span>
                  <h3>{person.name}</h3>
                  <p className="ma-event__pt">{person.role}</p>
                  <p>{person.bio}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ma-section">
        <div className="ma-wrap ma-why">
          <p className="ma-kicker ma-kicker--left">Porquê</p>
          <h2 className="ma-h2 ma-h2--left">Why the shop exists</h2>
          <p>
            So that a Thursday in Lisbon still has a room where someone reads for
            fifteen minutes and then stops, and the questions are better than the
            introduction. The website should sound like that room.
          </p>
          <Link to="/events" className="ma-btn ma-btn--ink">
            Come on a Thursday
          </Link>
        </div>
      </section>
    </>
  );
}
