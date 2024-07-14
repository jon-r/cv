const stylesheets = {};

function appendStylesheet(name) {
  const stylesheetId = `#style_${name}`;
  const existingCss = document.querySelector(stylesheetId);

  if (existingCss) {
    return existingCss;
  }

  const newCss = document.createElement("link");
  newCss.setAttribute("rel", "stylesheet");
  newCss.setAttribute("href", `assets/style-${name}.css`);
  newCss.setAttribute("id", stylesheetId);
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
  if (typeof e.data === "string") {
    updateStyles(e.data);
  }
});

window.addEventListener("load", (e) => {
  updateStyles("main");
});

function addSomeJazz(el) {
  if (el.classList.contains("jazzy")) {
    return;
  }

  // stops confetti spam
  el.classList.add("jazzy");

  const yOffset = el.getBoundingClientRect().top / window.innerHeight;

  confetti({
    angle: 45,
    origin: { x: 0.1, y: yOffset },
  });
}

const isReducedMotion =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

if (!isReducedMotion) {
  document.querySelectorAll("h2").forEach((el) => {
    el.addEventListener("mouseenter", () => addSomeJazz(el));
  });
}
