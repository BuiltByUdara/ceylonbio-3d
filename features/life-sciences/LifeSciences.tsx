"use client";

import dynamic from "next/dynamic";
import { useId, useRef, useState, type ComponentType } from "react";

const panels = {
  anatomy: dynamic(() => import("./AnatomyPanel")),
} satisfies Record<string, ComponentType>;

type ToolId = keyof typeof panels;
const tools: { id: ToolId; label: string }[] = [
  { id: "anatomy", label: "3D anatomy" },
];

export default function LifeSciences() {
  const [activeTool, setActiveTool] = useState<ToolId>("anatomy");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const Panel = panels[activeTool];

  function focusTab(index: number) {
    const next = (index + tools.length) % tools.length;
    setActiveTool(tools[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="science-lab">
      <div className="section-heading">
        <div>
          <h2>Life sciences lab</h2>
          <p>Explore structure, signals and images with OrganUI.</p>
        </div>
        <a href="https://organui.com/" target="_blank" rel="noreferrer">
          About OrganUI ↗
        </a>
      </div>
      <div
        className="science-tabs"
        role="tablist"
        aria-label="Life sciences tools"
      >
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${id}-${tool.id}`}
            role="tab"
            aria-selected={tool.id === activeTool}
            aria-controls={`${id}-panel`}
            tabIndex={tool.id === activeTool ? 0 : -1}
            onClick={() => setActiveTool(tool.id)}
            onKeyDown={(event) => {
              const target = {
                ArrowRight: index + 1,
                ArrowLeft: index - 1,
                Home: 0,
                End: tools.length - 1,
              }[event.key];
              if (target === undefined) return;
              event.preventDefault();
              focusTab(target);
            }}
          >
            {tool.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${id}-${activeTool}`}
        className="science-panel"
      >
        <Panel />
      </div>
      <p className="resource-disclaimer">
        Educational exploration only. Charts and image data are synthetic; these
        tools are not for diagnosis.
      </p>
    </section>
  );
}
