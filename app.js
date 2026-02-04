// EDIT YOUR LABS HERE
const LABS = [
  {
    title: "Lab 1: Sensor Frames + Depth Measurements",
    class: "ECE 5160",
    date: "2026-01-28",
    summary: "Processed RealSense depth points, accounted for image-processing delay, and investigated error sources.",
    tags: ["perception", "frames", "realsense"],
    links: [
      { label: "Writeup (PDF)", url: "assets/lab1_writeup.pdf" },
      { label: "Code", url: "https://github.com/your-username/your-repo" }
    ]
  },
  {
    title: "Lab 2: Waypoint Following",
    class: "ECE 5160",
    date: "2026-02-02",
    summary: "Implemented feedback linearization, logged runs, and tuned gains for smoother tracking.",
    tags: ["controls", "trajectory", "logging"],
    links: [
      { label: "Writeup (PDF)", url: "assets/lab2_writeup.pdf" },
      { label: "Code", url: "https://github.com/your-username/your-repo" }
    ]
  }
];

const els = {
  grid: document.getElementById("grid"),
  resultsCount: document.getElementById("resultsCount"),
  year: document.getElementById("year"),
};

els.year.textContent = new Date().getFullYear();

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function renderLabs(list) {
  els.grid.innerHTML = "";

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

  els.resultsCount.textContent = `${list.length} lab${list.length === 1 ? "" : "s"}`;
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
  return escapeHtml(str).replaceAll("`", "&#096;");
}

LABS.sort((a,b) => (b.date || "").localeCompare(a.date || ""));
renderLabs(LABS);
