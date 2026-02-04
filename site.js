// Highlight current nav link
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("is-active");
  });
})();

// Copy buttons for code blocks
(function(){
  document.querySelectorAll("[data-copy-target]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-copy-target");
      const el = document.getElementById(id);
      if (!el) return;

      const text = el.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => btn.textContent = old, 900);
      } catch {
        btn.textContent = "Copy failed";
        setTimeout(() => btn.textContent = "Copy", 900);
      }
    });
  });
})();