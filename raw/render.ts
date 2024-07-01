import { marked } from "marked";
import prettier from "prettier";

const about = {
  title: "Jon Richards - Senior Developer / Tech Lead",
  description: "TODO",
  favicon: "assets/favicon.svg",
};

const input = ".";
const output = "../html";

const markdown = await Deno.readTextFile(`${input}/cv.md`);
const body = marked.parse(markdown);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${about.title}</title>

  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="description" content="${about.description}"/>

  <link rel="stylesheet" href="assets/reset.css">
  <link rel="icon" href="${about.favicon}">
</head>
<body>
${body}
</body>
</html>
`;

const formatted = await prettier.format(html, { parser: "html" });

await Deno.mkdir(`${output}/assets`, { recursive: true });

// todo need better way to deal with all the css
for await (const stylesheet of Deno.readDir(`${input}/assets`)) {
  await Deno.copyFile(
    `${input}/assets/${stylesheet.name}`,
    `${output}/assets/${stylesheet.name}`,
  );
}

Deno.writeTextFile(`${output}/index.html`, formatted);
