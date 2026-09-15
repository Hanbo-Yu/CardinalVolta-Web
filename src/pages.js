import { newsItems } from "./content.js";

export const pages = [
  {
    id: "home",
    path: "/",
    title: "Cardinal Volta — More power. From waste heat.",
  },
  { id: "news", path: "/news/", title: "News & updates — Cardinal Volta" },
  ...newsItems.map((item) => ({
    id: `article:${item.slug}`,
    path: item.url,
    title: `${item.title} — Cardinal Volta`,
    sample: item.sample,
  })),
];

export function pageForPath(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return (
    pages.find((page) => page.path.replace(/\/+$/, "") === normalized) ??
    pages[0]
  );
}
