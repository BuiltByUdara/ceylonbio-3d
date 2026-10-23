import type { StudyResource } from "./data";

function escapeXml(value: string) {
  return value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}

function heartDiagram() {
  const chambers = [
    { x: 200, y: 180, height: 150, fill: "#a5b4fc", label: "Right atrium" },
    { x: 200, y: 380, height: 170, fill: "#a78bfa", label: "Right ventricle" },
    { x: 560, y: 180, height: 150, fill: "#fda4af", label: "Left atrium" },
    { x: 560, y: 380, height: 170, fill: "#fb7185", label: "Left ventricle" },
  ];
  return (
    chambers
      .map(
        ({ x, y, height, fill, label }) => `
    <rect x="${x}" y="${y}" width="240" height="${height}" rx="50" fill="${fill}"/>
    <text x="${x + 120}" y="${y + height / 2}" text-anchor="middle" dominant-baseline="middle" font-size="22">${label}</text>
  `,
      )
      .join("") +
    '<text x="310" y="365" font-size="22">↓</text><text x="670" y="365" font-size="22">↓</text>'
  );
}

function dnaDiagram() {
  return Array.from(
    { length: 8 },
    (_, index) => `
    <path d="M ${300 + Math.sin(index) * 90} ${160 + index * 55} H ${700 - Math.sin(index) * 90}" stroke="${index % 2 ? "#8b5cf6" : "#0891b2"}" stroke-width="12"/>
    <text x="480" y="${150 + index * 55}" font-size="20">${index % 2 ? "G ≡ C" : "A = T"}</text>
  `,
  ).join("");
}

/** Builds a download without touching the DOM, so rendering can be tested separately. */
export function createResourceFile(resource: StudyResource) {
  if (!resource.diagram) {
    return {
      content: resource.text,
      mimeType: "text/plain;charset=utf-8",
      extension: "txt",
    };
  }
  const diagram = resource.diagram === "heart" ? heartDiagram() : dnaDiagram();
  return {
    mimeType: "image/svg+xml;charset=utf-8",
    extension: "svg",
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700">
      <rect width="1000" height="700" fill="#f0fdfa"/>
      <g font-family="sans-serif"><text x="50" y="70" font-size="30">${escapeXml(resource.title)}</text>
      ${diagram}<text x="50" y="650" font-size="18">CeylonBio 3D · Simplified educational schematic</text></g>
    </svg>`,
  };
}

export function downloadResource(resource: StudyResource) {
  const file = createResourceFile(resource);
  const url = URL.createObjectURL(
    new Blob([file.content], { type: file.mimeType }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${resource.title.replace(/[^a-z0-9]/gi, "-")}.${file.extension}`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
