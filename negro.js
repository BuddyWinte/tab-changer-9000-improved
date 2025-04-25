// ✅ Utility to create an element with attributes and children
function createElement(tag, attributes = {}, ...children) {
  const el = document.createElement(tag);

  // Apply attributes and event listeners
  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // append children
  children.forEach(child => {
    if (typeof child === "string") {
      el.innerHTML += child;
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}
//overlay setup
function setupOverlay() {
        // if iframe!
  if (window.self !== window.top) return;
  // font injection
  const fonts = [
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" }],
    ["link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" }]
  ];
  fonts.forEach(([tag, attrs]) => document.head.appendChild(createElement(tag, attrs)));
  // custom styles
  const style = createElement("style", {}, `
    body { font-family: 'Poppins', sans-serif; }
    .overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 9999;
    }
    .overlay.show { opacity: 1; }
    .fa-triangle-exclamation {
      font-size: 50px;
      margin-bottom: 15px;
      color: #ffcc00;
    }
    .overlay .bold {
      font-weight: 600;
      font-size: 24px;
      margin: 10px 0;
    }
    .overlay .normal {
      font-size: 16px;
      text-align: center;
      max-width: 400px;
    }
  `);
  document.head.appendChild(style);

  // create over..then show it
  const overlay = createElement("div", { class: "overlay" },
    createElement("i", { class: "fas fa-triangle-exclamation" }),
    createElement("div", { class: "bold" }, "Insecure Connection"),
    createElement("div", { class: "normal" },
      `You can't use SkipSchool in this way. Please load our services at `,
      `<a href="https://smoresxo.shop" style="color: #ffcc00; text-decoration: underline;">smoresxo.shop</a>`
    )
  );

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("show"));
}

//execute
setupOverlay();
