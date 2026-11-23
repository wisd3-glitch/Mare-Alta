import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookCover } from "@/components/site/BookCover";
import { BookCard } from "@/components/site/BookCard";
import {
  BOOKS,
  STAFF_PICKS,
  categoryLabel,
  formatPrice,
  getBook,
} from "@/data/catalog";
import { useBasket } from "@/lib/basket-store";

export const Route = createFileRoute("/book/$bookId")({
  head: ({ params }) => {
    const book = getBook(params.bookId);
    return {
      meta: [{ title: book ? `${book.title} — Maré Alta` : "Book — Maré Alta" }],
    };
  },
  component: BookPage,
});

function BookPage() {
  const { bookId } = Route.useParams();
  const book = getBook(bookId);
  const add = useBasket((s) => s.add);
  const [added, setAdded] = useState(false);

  if (!book) {
    return (
      <div className="ma-wrap ma-missing">
        <p className="ma-kicker">Esgotado</p>
        <h1>We don’t have that one on the table.</h1>
        <Link to="/shop" search={{ q: "", cat: "all", sort: "featured" }} className="ma-btn ma-btn--ink">
          Back to the shop
        </Link>
      </div>
    );
  }

  const notes = STAFF_PICKS.filter((pick) => pick.bookId === book.id);
  const related = BOOKS.filter(
    (other) => other.category === book.category && other.id !== book.id,
  ).slice(0, 4);

  return (
    <article className="ma-section">
      <div className="ma-wrap">
        <p className="ma-crumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop" search={{ q: "", cat: book.category, sort: "featured" }}>
            {categoryLabel(book.category)}
          </Link>
        </p>
        <div className="row g-5 align-items-start">
          <div className="col-md-5 col-lg-4">
            <BookCover book={book} />
          </div>
          <div className="col-md-7 col-lg-8">
            <p className="ma-kicker ma-kicker--left">{categoryLabel(book.category)}</p>
            <h1 className="ma-booktitle">{book.title}</h1>
            <p className="ma-bookauthor">{book.author}</p>
            <p className="ma-bookprice">{formatPrice(book.price)}</p>
            <p className="ma-prose">{book.description}</p>
            <p className="ma-lang">Language · {book.language}</p>
            <button
              type="button"
              className="ma-btn ma-btn--accent"
              onClick={() => {
                add(book.id);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1400);
              }}
            >
              {added ? "Added" : "Add to basket"}
            </button>
            {notes.map((note) => (
              <blockquote className="ma-quote" key={note.bookseller}>
                <p>{note.note}</p>
                <footer>
                  {note.bookseller}, <cite>{note.role}</cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
        {related.length > 0 ? (
          <div className="ma-related">
            <p className="ma-kicker">Na mesma mesa</p>
            <h2 className="ma-h2">Also in {categoryLabel(book.category).toLowerCase()}</h2>
            <div className="ma-home-grid">
              {related.map((other) => (
                <BookCard key={other.id} book={other} showButton />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
