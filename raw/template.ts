type AboutProps = {
  title: string;
  description: string;
  body: string;
};

function template(about: AboutProps, version: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${about.title}</title>

    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="${about.description}" />

    <link rel="icon" href="assets/favicon.svg?v=${version}" />

    <link rel="stylesheet" href="assets/reset.css?v=${version}" />
    <link rel="stylesheet" href="assets/styles.css?v=${version}" />
    <link id="style_main" rel="stylesheet" href="assets/style-main.css?v=${version}" />
  </head>
  <body>${about.body}</body>
  
  <script defer src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <script defer src="assets/scripts.js?v=${version}"></script>
</html>`;
}

export default template;
