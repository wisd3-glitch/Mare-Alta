import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { PageHead } from "@/components/site/SiteShell";
import { BookCover } from "@/components/site/BookCover";
import { EVENTS, getBook } from "@/data/catalog";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [{ title: "Events and book club — Maré Alta" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const clubBook = getBook("the-salt-ledger");
  return (
    <>
      <PageHead
        pt="A agenda"
        en="Events and book club"
        deck="Readings, Saturday story hour, and a Sunday club that fills the upstairs room."
        image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="A stack of books on a wooden table"
      />
      <section className="ma-section">
        <div className="ma-wrap">
          <div className="row g-5">
            <div className="col-lg-7">
              <p className="ma-kicker ma-kicker--left">O calendário</p>
              <h2 className="ma-h2 ma-h2--left">What’s on</h2>
              <ul className="ma-calendar">
                {EVENTS.map((event) => (
                  <li key={event.id}>
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
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5">
              <article className="ma-club" id="club">
                <p className="ma-kicker ma-kicker--left">O clube</p>
                <h2 className="ma-h2 ma-h2--left">This month’s book</h2>
                {clubBook ? (
                  <div className="ma-club__book">
                    <Link to="/book/$bookId" params={{ bookId: clubBook.id }} aria-label={clubBook.title}>
                      <BookCover book={clubBook} />
                    </Link>
                    <div>
                      <h3>
                        <Link to="/book/$bookId" params={{ bookId: clubBook.id }}>
                          {clubBook.title}
                        </Link>
                      </h3>
                      <p>{clubBook.author}</p>
                      <p className="ma-event__when">Next date · Sunday 6 December, 17:00</p>
                    </div>
                  </div>
                ) : null}
                <p>
                  First Sunday book club. Bring one page you want to read aloud.
                  The kettle goes on at 16:40. About fourteen people, then we stop
                  the list.
                </p>
                <JoinForm />
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function JoinForm() {
  const [done, setDone] = useState(false);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }
  if (done) {
    return (
      <p className="ma-form__done" role="status">
        You’re on the list for this page. We’ll keep a chair until the room is full.
      </p>
    );
  }
  return (
    <form className="ma-form ma-form--stack" onSubmit={onSubmit}>
      <label htmlFor="club-name">Name</label>
      <input id="club-name" name="name" required autoComplete="name" />
      <label htmlFor="club-email">Email</label>
      <input id="club-email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="club-page">The page you might read aloud</label>
      <textarea id="club-page" name="page" rows={3} placeholder="Optional. A page number is enough." />
      <button type="submit" className="ma-btn ma-btn--accent">
        Join the club
      </button>
      <p className="ma-fine">
        Concept shop: nothing is emailed. The note stays in this browser.
      </p>
    </form>
  );
}
