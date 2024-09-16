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

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
function updateStyles(styleName) {
  if (styleName === TOGGLE_DARK_MODE) {
    document.body.classList.toggle('dark-mode');
  } else {
    stylesheets[styleName] = appendStylesheet(styleName);
    enableStylesheet(styleName);
  }
}

window.addEventListener("message", (e) => {
  if (typeof e.data === "string") {
    updateStyles(e.data);
  }
});

window.addEventListener("load", (e) => {
  updateStyles("main");
});

const SOME_JAZZ = "so-jazzy";
const JAZZ_LIMIT = 1_000;
function addSomeJazz(el) {
  if (el.classList.contains(SOME_JAZZ)) {
    return;
  }

  // limits confetti spam
  el.classList.add(SOME_JAZZ);
  setTimeout(() => el.classList.remove(SOME_JAZZ), JAZZ_LIMIT);

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
