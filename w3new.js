function includeHTML(callback) {
  const elements = document.querySelectorAll("[w3-include-html]");
  let loaded = 0;

  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (!file) return;

    fetch(file)
      .then(resp => {
        if (!resp.ok) throw new Error("Page not found");
        return resp.text();
      })
      .then(data => {
        el.innerHTML = data;
        loaded++;

        // Agar ye sidebar.html hai to banners.js load karo
        if (file.includes("sidebar.html")) {
          const script = document.createElement("script");
          script.src = "https://aksharhanumandham.in/data/banners.js?v=" + new Date().getTime();
          document.body.appendChild(script);
        }

        if (loaded === elements.length && callback) callback();
      })
      .catch(err => {
        el.innerHTML = "Error loading " + file;
      });
  });
}

// Page load hone par call karo
document.addEventListener("DOMContentLoaded", () => includeHTML());
