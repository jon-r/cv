import { marked } from "marked";
import prettier from "prettier";
import {
  writeFile,
  readFile,
  copyFile,
  readdir,
  mkdir,
} from "node:fs/promises";

import { getGitHash } from "./util.ts";

export const INPUT_PATH = "./raw";
export const OUTPUT_PATH = import.meta.env.VITE_OUTPUT || "./html";

await mkdir(`${OUTPUT_PATH}/assets`, { recursive: true });

async function generateWebpage(
  markdown: string,
  version: string = String(Date.now()),
): Promise<string> {
  const about = {
    title: "Jon Richards - Senior Developer / Tech Lead",
    description: "CV for Jon Richards",
    body: await marked.parse(markdown, { gfm: true }),
  };

  const template = (await import("../raw/template.ts")).default;

  return template(about, version);
}

export async function updateHtml(version?: string) {
  console.log(`[${Date.now()}] updated!`);
  const markdown = await readFile(`${INPUT_PATH}/cv.md`, { encoding: "utf8" });

  // todo may need better way to deal with all the css.
  for (const stylesheet of await readdir(`${INPUT_PATH}/assets`)) {
    await copyFile(
      `${INPUT_PATH}/assets/${stylesheet}`,
      `${OUTPUT_PATH}/assets/${stylesheet}`,
    );
  }

  const html = await generateWebpage(markdown, version);
  const formatted = await prettier.format(html, { parser: "html" });

  await writeFile(`./README.md`, markdown);
  await writeFile(`${OUTPUT_PATH}/index.html`, formatted);
}

const version = (await getGitHash()).substring(0, 8);
await updateHtml(version);
