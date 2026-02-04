// ==============
// EDIT YOUR LABS HERE
// ==============
// Tips:
// - "class" can be like "MAE 4180", "ECE 4160", etc.
// - "links" can point to PDFs in your repo, external GitHub repos, YouTube demos, Google Drive share links, etc.
// - If you upload writeups into a folder like /assets/, you can link like: "assets/lab1_writeup.pdf"

const LABS = [
  {
    title: "Lab 1: Sensor Frames + Depth Measurements",
    class: "MAE 4180 / ECE 4180",
    date: "2026-01-28",
    summary: "Processed RealSense depth points, investigated timing delay, and identified error sources.",
    tags: ["perception", "frames", "realsense"],
    links: [
      { label: "Writeup (PDF)", url: "assets/lab1_writeup.pdf" },
      { label: "Code", url: "https://github.com/your-username/your-repo" }
    ]
  },
  {
    title: "Lab 2: Waypoint Following",
    class: "MAE 4180 / ECE 4180",
    date: "2026-02-02",
    summary: "Implemented feedback linearization, logged data, and tuned controller gains for smooth tracking.",
    tags: ["controls", "trajectory", "logging"],
    links: [
      { label: "Writeup (PDF)", url: "assets/lab2_writeup.pdf" },
      { label: "Code", url: "https://github.com/your-username/your-repo" }
    ]
  },
  {
    title: "Lab: CAD + Manufacturing Notes",
    class: "MAE 4272",
    date: "2026-01-20",
    summary: "Design iteration notes, tolerances, and DFM considerations for lab hardware.",
    tags: ["CAD", "manufacturing", "DFM"],
    links: [
      { label: "Notes", url: "assets/cad_notes.pdf" }
    ]
  }
];

// ==============
// UI LOGIC
// ==============

const els = {
  search: document.getElementById("search"),
  classFilter: document.getElementById("classFilter"),
  tagFilter: document.getElementById("tagFilter"),
  grid: document.getElementById("grid"),
  resultsCount: document.getElementById("resultsCount"),
  reset: document.getElementById("reset"),
  addHint: document.getElementById("addHint"),
  year: document.getElementById("year"),
};

els.year.textContent = new Date().getFullYear();

function uniq(arr) {
  return [...new Set(arr)].sort((a,b) => a.localeCompare(b));
}

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function matchesSearch(lab, q) {
  if (!q) return true;
  const hay = [
    lab.title, lab.class, lab.summary,
    ...(lab.tags || [])
  ].join(" ");
  return normalize(hay).includes(normalize(q));
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function renderFilters() {
  const classes = uniq(LABS.map(l => l.class).filter(Boolean));
  const tags = uniq(LABS.flatMap(l => l.tags || []).filter(Boolean));

  for (const c of classes) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    els.classFilter.appendChild(opt);
  }
  for (const t of tags) {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    els.tagFilter.appendChild(opt);
  }
}

function renderLabs(list) {
  els.grid.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "card card--wide";
    empty.innerHTML = `
      <h3>No labs match your filters.</h3>
      <p>Try clearing filters or using a different search term.</p>
    `;
    els.grid.appendChild(empty);
    els.resultsCount.textContent = "0 results";
    return;
  }

  for (const lab of list) {
    const card = document.createElement("article");
    card.className = "card";

    const tagsHtml = (lab.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const linksHtml = (lab.links || []).map(a => {
      const safeUrl = a.url || "#";
      const safeLabel = a.label || "Link";
      return `<a href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeLabel)}</a>`;
    }).join("");

    card.innerHTML = `
      <div class="meta">
        <span class="badge badge--accent">${escapeHtml(lab.class || "Class")}</span>
        ${lab.date ? `<span class="badge">${escapeHtml(fmtDate(lab.date))}</span>` : ``}
      </div>
      <h3>${escapeHtml(lab.title || "Untitled Lab")}</h3>
      <p>${escapeHtml(lab.summary || "")}</p>
      ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ``}
      ${linksHtml ? `<div class="links">${linksHtml}</div>` : ``}
    `;

    els.grid.appendChild(card);
  }

  els.resultsCount.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
}

function applyFilters() {
  const q = els.search.value;
  const classVal = els.classFilter.value;
  const tagVal = els.tagFilter.value;

  let list = [...LABS];

  if (classVal !== "all") list = list.filter(l => l.class === classVal);
  if (tagVal !== "all") list = list.filter(l => (l.tags || []).includes(tagVal));
  list = list.filter(l => matchesSearch(l, q));

  // newest first if date present
  list.sort((a,b) => (b.date || "").localeCompare(a.date || ""));

  renderLabs(list);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(str) {
  // minimal escaping, same as HTML is fine here
  return escapeHtml(str).replaceAll("`", "&#096;");
}

els.search.addEventListener("input", applyFilters);
els.classFilter.addEventListener("change", applyFilters);
els.tagFilter.addEventListener("change", applyFilters);

els.reset.addEventListener("click", () => {
  els.search.value = "";
  els.classFilter.value = "all";
  els.tagFilter.value = "all";
  applyFilters();
});

els.addHint.addEventListener("click", () => {
  alert("Edit your labs in app.js inside the LABS array at the top. Add PDFs to an /assets folder and link them like assets/lab1_writeup.pdf");
});

renderFilters();
applyFilters();
