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
    <meta charset="UTF-8"/>
    <title>${about.title}</title>

    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="description" content="${about.description}"/>

    <link rel="icon" href="${about.favicon}"/>

    <link rel="stylesheet" href="assets/reset.css"/>
    <link rel="stylesheet" href="assets/styles.css"/>
    <link id="style_main" rel="stylesheet" href="assets/style-main.css"/>
</head>
<body>
<label class="style-select">
    Style:
    <select id="select_style">
        <option value="main">Main</option>
        <option value="red">Red</option>
    </select>
</label>
<div class="page">${about.body}</div>
</body>

<script>
    const stylesheets = {
        // main: document.querySelector("#style_main"),
        // red: document.querySelector("#style_red"),
    };

    //  todo look at a way to not load these until enabled?
    const select = document.getElementById("select_style");

    function appendStylesheet(name) {
        const existingCss = document.querySelector(\`#style_{{name}\`);

        if (existingCss) {
            return existingCss
        }

        const newCss = document.createElement('link');
        newCss.setAttribute('rel', 'stylesheet');
        newCss.setAttribute('href', \`assets/style-{{name}.css\`);
        newCss.setAttribute('id', \`style_\{{name}\`);
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
        stylesheets[styleName] = appendStylesheet(styleName)
        enableStylesheet(styleName);
    }


    select.addEventListener("change", (e) => updateStyles(e.target.value));
    
    function addSomeJazz(el) {
      if (!el.classList.contains('jazzy')) {
        el.classList.add("jazzy");
        [...Array(6)].forEach(() => {
          const particle = document.createElement('i');
          particle.className = 'particle';
          console.log(particle);
          el.appendChild(particle)
        })
      }
    }
    
    document.querySelectorAll('h2').forEach(el => el.addEventListener("mouseenter", () => addSomeJazz(el)))

    updateStyles('main')
</script>
</html>`
      .replaceAll('{{', "${"); // todo is there a better way to do this? nested string literals
}

export default template;
