import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { PageHead } from "@/components/site/SiteShell";
import { HOURS, SHOP } from "@/data/catalog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact — Maré Alta" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHead
        pt="Fale connosco"
        en="Contact"
        deck="The counter answers. If we are in the middle of a reading, it may be after eight."
        image="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="An open notebook beside a cup of tea"
      />
      <section className="ma-section">
        <div className="ma-wrap">
          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="ma-h2 ma-h2--left">The shop</h2>
              <address className="ma-address">
                {SHOP.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span>{SHOP.neighbourhood}</span>
              </address>
              <p>
                <a href={SHOP.phoneHref}>{SHOP.phone}</a>
                <br />
                <a href={SHOP.emailHref}>{SHOP.email}</a>
              </p>
              <h3 className="ma-h3">Horário · Opening hours</h3>
              <ul className="ma-hours">
                {HOURS.map((row) => (
                  <li key={row.days}>
                    <span>{row.days}</span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="ma-map" role="img" aria-label="Map placeholder for Rua da Boavista, Lisbon">
                <svg viewBox="0 0 320 220" aria-hidden="true">
                  <rect width="320" height="220" fill="#E7E2D8" />
                  <path d="M0 150 H320 M40 0 V220 M180 0 V220 M0 70 H320 M260 0 V220" stroke="#1E2430" strokeOpacity="0.15" />
                  <path d="M20 170 C 80 150, 120 120, 200 130 S 280 90, 310 80" fill="none" stroke="#1F4E8C" strokeWidth="6" />
                  <circle cx="168" cy="128" r="8" fill="#E0663A" />
                </svg>
                <p>
                  <strong>Maré Alta</strong>
                  Map placeholder — Rua da Boavista 18, uphill from Cais do Sodré.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="ma-h2 ma-h2--left">A message</h2>
              <MessageForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MessageForm() {
  const [done, setDone] = useState(false);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }
  if (done) {
    return (
      <p className="ma-form__done" role="status">
        Received on this page. On a live shop this would go to ola@marealta.pt.
        Nothing was stored.
      </p>
    );
  }
  return (
    <form className="ma-form ma-form--stack" onSubmit={onSubmit}>
      <label htmlFor="msg-name">Name</label>
      <input id="msg-name" name="name" required autoComplete="name" />
      <label htmlFor="msg-email">Email</label>
      <input id="msg-email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="msg-about">About</label>
      <select id="msg-about" name="about" defaultValue="visit">
        <option value="visit">A visit or a reserved book</option>
        <option value="event">An event</option>
        <option value="club">The book club</option>
        <option value="other">Something else</option>
      </select>
      <label htmlFor="msg-body">Message</label>
      <textarea id="msg-body" name="message" rows={6} required />
      <button type="submit" className="ma-btn ma-btn--accent">
        Send the note
      </button>
      <p className="ma-fine">
        Concept shop: the form is not connected to an inbox. For EU customers, a
        live shop would add a privacy policy before collecting anything.
      </p>
    </form>
  );
}
