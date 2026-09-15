import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import { pages } from "../src/pages.js";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const serverEntry = new URL("../.prerender/entry-server.js", import.meta.url);

// This bundle only runs in Node during the build. Do not load vite.config.js:
// deployment adapters can replace the SSR build with a client build and can
// redirect Wrangler to this temporary directory instead of the public dist/.
await build({
  configFile: false,
  root: projectRoot,
  publicDir: false,
  plugins: [react()],
  ssr: { target: "node" },
  build: {
    ssr: fileURLToPath(new URL("../src/entry-server.jsx", import.meta.url)),
    outDir: fileURLToPath(new URL("../.prerender/", import.meta.url)),
    emptyOutDir: true,
    rolldownOptions: {
      output: { entryFileNames: "entry-server.js" },
    },
  },
});

const { render } = await import(serverEntry.href);
const index = new URL("../dist/index.html", import.meta.url);
const template = await readFile(index, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder))
  throw new Error("Root placeholder missing.");
const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
for (const page of pages) {
  const directory = new URL(`../dist${page.path}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  const html = template
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`,
    )
    .replace(
      "</head>",
      page.sample
        ? '<meta name="robots" content="noindex,follow" /></head>'
        : "</head>",
    )
    .replace(placeholder, `<div id="root">${render(page.id)}</div>`);
  await writeFile(new URL("index.html", directory), html);
  console.log(`Pre-rendered ${page.path} into static HTML.`);
}
