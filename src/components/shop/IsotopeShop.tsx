import { useEffect, useRef, useState } from "react";
import { BOOKS, CATEGORIES, type Book, type CategoryId } from "@/data/catalog";
import { BookCard } from "@/components/site/BookCard";

export type ShelfCat = "all" | CategoryId;
export type ShelfSort = "featured" | "title" | "price-asc" | "price-desc";

function sortBooks(books: Book[], sort: ShelfSort): Book[] {
  const next = [...books];
  if (sort === "title") next.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
  return next;
}

type Iso = {
  arrange: (options: { filter: (el: Element) => boolean }) => void;
  layout: () => void;
  reloadItems: () => void;
  destroy: () => void;
};

export function IsotopeShop({
  cat,
  query,
  sort,
  onCat,
  onSort,
}: {
  cat: ShelfCat;
  query: string;
  sort: ShelfSort;
  onCat: (cat: ShelfCat) => void;
  onSort: (sort: ShelfSort) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<Iso | null>(null);
  const filterRef = useRef<(el: Element) => boolean>(() => true);
  const [ready, setReady] = useState(false);
  const ordered = sortBooks(BOOKS, sort);

  const visibleCount = ordered.filter((book) => bookMatches(book, cat, query)).length;

  filterRef.current = (el: Element) => {
    const node = el as HTMLElement;
    const catOk = cat === "all" || node.getAttribute("data-cat") === cat;
    const blob = node.getAttribute("data-search") ?? "";
    const q = query.trim().toLowerCase();
    return catOk && (!q || blob.includes(q));
  };

  useEffect(() => {
    let dead = false;
    let iso: Iso | null = null;
    const grid = gridRef.current;
    (async () => {
      const { default: Isotope } = await import("isotope-layout");
      if (dead || !grid) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      iso = new Isotope(grid, {
        itemSelector: ".book-item",
        layoutMode: "fitRows",
        percentPosition: true,
        transitionDuration: reduce ? 0 : "0.45s",
      });
      isoRef.current = iso;
      iso.arrange({ filter: (el) => filterRef.current(el) });
      setReady(true);
    })();
    return () => {
      dead = true;
      iso?.destroy();
      isoRef.current = null;
    };
  }, [sort]);

  useEffect(() => {
    const iso = isoRef.current;
    if (!iso) return;
    iso.reloadItems();
    iso.arrange({ filter: (el) => filterRef.current(el) });
  }, [cat, query, sort, ready]);

  return (
    <div>
      <div className="ma-shopbar">
        <div className="ma-filters" role="tablist" aria-label="Filter the shelves">
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={cat === item.id}
              className={cat === item.id ? "is-active" : undefined}
              onClick={() => onCat(item.id)}
            >
              <span className="ma-filters__pt">{item.pt}</span>
              {item.en}
            </button>
          ))}
        </div>
        <label className="ma-sort">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value as ShelfSort)}
          >
            <option value="featured">As on the table</option>
            <option value="title">Title</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </label>
      </div>
      <p className="ma-count" aria-live="polite">
        {visibleCount === 0
          ? "Nothing on that shelf."
          : `${visibleCount} ${visibleCount === 1 ? "book" : "books"}`}
        {query.trim() ? ` for “${query.trim()}”` : ""}
      </p>
      <div className="ma-grid" ref={gridRef}>
        {ordered.map((book) => (
          <div
            className="book-item"
            key={book.id}
            data-cat={book.category}
            data-search={`${book.title} ${book.author} ${book.description}`.toLowerCase()}
          >
            <BookCard book={book} showDescription showButton />
          </div>
        ))}
      </div>
      {visibleCount === 0 ? (
        <p className="ma-empty">
          Try another shelf, or a shorter word. The river is still there.
        </p>
      ) : null}
    </div>
  );
}

function bookMatches(book: Book, cat: ShelfCat, query: string): boolean {
  const catOk = cat === "all" || book.category === cat;
  const blob = `${book.title} ${book.author} ${book.description}`.toLowerCase();
  const q = query.trim().toLowerCase();
  return catOk && (!q || blob.includes(q));
}
