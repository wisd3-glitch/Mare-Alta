import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maré Alta — a bookshop by the Tagus" },
      {
        name: "description",
        content:
          "Maré Alta is an independent bookshop in Lisbon. New books in Portuguese and English, Thursday readings, and a book club that fills up.",
      },
      { name: "theme-color", content: "#1F4E8C" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,520;0,9..144,640;1,9..144,520;1,9..144,640&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
      },
    ],
  }),
  notFoundComponent: function NotFound() {
    return (
      <div className="ma-wrap ma-missing">
        <p className="ma-kicker">Fora da estante</p>
        <h1>That page is not on the shelf.</h1>
        <Link to="/" className="ma-btn ma-btn--ink">
          Back to the shop
        </Link>
      </div>
    );
  },
  component: function Root() {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body>
          <SiteShell>
            <Outlet />
          </SiteShell>
          <Scripts />
        </body>
      </html>
    );
  },
});
