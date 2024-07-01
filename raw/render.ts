import {marked} from 'marked';
import prettier from 'prettier';

const about = {
  title: "Jon Richards - Senior Developer / Tech Lead",
  description: "TODO",
  favicon: "TODO"
}

const markdown = await Deno.readTextFile('./cv.md')

const body = marked.parse(markdown);



const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${about.title}</title>

  <meta name="viewport" content="width=device-width,initial-scale=1"/>

  <meta name="description" content="${about.description}"/>

  <link rel="stylesheet" href="/assets/reset.css">

  <!--    todo -->
  <!--    <link rel="icon" href="${about.favicon}">-->
</head>
<body>
${body}
</body>
</html>
`;

const formatted = await prettier.format(html, {parser: "html"});

// todo look at formatting this output nicely
Deno.writeTextFile("../index.html", formatted)
