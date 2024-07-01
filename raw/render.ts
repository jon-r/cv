import { marked } from "marked";
import prettier from "prettier";

import template from "./template.ts";

const input = ".";
const output = "../html";

await Deno.mkdir(`${output}/assets`, { recursive: true });

const markdown = await Deno.readTextFile(`${input}/cv.md`);

const about = {
  title: "Jon Richards - Senior Developer / Tech Lead",
  description: "TODO",
  favicon: "assets/favicon.svg",
  body: await marked.parse(markdown),
};

const formatted = await prettier.format(template(about), { parser: "html" });

// todo need better way to deal with all the css
for await (const stylesheet of Deno.readDir(`${input}/assets`)) {
  await Deno.copyFile(
    `${input}/assets/${stylesheet.name}`,
    `${output}/assets/${stylesheet.name}`,
  );
}

await Deno.writeTextFile(`${output}/index.html`, formatted);
