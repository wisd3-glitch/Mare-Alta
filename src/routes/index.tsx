import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Feather,
  Gift,
  Languages,
  Users,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Hero } from "@/components/site/Hero";
import { BookCard } from "@/components/site/BookCard";
import {
  BOOKS,
  EVENTS,
  HOURS,
  STAFF_PICKS,
  getBook,
} from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Maré Alta — books chosen by people who have read them" }],
  }),
  component: Home,
});

const HOME_IDS = [
  "the-salt-ledger",
  "night-ferry",
  "houses-of-the-tagus",
  "tide-tables",
  "the-small-lighthouse",
  "a-year-in-alfama",
];

function Home() {
  const picks = HOME_IDS.map((id) => getBook(id)).filter(
    (book): book is NonNullable<typeof book> => Boolean(book),
  );
  const notes = STAFF_PICKS.slice(0, 3);
  const next = EVENTS.slice(0, 2);

  return (
    <>
      <Hero />
      <section className="ma-services" aria-label="What the shop is for">
        <div className="ma-wrap ma-services__row">
          <Service icon={<Languages size={26} />} label="Portuguese & English" />
          <Service icon={<BookOpen size={26} />} label="Thursday readings" />
          <Service icon={<Users size={26} />} label="A book club that fills" />
          <Service icon={<Gift size={26} />} label="Gift wrap, if you ask" />
          <Service icon={<Feather size={26} />} label="Near Cais do Sodré" />
        </div>
      </section>

      <section className="ma-section">
        <div className="ma-wrap">
          <p className="ma-kicker">O que ler a seguir</p>
          <h2 className="ma-h2">Discover your next book</h2>
          <p className="ma-sub">
            Not the whole warehouse. The ones we have actually finished, and would
            put in your hands.
          </p>
          <div className="ma-home-grid">
            {picks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <p className="ma-center">
            <Link
              to="/shop"
              search={{ q: "", cat: "all", sort: "featured" }}
              className="ma-btn ma-btn--ink"
            >
              The whole table
            </Link>
          </p>
        </div>
      </section>

      <section className="ma-section ma-section--tint">
        <div className="ma-wrap">
          <p className="ma-kicker">Escolhas da casa</p>
          <h2 className="ma-h2">Staff picks</h2>
          <p className="ma-sub">Three of the six. The booksellers wrote these, not a blurb mill.</p>
          <div className="row g-4">
            {notes.map((pick) => {
              const book = getBook(pick.bookId);
              if (!book) return null;
              return (
                <div className="col-md-4" key={pick.bookId}>
                  <article className="ma-pick">
                    <BookCard book={book} />
                    <p className="ma-pick__note">{pick.note}</p>
                    <p className="ma-pick__who">
                      {pick.bookseller}
                      <span>{pick.role}</span>
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
          <p className="ma-center">
            <Link to="/staff-picks" className="ma-btn ma-btn--ghost">
              All six notes
            </Link>
          </p>
        </div>
      </section>

      <section className="ma-section">
        <div className="ma-wrap">
          <p className="ma-kicker">A agenda</p>
          <h2 className="ma-h2">Next two evenings</h2>
          <div className="row g-4">
            {next.map((event) => (
              <div className="col-md-6" key={event.id}>
                <article className="ma-event">
                  <div className="ma-event__date">
                    <span>{event.day}</span>
                    <small>{event.month}</small>
                  </div>
                  <div>
                    <p className="ma-event__pt">{event.pt}</p>
                    <h3>{event.title}</h3>
                    <p className="ma-event__when">
                      {event.dateLabel} · {event.time} · {event.meta}
                    </p>
                    <p>{event.detail}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <p className="ma-center">
            <Link to="/events" className="ma-btn ma-btn--ghost">
              The full calendar
            </Link>
          </p>
        </div>
      </section>

      <section className="ma-azulejo">
        <div className="ma-wrap ma-azulejo__grid">
          <div>
            <p className="ma-kicker ma-kicker--light">O correio</p>
            <h2 className="ma-h2 ma-h2--light">One email a week.</h2>
            <p>
              New arrivals, events, and one book we cannot stop recommending.
            </p>
            <NewsletterForm />
          </div>
          <div className="ma-hours-card">
            <p className="ma-kicker">Horário</p>
            <h2 className="ma-h2 ma-h2--left">Opening hours</h2>
            <ul className="ma-hours">
              {HOURS.map((row) => (
                <li key={row.days}>
                  <span>{row.days}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
            </ul>
            <p className="ma-fine">
              Monday to Saturday, 10:00 to 20:00. Sunday, 12:00 to 18:00.
            </p>
          </div>
        </div>
      </section>
      <p className="ma-sr">{BOOKS.length} books in the catalogue.</p>
    </>
  );
}

function Service({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="ma-service">
      <span aria-hidden="true">{icon}</span>
      <p>{label}</p>
    </div>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }
  if (done) {
    return (
      <p className="ma-form__done" role="status">
        Noted on this page. One email a week — new arrivals, events, and one book
        we cannot stop recommending.
      </p>
    );
  }
  return (
    <form className="ma-form" onSubmit={onSubmit}>
      <label htmlFor="home-email">Email</label>
      <div className="ma-form__row">
        <input id="home-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        <button type="submit" className="ma-btn ma-btn--paper">
          Join the list
        </button>
      </div>
      <p className="ma-fine">
        Concept shop: this stays in your browser. We do not store the address.
      </p>
    </form>
  );
}
