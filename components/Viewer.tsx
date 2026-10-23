"use client";
import dynamic from "next/dynamic";
import { Component, ReactNode, useEffect, useState } from "react";
import {
  RotateCcw,
  Pause,
  Play,
  Maximize2,
  MousePointer2,
  Box,
} from "lucide-react";
import { models, structures } from "@/lib/data";
import { useStudio } from "@/lib/store";
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="canvas-message">Preparing your 3D specimen…</div>
  ),
});
function Fallback() {
  return (
    <div className="canvas-message">
      <Box size={38} />
      <strong>Explore in study mode</strong>
      <span>
        3D is unavailable on this device. Select the structures below to keep
        learning.
      </span>
    </div>
  );
}
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export default function Viewer() {
  const { model, selected, select, sinhala } = useStudio();
  const [playing, setPlaying] = useState(true),
    [reset, setReset] = useState(0),
    [webgl, setWebgl] = useState<boolean | null>(null);
  const info = models.find((m) => m.id === model)!;
  const part = structures[model].find((s) => s.id === selected);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setPlaying(false);
    try {
      const canvas = document.createElement("canvas");
      setWebgl(!!(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);
  return (
    <section className="viewer" id="studio">
      <div className="viewer-top">
        <span className="live-dot" /> LIVE 3D EXPLORER{" "}
        <span className="model-badge">UNIT {info.unit}</span>
      </div>
      <div className="canvas-wrap">
        <Boundary key={model}>
          {webgl === null ? (
            <div className="canvas-message">Checking 3D support…</div>
          ) : webgl ? (
            <Scene model={model} playing={playing} reset={reset} />
          ) : (
            <Fallback />
          )}
        </Boundary>
        <div className="specimen-title">
          <span>ANATOMY LAB / {model.toUpperCase()}</span>
          <h3>{info.title}</h3>
          <p>{info.subtitle}</p>
        </div>
        <div className="canvas-hint">
          <MousePointer2 size={13} /> Drag to rotate · Scroll to zoom
        </div>
        <span className="axis">
          Y <span>↑</span>
          <br /> Z ↙ <span>→ X</span>
        </span>
      </div>
      <div className="viewer-controls">
        <div>
          <button
            aria-label={playing ? "Pause animation" : "Play animation"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            aria-label="Reset camera"
            onClick={() => setReset((v) => v + 1)}
          >
            <RotateCcw size={16} />
          </button>
          <span>{playing ? "Animation playing" : "Animation paused"}</span>
        </div>
        <button
          aria-label="Toggle fullscreen"
          onClick={(e) => {
            const el = e.currentTarget.closest("section");
            if (document.fullscreenElement) void document.exitFullscreen();
            else void el?.requestFullscreen().catch(() => {});
          }}
        >
          <Maximize2 size={16} />
        </button>
      </div>
      <div className="structure-list">
        {structures[model].map((s) => (
          <button
            key={s.id}
            className={selected === s.id ? "selected" : ""}
            onClick={() => select(s.id)}
          >
            <i style={{ background: s.color }} />
            {sinhala ? s.si : s.en}
          </button>
        ))}
      </div>
      <div className="structure-detail">
        <span>{part ? "STRUCTURE SPOTLIGHT" : "DISCOVER THE DETAILS"}</span>
        <h4>
          {part
            ? `${part.en} / ${part.si}`
            : "A closer look changes everything."}
        </h4>
        <p>
          {part?.detail ??
            "Click a colored structure in the model or choose a label above to explore its role. Models are simplified educational schematics."}
        </p>
      </div>
    </section>
  );
}
