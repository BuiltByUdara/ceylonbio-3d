"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Atom,
  BookOpen,
  Box,
  ChevronRight,
  Download,
  FlaskConical,
  Heart,
  Leaf,
  Menu,
  Search,
  Sparkles,
  X,
  Dna,
  Brain,
  Layers3,
  GraduationCap,
  Check,
} from "lucide-react";
import Viewer from "@/components/Viewer";
import LifeSciences from "@/components/LifeSciences";
import { models, units } from "@/lib/data";
import { useStudio } from "@/lib/store";
type Tab = "Explore" | "Syllabus" | "Resource hub" | "Life sciences";
const icons = { heart: Heart, brain: Brain, dna: Dna, membrane: Layers3 };
const resources = [
  {
    title: "Human heart · annotated diagram",
    type: "Diagrams",
    unit: 5,
    text: "Human heart study diagram\nRight atrium → right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium → left ventricle → aorta → body.\nCompare wall thickness and identify the four valves.",
  },
  {
    title: "Cell membrane · revision notes",
    type: "Resource books",
    unit: 2,
    text: "Cell membrane revision notes\nThe fluid mosaic model describes a dynamic phospholipid bilayer containing proteins.\nCompare simple diffusion, facilitated diffusion, osmosis, and active transport.",
  },
  {
    title: "Investigating osmosis",
    type: "Practicals",
    unit: 2,
    text: "Investigating osmosis — practical guide\nPrepare equal potato cylinders. Record initial masses. Immerse in a range of sucrose concentrations for equal times. Blot consistently and reweigh.\nCalculate percentage change in mass. Keep temperature and cylinder dimensions constant. Follow teacher supervision.",
  },
  {
    title: "DNA · complementary base pairing",
    type: "Diagrams",
    unit: 6,
    text: "DNA base pairing\nAdenine pairs with thymine (two hydrogen bonds). Guanine pairs with cytosine (three hydrogen bonds).\nDraw antiparallel sugar-phosphate backbones. Label the 5′ and 3′ ends.",
  },
];
function download(title: string, text: string) {
  const isDiagram = title.includes("diagram") || title.includes("pairing");
  let content = text,
    type = "text/plain",
    ext = "txt";
  if (isDiagram) {
    content = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700"><rect width="1000" height="700" fill="#f0fdfa"/><text x="50" y="70" font-family="sans-serif" font-size="30">${title}</text>${title.includes("heart") ? `<rect x="200" y="180" width="240" height="150" rx="50" fill="#a5b4fc"/><rect x="200" y="380" width="240" height="170" rx="50" fill="#a78bfa"/><rect x="560" y="180" width="240" height="150" rx="50" fill="#fda4af"/><rect x="560" y="380" width="240" height="170" rx="50" fill="#fb7185"/><g font-family="sans-serif" font-size="22"><text x="245" y="265">Right atrium</text><text x="225" y="470">Right ventricle</text><text x="610" y="265">Left atrium</text><text x="590" y="470">Left ventricle</text><text x="290" y="365">↓</text><text x="670" y="365">↓</text></g>` : Array.from({ length: 8 }, (_, i) => `<path d="M ${300 + Math.sin(i) * 90} ${160 + i * 55} H ${700 - Math.sin(i) * 90}" stroke="${i % 2 ? "#8b5cf6" : "#0891b2"}" stroke-width="12"/><text x="480" y="${150 + i * 55}" font-family="sans-serif" font-size="20">${i % 2 ? "G ≡ C" : "A = T"}</text>`).join("")}<text x="50" y="650" font-family="sans-serif" font-size="18">CeylonBio 3D · Simplified educational schematic</text></svg>`;
    type = "image/svg+xml";
    ext = "svg";
  }
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, "-")}.${ext}`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function Home() {
  const [tab, setTab] = useState<Tab>("Explore"),
    [mobile, setMobile] = useState(false),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All resources"),
    [unit, setUnit] = useState<number | null>(null);
  const { sinhala, toggleLanguage, model, setModel, visited } = useStudio();
  const navigate = (t: Tab) => {
    setTab(t);
    setMobile(false);
    setQuery("");
  };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <a href="#" className="brand" onClick={() => navigate("Explore")}>
          <span className="brand-icon">
            <Atom size={26} />
          </span>
          <span>
            CeylonBio<span className="brand-3d">3D</span>
            <small>A NEW DIMENSION OF LEARNING</small>
          </span>
        </a>
        <button
          className="mobile-close"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        >
          <X />
        </button>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav>
          {(["Explore", "Syllabus", "Resource hub", "Life sciences"] as Tab[]).map((t, i) => {
            const Icon = [Box, BookOpen, Layers3, FlaskConical][i];
            return (
              <button
                key={t}
                onClick={() => navigate(t)}
                className={tab === t ? "nav-active" : ""}
              >
                <Icon size={19} />
                {t}
                {t === "Explore" && <span className="new-label">NEW</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-divider" />
        <div className="workspace-label">
          THE BIG PICTURE <span>10 UNITS</span>
        </div>
        <div className="unit-shortcuts">
          {units.map((u, i) => (
            <button
              key={u[0]}
              onClick={() => {
                navigate("Syllabus");
                setUnit(i);
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>
                {
                  [
                    "Introduction to biology",
                    "Cell biology",
                    "Diversity of organisms",
                    "Plant form & function",
                    "Animal form & function",
                    "Genetics & molecular biology",
                    "Recombinant DNA",
                    "Environmental biology",
                    "Applied biology",
                    "Microbiology",
                  ][i]
                }
              </span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="student-note">
            <GraduationCap size={22} />
            <strong>Big dreams. Small steps.</strong>
            <p>Your next discovery starts here.</p>
          </div>
          <div className="profile">
            <span>AL</span>
            <div>
              A/L Biology student<small>Let curiosity lead the way</small>
            </div>
            <Leaf size={16} />
          </div>
        </div>
      </aside>
      <main>
        <header>
          <div className="breadcrumb">
            <button
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
            <span>Your workspace</span>
            <ChevronRight size={13} />
            <strong>{tab}</strong>
          </div>
          <div className="header-actions">
            <span className="syllabus-badge">
              <i /> Sri Lankan A/L syllabus
            </span>
            <button
              className="language"
              onClick={toggleLanguage}
              aria-label="Toggle Sinhala terminology"
            >
              <span className={!sinhala ? "active" : ""}>EN</span>
              <span className={sinhala ? "active" : ""}>සිං</span>
            </button>
            <span className="avatar">AL</span>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            className="content"
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="eyebrow">
              <span /> MADE FOR THE CURIOUS MIND
            </div>
            <div className="page-heading">
              <div>
                <h1>
                  {tab === "Life sciences" ? (<>Life, at <span>every scale.</span></>) : tab === "Explore" ? (
                    <>
                      Small details.
                      <br />
                      <span>Extraordinary discoveries.</span>
                    </>
                  ) : tab === "Syllabus" ? (
                    <>
                      Your path to <span>understanding.</span>
                    </>
                  ) : (
                    <>
                      A little resource.
                      <br />
                      <span>A bigger understanding.</span>
                    </>
                  )}
                </h1>
                <p>
                  {tab === "Life sciences" ? "Anatomy, clinical signals, molecules and image exploration." : tab === "Explore" ? "Go beyond the textbook. Explore the living world in a whole new dimension."
                    : tab === "Syllabus"
                      ? "Ten units. One connected living world. Start wherever curiosity takes you."
                      : "Thoughtful study materials to support your next discovery."}
                </p>
              </div>
              <div className="edition">
                <span>DESIGNED FOR</span>
                <strong>G.C.E. A/L</strong>
                <span>BIOLOGY · SRI LANKA</span>
              </div>
            </div>
            {tab === "Life sciences" ? <LifeSciences /> : tab === "Explore" ? (
              <>
                <div className="stats-row">
                  <div>
                    <Box />
                    <strong>04</strong>
                    <span>Interactive 3D models</span>
                  </div>
                  <div>
                    <BookOpen />
                    <strong>10</strong>
                    <span>Syllabus units</span>
                  </div>
                  <div>
                    <span className="lang-stat">අ</span>
                    <strong>02</strong>
                    <span>Languages. One understanding.</span>
                  </div>
                  <span className="stats-note">
                    <Sparkles size={14} /> A fresh perspective on biology
                  </span>
                </div>
                <div className="section-heading">
                  <div>
                    <h2>
                      The discovery lab <span>INTERACTIVE 3D</span>
                    </h2>
                    <p>A closer look at the things that make life, life.</p>
                  </div>
                  <span className="subtle">
                    Pick a model. Get curious. <ArrowUpRight size={15} />
                  </span>
                </div>
                <div className="lab-grid">
                  <Viewer />
                  <div className="model-panel">
                    <div className="panel-label">
                      CHOOSE YOUR EXPLORATION <span>01 — 04</span>
                    </div>
                    {models.map((m, i) => {
                      const Icon = icons[m.id];
                      return (
                        <button
                          key={m.id}
                          className={`model-card ${model === m.id ? "model-active" : ""}`}
                          onClick={() => setModel(m.id)}
                        >
                          <div
                            className={`model-illustration illustration-${m.id}`}
                          >
                            <Icon strokeWidth={1.15} />
                            <span className="orbit-ring" />
                          </div>
                          <div>
                            <span className="card-unit">
                              UNIT {String(m.unit).padStart(2, "0")}{" "}
                              <span>
                                {" "}
                                /{" "}
                                {
                                  [
                                    "CIRCULATION",
                                    "COORDINATION",
                                    "MOLECULAR BIOLOGY",
                                    "CELL BIOLOGY",
                                  ][i]
                                }
                              </span>
                            </span>
                            <h3>{m.title}</h3>
                            <p>{m.tag}</p>
                          </div>
                          <span className="model-arrow">
                            {model === m.id ? (
                              <span className="tiny-dot" />
                            ) : (
                              <ArrowUpRight size={18} />
                            )}
                          </span>
                        </button>
                      );
                    })}
                    <div className="learning-note">
                      <span>
                        <Sparkles size={17} />
                      </span>
                      <p>
                        <strong>Not just looking. Understanding.</strong>Rotate,
                        zoom, and select a structure to connect what you see
                        with what you learn.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bottom-grid">
                  <button
                    className="promo syllabus-promo"
                    onClick={() => navigate("Syllabus")}
                  >
                    <span className="promo-icon">
                      <BookOpen />
                    </span>
                    <div>
                      <span>YOUR SYLLABUS, CONNECTED</span>
                      <h3>From the first cell to entire ecosystems.</h3>
                      <p>Explore all 10 units of A/L Biology.</p>
                    </div>
                    <ArrowUpRight />
                  </button>
                  <button
                    className="promo resource-promo"
                    onClick={() => navigate("Resource hub")}
                  >
                    <span className="promo-icon">
                      <Download />
                    </span>
                    <div>
                      <span>A LITTLE HELP ALONG THE WAY</span>
                      <h3>Good resources. Deeper understanding.</h3>
                      <p>Revision notes, practicals & diagrams.</p>
                    </div>
                    <ArrowUpRight />
                  </button>
                </div>
              </>
            ) : tab === "Syllabus" ? (
              <div className="syllabus-grid">
                {units.map((u, i) => (
                  <article
                    key={u[0]}
                    className={`unit-card ${unit === i ? "expanded" : ""}`}
                  >
                    <button onClick={() => setUnit(unit === i ? null : i)}>
                      <span className="unit-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <small>UNIT {i + 1}</small>
                        <h3>{u[0]}</h3>
                        <p>{u[1]}</p>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                    {unit === i && (
                      <div className="unit-expanded">
                        <p>
                          Explore these topics using your school resource book
                          and teacher-guided activities.
                        </p>
                        {models
                          .filter((m) => m.unit === i + 1)
                          .map((m) => (
                            <button
                              key={m.id}
                              onClick={() => {
                                setModel(m.id);
                                navigate("Explore");
                              }}
                            >
                              Open {m.title} <ArrowRight size={15} />
                            </button>
                          ))}
                        {!models.some((m) => m.unit === i + 1) && (
                          <span>
                            Interactive models for this unit are being
                            developed. Use the topic outline to guide your
                            revision.
                          </span>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <>
                <div className="resource-toolbar">
                  <label className="search">
                    <Search size={18} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search notes, practicals, diagrams…"
                      aria-label="Search resources"
                    />
                  </label>
                  <div className="filter-tabs">
                    {[
                      "All resources",
                      "Resource books",
                      "Practicals",
                      "Diagrams",
                    ].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={filter === f ? "active" : ""}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="resource-disclaimer">
                  Original CeylonBio study aids. Resource book entries are
                  concise revision notes; consult your official school resource
                  books for the full syllabus.
                </p>
                <div className="resource-grid">
                  {resources
                    .filter(
                      (r) =>
                        (filter === "All resources" || r.type === filter) &&
                        `${r.title} ${r.type} ${r.unit}`
                          .toLowerCase()
                          .includes(query.toLowerCase()),
                    )
                    .map((r) => (
                      <article className="resource-card" key={r.title}>
                        <div className="resource-art">
                          {r.type === "Practicals" ? (
                            <FlaskConical />
                          ) : r.type === "Diagrams" ? (
                            <Dna />
                          ) : (
                            <BookOpen />
                          )}
                          <span>UNIT {r.unit}</span>
                        </div>
                        <small>
                          {r.type.toUpperCase()} ·{" "}
                          {r.type === "Diagrams" ? "SVG" : "TXT"}
                        </small>
                        <h3>{r.title}</h3>
                        <p>
                          A focused companion for your A/L Biology revision.
                        </p>
                        <button onClick={() => download(r.title, r.text)}>
                          Download study aid <Download size={16} />
                        </button>
                      </article>
                    ))}
                </div>
                {!resources.some(
                  (r) =>
                    (filter === "All resources" || r.type === filter) &&
                    `${r.title} ${r.type} ${r.unit}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                ) && (
                  <div className="empty-state">
                    <Search />
                    <h3>No resources found</h3>
                    <p>Try a topic such as heart, DNA, or osmosis.</p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("All resources");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}
            <footer>
              <span>
                <Atom size={15} /> CeylonBio 3D <span>·</span> Made for a deeper
                understanding.
              </span>
              <span>
                {visited.length} / 4 models explored <Check size={13} />
                <i /> Learn with curiosity.
              </span>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
