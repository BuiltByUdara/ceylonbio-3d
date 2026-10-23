"use client";
import { heartModel } from "@/components/organui/heart-model";
import dynamic from "next/dynamic";
import { useState } from "react";
const Heart = dynamic(
  () => import("@/components/organui/heart").then((m) => m.Heart),
  { ssr: false, loading: () => <p role="status">Preparing viewer…</p> },
);
export default function AnatomyPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <h3>Human heart</h3>
      <p>Select a structure or rotate the anatomical model.</p>
      <Heart selectedId={selected} onSelectionChange={setSelected} />
      <div className="science-structures">
        {heartModel.structures.map((s) => (
          <button
            key={s.id}
            aria-pressed={s.id === selected}
            onClick={() => setSelected(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      {selected && (
        <p>
          {heartModel.structures.find((s) => s.id === selected)?.description}
        </p>
      )}
      <small>
        <a href={heartModel.attribution.source}>
          {heartModel.attribution.credit}
        </a>{" "}
        · <a href={heartModel.attribution.licenseUrl}>CC BY 4.0</a>
      </small>
    </>
  );
}
