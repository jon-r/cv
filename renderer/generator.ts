import { marked } from "marked";
import prettier from "prettier";

import template from "../raw/template.ts";
import { getGitHash } from "./util.ts";

export const INPUT_PATH = "./raw";
export const OUTPUT_PATH = "./html";

async function generateWebpage(markdown: string, version: string = String(Date.now())): Promise<string> {
  const about = {
    title: "Jon Richards - Senior Developer / Tech Lead",
    description: "TODO", // FIXME
    body: await marked.parse(markdown, { gfm: true }),
  };

  return template(about, version);
}

export async function updateHtml(version?: string) {
  console.log(`[${Date.now()}] updated!`);
  const markdown = await Deno.readTextFile(`${INPUT_PATH}/cv.md`);

  // todo may need better way to deal with all the css.
  for await (const stylesheet of Deno.readDir(`${INPUT_PATH}/assets`)) {
    await Deno.copyFile(
      `${INPUT_PATH}/assets/${stylesheet.name}`,
      `${OUTPUT_PATH}/assets/${stylesheet.name}`,
    );
  }

  const html = await generateWebpage(markdown, version);
  const formatted = await prettier.format(html, { parser: "html" });

  await Deno.writeTextFile(`./README.md`, markdown);
  await Deno.writeTextFile(`${OUTPUT_PATH}/index.html`, formatted);
}

await updateHtml((await getGitHash()).substring(0, 8));
