import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead } from "@/components/site/SiteShell";
import { BookCover } from "@/components/site/BookCover";
import { STAFF_PICKS, formatPrice, getBook } from "@/data/catalog";

export const Route = createFileRoute("/staff-picks")({
  head: () => ({
    meta: [{ title: "Escolhas da casa — Maré Alta" }],
  }),
  component: StaffPicksPage,
});

function StaffPicksPage() {
  return (
    <>
      <PageHead
        pt="Escolhas da casa"
        en="Staff picks"
        deck="Six books. Each note is two sentences from the person who actually reads them at the till."
        image="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2000&q=80"
        imageAlt="An open book on a dark table"
      />
      <section className="ma-section">
        <div className="ma-wrap ma-picks">
          {STAFF_PICKS.map((pick) => {
            const book = getBook(pick.bookId);
            if (!book) return null;
            return (
              <article className="ma-pickrow" key={`${pick.bookId}-${pick.bookseller}`}>
                <Link
                  to="/book/$bookId"
                  params={{ bookId: book.id }}
                  className="ma-pickrow__cover"
                  aria-label={book.title}
                >
                  <BookCover book={book} />
                </Link>
                <div>
                  <p className="ma-pick__who">
                    {pick.bookseller}
                    <span>{pick.role}</span>
                  </p>
                  <h2>
                    <Link to="/book/$bookId" params={{ bookId: book.id }}>
                      {book.title}
                    </Link>
                  </h2>
                  <p className="ma-pickrow__by">
                    {book.author} · {formatPrice(book.price)}
                  </p>
                  <p className="ma-pickrow__note">{pick.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
