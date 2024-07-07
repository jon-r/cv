import { marked } from "marked";
import prettier from "prettier";

import template from "../raw/template.ts";
import { debounce } from "./util.ts";

const input = "./raw";
const output = "./html";

await Deno.mkdir(`${output}/assets`, { recursive: true });

async function updateHtml() {
  console.log(`[${Date.now()}] updated!`);
  const markdown = await Deno.readTextFile(`${input}/cv.md`);

  const about = {
    title: "Jon Richards - Senior Developer / Tech Lead",
    description: "TODO",
    favicon: "assets/favicon.svg",
    body: await marked.parse(markdown, { gfm: true }),
  };

  // todo may need better way to deal with all the css.
  for await (const stylesheet of Deno.readDir(`${input}/assets`)) {
    await Deno.copyFile(
      `${input}/assets/${stylesheet.name}`,
      `${output}/assets/${stylesheet.name}`,
    );
  }

  const formatted = await prettier.format(template(about), { parser: "html" });
  await Deno.writeTextFile(`${output}/index.html`, formatted);
}

const debouncedUpdateHtml = debounce(updateHtml, 300);

console.log("watching...");
await updateHtml();

const templateWatcher = Deno.watchFs(`${input}/`);
for await (const _event of templateWatcher) {
  debouncedUpdateHtml();
}
