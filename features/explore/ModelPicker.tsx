"use client";

import { models, type ModelId } from "@/lib/models";
import { useStudio } from "@/lib/store";
import {
  ArrowUpRight,
  Brain,
  Dna,
  Heart,
  Layers3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const modelIcons: Record<ModelId, LucideIcon> = {
  heart: Heart,
  brain: Brain,
  dna: Dna,
  membrane: Layers3,
};

export default function ModelPicker() {
  const activeModel = useStudio((state) => state.model);
  const setModel = useStudio((state) => state.setModel);
  return (
    <div className="model-panel">
      <div className="panel-label">
        CHOOSE YOUR EXPLORATION{" "}
        <span>01 — {String(models.length).padStart(2, "0")}</span>
      </div>
      {models.map((model) => {
        const Icon = modelIcons[model.id];
        const selected = activeModel === model.id;
        return (
          <button
            key={model.id}
            className={`model-card ${selected ? "model-active" : ""}`}
            aria-pressed={selected}
            onClick={() => setModel(model.id)}
          >
            <div className={`model-illustration illustration-${model.id}`}>
              <Icon strokeWidth={1.15} />
              <span className="orbit-ring" />
            </div>
            <div>
              <span className="card-unit">
                UNIT {String(model.unit).padStart(2, "0")}{" "}
                <span> / {model.category.toUpperCase()}</span>
              </span>
              <h3>{model.title}</h3>
              <p>{model.tag}</p>
            </div>
            <span className="model-arrow">
              {selected ? (
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
          <strong>Not just looking. Understanding.</strong>Rotate, zoom, and
          select a structure to connect what you see with what you learn.
        </p>
      </div>
    </div>
  );
}
