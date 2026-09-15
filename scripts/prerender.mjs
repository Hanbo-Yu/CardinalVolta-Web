import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";

const index = new URL("../dist/index.html", import.meta.url);
const template = await readFile(index, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder))
  throw new Error("Root placeholder missing.");
await writeFile(
  index,
  template.replace(placeholder, `<div id="root">${render()}</div>`),
);
console.log("Pre-rendered the homepage into static HTML.");
