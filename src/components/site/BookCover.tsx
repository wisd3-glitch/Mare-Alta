import type { Book } from "@/data/catalog";
import { categoryLabel } from "@/data/catalog";

export function BookCover({ book }: { book: Book }) {
  return (
    <div
      className={`ma-cover ma-cover--${book.layout}`}
      data-tone={book.tone}
      aria-hidden="true"
    >
      <span className="ma-cover__cat">{categoryLabel(book.category)}</span>
      <span className="ma-cover__title">{book.title}</span>
      <span className="ma-cover__author">{book.author}</span>
      <span className="ma-cover__wave" />
    </div>
  );
}
