import { marked } from "marked";
import prettier from "prettier";

import template from "../raw/template.ts";
import { getGitHash } from "./util.ts";

export const INPUT_PATH = "./raw";
export const OUTPUT_PATH = "./html";

await Deno.mkdir(`${OUTPUT_PATH}/assets`, { recursive: true });

export async function updateHtml(version?: string) {
  console.log(`[${Date.now()}] updated!`);
  const markdown = await Deno.readTextFile(`${INPUT_PATH}/cv.md`);

  const about = {
    title: "Jon Richards - Senior Developer / Tech Lead",
    description: "TODO",
    favicon: "assets/favicon.svg",
    body: await marked.parse(markdown, { gfm: true }),
  };

  // todo may need better way to deal with all the css.
  for await (const stylesheet of Deno.readDir(`${INPUT_PATH}/assets`)) {
    await Deno.copyFile(
      `${INPUT_PATH}/assets/${stylesheet.name}`,
      `${OUTPUT_PATH}/assets/${stylesheet.name}`,
    );
  }

  const html = template(about, version || String(Date.now()));
  const formatted = await prettier.format(html, { parser: "html" });

  await Deno.writeTextFile(`./README.md`, markdown);
  await Deno.writeTextFile(`${OUTPUT_PATH}/index.html`, formatted);
}

const version = (await getGitHash()).substring(0, 8);

await updateHtml(version);
