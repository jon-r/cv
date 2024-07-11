type AboutProps = {
  title: string;
  description: string;
  favicon: string;

  body: string;
};

function template(about: AboutProps) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${about.title}</title>

    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="${about.description}" />

    <link rel="icon" href="${about.favicon}" />

    <link rel="stylesheet" href="assets/reset.css" />
    <link rel="stylesheet" href="assets/styles.css" />
    <link id="style_main" rel="stylesheet" href="assets/style-main.css" />
  </head>
  <body>
    ${about.body}
  </body>

  <script>
    const stylesheets = {};

    function appendStylesheet(name) {
      const existingCss = document.querySelector(\`#style_\${name}\`);

      if (existingCss) {
        return existingCss;
      }

      const newCss = document.createElement("link");
      newCss.setAttribute("rel", "stylesheet");
      newCss.setAttribute("href", \`assets/style-\${name}.css\`);
      newCss.setAttribute("id", \`style_\${name}\`);
      document.head.appendChild(newCss);

      return newCss;
    }

    function enableStylesheet(name) {
      Object.entries(stylesheets).forEach(([key, value]) => {
        if (name === key) {
          value.removeAttribute("disabled");
        } else {
          value.setAttribute("disabled", true);
        }
      });
    }

    function updateStyles(styleName) {
      stylesheets[styleName] = appendStylesheet(styleName);
      enableStylesheet(styleName);
    }

    window.addEventListener("message", (e) => {
      // todo this needs some security?
      updateStyles(e.data);
    });

    function addSomeJazz(el) {
      if (!el.classList.contains("jazzy")) {
        el.classList.add("jazzy");
        [...Array(6)].forEach(() => {
          const particle = document.createElement("i");
          particle.className = "particle";
          el.appendChild(particle);
        });
      }
    }

    document
      .querySelectorAll("h2")
      .forEach((el) =>
        el.addEventListener("mouseenter", () => addSomeJazz(el)),
      );

    updateStyles("main");
  </script>
</html>`;
}

export default template;
