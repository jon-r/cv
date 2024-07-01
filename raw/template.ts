type AboutProps = {
  title: string;
  description: string;
  favicon: string;

  body: string;
};

function template(about: AboutProps) {
  return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${about.title}</title>
      
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="description" content="${about.description}"/>
      
        <link rel="icon" href="${about.favicon}">
      
        <link rel="stylesheet" href="assets/reset.css">
        <link rel="stylesheet" href="assets/styles.css">
        <link id="style_main" rel="stylesheet" href="assets/style-main.css" >
        <link id="style_red" rel="stylesheet" href="assets/style-red.css" disabled>
      </head>
      <body>

          <label>
              Style:
            <select id="select_style">
            <option value="main" >Main</option>
            <option value="red" >Red</option>
            </select>
          </label>
      
        ${about.body}
      </body>
      
      <script>
      const stylesheets = {
          main: document.querySelector('#style_main'),
          red: document.querySelector('#style_red'),
      };
      
      // todo maybe add astro|alpine?
      //  todo look at a way to not load these until enabled?
      const select = document.getElementById("select_style");
      select.addEventListener("change", (e) => {
          Object.entries(stylesheets).forEach(([key, value]) => {
              if (e.target.value === key) {
                  value.removeAttribute("disabled");
              } else {
                  value.setAttribute('disabled', true);
              }
          })
      })
      </script>
      
      </html>
    `;
}

export default template;
