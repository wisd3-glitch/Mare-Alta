import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, type Book } from "@/data/catalog";
import { useBasket } from "@/lib/basket-store";
import { BookCover } from "./BookCover";

export function BookCard({
  book,
  showDescription = false,
  showButton = false,
}: {
  book: Book;
  showDescription?: boolean;
  showButton?: boolean;
}) {
  const add = useBasket((s) => s.add);
  const [added, setAdded] = useState(false);

  return (
    <article className="ma-card">
      <Link
        to="/book/$bookId"
        params={{ bookId: book.id }}
        className="ma-card__cover"
        aria-label={book.title}
      >
        <BookCover book={book} />
      </Link>
      <h3 className="ma-card__title">
        <Link to="/book/$bookId" params={{ bookId: book.id }}>
          {book.title}
        </Link>
      </h3>
      <p className="ma-card__author">{book.author}</p>
      {showDescription ? (
        <p className="ma-card__desc">{book.description}</p>
      ) : null}
      <p className="ma-card__price">{formatPrice(book.price)}</p>
      {showButton ? (
        <button
          type="button"
          className="ma-btn ma-btn--accent ma-btn--block"
          onClick={() => {
            add(book.id);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1400);
          }}
        >
          {added ? "Added" : "Add to basket"}
        </button>
      ) : null}
    </article>
  );
}
