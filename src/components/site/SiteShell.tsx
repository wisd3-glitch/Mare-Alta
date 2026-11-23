import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Waves,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  BOOKS,
  HOURS,
  SHOP,
  formatPrice,
  getBook,
} from "@/data/catalog";
import { useBasket } from "@/lib/basket-store";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/shop", label: "Shop", exact: true },
  { to: "/staff-picks", label: "Escolhas", exact: true },
  { to: "/events", label: "Events", exact: true },
  { to: "/about", label: "About", exact: true },
  { to: "/contact", label: "Contact", exact: true },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lines = useBasket((s) => s.lines);
  const open = useBasket((s) => s.open);
  const setOpen = useBasket((s) => s.setOpen);
  const setQty = useBasket((s) => s.setQty);
  const remove = useBasket((s) => s.remove);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    void useBasket.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open || menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, menu]);

  const count = hydrated ? lines.reduce((sum, line) => sum + line.qty, 0) : 0;
  const detailed = lines
    .map((line) => {
      const book = getBook(line.id);
      return book ? { ...line, book } : null;
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);
  const subtotal = detailed.reduce((sum, line) => sum + line.book.price * line.qty, 0);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    void navigate({
      to: "/shop",
      search: { q: q.trim(), cat: "all", sort: "featured" },
    });
    setSearchOpen(false);
  }

  return (
    <>
      <a className="ma-skip" href="#content">
        Skip to content
      </a>
      <div className="ma-topbar">
        <div className="ma-wrap ma-topbar__inner">
          <p>
            <Waves size={14} aria-hidden="true" />
            <span>Uma livraria junto ao Tejo</span>
            <span className="ma-dot" aria-hidden="true" />
            <span>Lisbon</span>
          </p>
          <p className="ma-topbar__right">
            <a href={SHOP.phoneHref}>{SHOP.phone}</a>
            <span className="ma-dot" aria-hidden="true" />
            <span>Mon–Sat 10–20</span>
          </p>
        </div>
      </div>
      <header className="ma-header">
        <div className="ma-wrap ma-header__row">
          <button
            type="button"
            className="ma-iconbtn ma-burger"
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
            <span className="ma-sr">{menu ? "Close menu" : "Open menu"}</span>
          </button>
          <Link to="/" className="ma-logo">
            <LogoMark />
            <span>
              <span className="ma-logo__name">Maré Alta</span>
              <span className="ma-logo__line">{SHOP.line}</span>
            </span>
          </Link>
          <nav className="ma-nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                activeProps={{ className: "is-active" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ma-tools">
            <form className="ma-search ma-search--desk" onSubmit={onSearch} role="search">
              <label className="ma-sr" htmlFor="desk-search">
                Search the shop
              </label>
              <input
                id="desk-search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search titles, authors"
              />
              <button type="submit" className="ma-iconbtn" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
            <button
              type="button"
              className="ma-iconbtn ma-search-toggle"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search size={20} />
              <span className="ma-sr">Search</span>
            </button>
            <button
              type="button"
              className="ma-iconbtn ma-bag"
              onClick={() => setOpen(true)}
              aria-label={`Basket, ${count} ${count === 1 ? "book" : "books"}`}
            >
              <ShoppingBag size={20} />
              <span className="ma-bag__count">{count}</span>
            </button>
          </div>
        </div>
        {searchOpen ? (
          <form className="ma-search ma-search--mob" onSubmit={onSearch} role="search">
            <label className="ma-sr" htmlFor="mob-search">
              Search the shop
            </label>
            <input
              id="mob-search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search titles, authors"
              autoFocus
            />
            <button type="submit" className="ma-btn ma-btn--ink">
              Search
            </button>
          </form>
        ) : null}
      </header>
      {menu ? (
        <nav id="site-menu" className="ma-drawer-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: "is-active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
      <main id="content">{children}</main>
      <footer className="ma-footer">
        <div className="ma-azulejo-rule" aria-hidden="true" />
        <div className="ma-wrap ma-footer__grid">
          <div>
            <p className="ma-footer__name">Maré Alta</p>
            <p className="ma-footer__tag">
              High tide. A bookshop a short walk from the river, fuller in the evening.
            </p>
          </div>
          <div>
            <h2>Visit</h2>
            <p className="ma-footer__plain">
              {SHOP.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              {SHOP.neighbourhood}
            </p>
            <p className="ma-footer__plain">
              <a href={SHOP.phoneHref}>{SHOP.phone}</a>
              <br />
              <a href={SHOP.emailHref}>{SHOP.email}</a>
            </p>
          </div>
          <div>
            <h2>Horário</h2>
            <ul className="ma-hours">
              {HOURS.map((row) => (
                <li key={row.days}>
                  <span>{row.days}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>The shelves</h2>
            <ul className="ma-footer__links">
              <li>
                <Link to="/shop" search={{ q: "", cat: "fiction", sort: "featured" }}>
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ q: "", cat: "portuguese", sort: "featured" }}>
                  Portuguese authors
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ q: "", cat: "children", sort: "featured" }}>
                  Children
                </Link>
              </li>
              <li>
                <Link to="/events">Book club</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="ma-wrap ma-footer__base">
          <p>A concept shop. Names, books, events and prices are invented.</p>
          <p>Photography via Unsplash. {BOOKS.length} titles on the table.</p>
        </div>
      </footer>
      {open ? (
        <div className="ma-overlay" role="presentation" onClick={() => setOpen(false)} />
      ) : null}
      <aside
        className={open ? "ma-basket is-open" : "ma-basket"}
        aria-hidden={!open}
        aria-label="Basket"
      >
        <div className="ma-basket__head">
          <h2>Basket</h2>
          <button type="button" className="ma-iconbtn" onClick={() => setOpen(false)}>
            <X size={20} />
            <span className="ma-sr">Close basket</span>
          </button>
        </div>
        {detailed.length === 0 ? (
          <p className="ma-basket__empty">
            Nothing set aside yet. The table by the window is a good place to start.
          </p>
        ) : (
          <ul className="ma-basket__list">
            {detailed.map((line) => (
              <li key={line.id}>
                <div>
                  <p className="ma-basket__title">{line.book.title}</p>
                  <p className="ma-basket__meta">{line.book.author}</p>
                  <p className="ma-basket__meta">{formatPrice(line.book.price)}</p>
                </div>
                <div className="ma-qty">
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty - 1)}
                    aria-label={`Fewer copies of ${line.book.title}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty + 1)}
                    aria-label={`More copies of ${line.book.title}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  className="ma-textbtn"
                  onClick={() => remove(line.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="ma-basket__foot">
          <p className="ma-basket__sub">
            <span>To set aside</span>
            <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p className="ma-fine">
            Ask us to keep these at the counter. This concept basket does not take payment.
          </p>
          <Link to="/contact" className="ma-btn ma-btn--accent ma-btn--block" onClick={() => setOpen(false)}>
            Write to the shop
          </Link>
        </div>
      </aside>
    </>
  );
}

export function LogoMark() {
  return (
    <svg className="ma-mark" viewBox="0 0 36 36" aria-hidden="true">
      <rect className="ma-mark__tile" width="36" height="36" rx="4" />
      <path
        className="ma-mark__wave"
        d="M5 22c4.2-5.2 8-5.2 12.2 0S25.2 27.2 29.4 22"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="ma-mark__accent"
        d="M5 15.5c4.2-5.2 8-5.2 12.2 0S25.2 20.7 29.4 15.5"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageHead({
  pt,
  en,
  deck,
  image,
  imageAlt,
}: {
  pt: string;
  en: string;
  deck: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="ma-pagehead">
      <img src={image} alt={imageAlt} />
      <div className="ma-pagehead__shade" />
      <div className="ma-wrap ma-pagehead__copy">
        <p className="ma-kicker ma-kicker--light">{pt}</p>
        <h1>{en}</h1>
        <p>{deck}</p>
      </div>
    </header>
  );
}
