import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/site/SiteShell";
import {
  IsotopeShop,
  type ShelfCat,
  type ShelfSort,
} from "@/components/shop/IsotopeShop";

const CATS = ["all", "fiction", "nonfiction", "portuguese", "children", "poetry"] as const;
const SORTS = ["featured", "title", "price-asc", "price-desc"] as const;

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: (CATS as readonly string[]).includes(String(search.cat))
      ? (search.cat as ShelfCat)
      : "all",
    sort: (SORTS as readonly string[]).includes(String(search.sort))
      ? (search.sort as ShelfSort)
      : "featured",
  }),
  head: () => ({
    meta: [{ title: "The shop — Maré Alta" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q, cat, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <>
      <PageHead
        pt="A livraria"
        en="The shop"
        deck="Fiction, non-fiction, Portuguese authors, children and poetry. Prices in euros, invented for this concept."
        image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Bookshelves in a quiet library"
      />
      <section className="ma-section">
        <div className="ma-wrap">
          <IsotopeShop
            cat={cat}
            query={q}
            sort={sort}
            onCat={(next) => {
              void navigate({ search: { q, cat: next, sort } });
            }}
            onSort={(next) => {
              void navigate({ search: { q, cat, sort: next } });
            }}
          />
        </div>
      </section>
    </>
  );
}
