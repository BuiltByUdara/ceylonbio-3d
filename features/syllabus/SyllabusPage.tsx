"use client";

import { models } from "@/lib/models";
import { routes } from "@/lib/navigation";
import { useStudio } from "@/lib/store";
import { units, type SyllabusUnit } from "@/lib/syllabus";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

function UnitCard({ unit }: { unit: SyllabusUnit }) {
  const expandedUnitId = useStudio((state) => state.expandedUnitId);
  const setExpandedUnit = useStudio((state) => state.setExpandedUnit);
  const setModel = useStudio((state) => state.setModel);
  const expanded = expandedUnitId === unit.id;
  const unitModels = models.filter((model) => model.unit === unit.id);
  return (
    <article className={`unit-card ${expanded ? "expanded" : ""}`}>
      <button
        aria-expanded={expanded}
        aria-controls={`unit-${unit.id}`}
        onClick={() => setExpandedUnit(expanded ? null : unit.id)}
      >
        <span className="unit-number">{String(unit.id).padStart(2, "0")}</span>
        <div>
          <small>UNIT {unit.id}</small>
          <h3>{unit.title}</h3>
          <p>{unit.summary}</p>
        </div>
        <ChevronRight size={18} />
      </button>
      {expanded && (
        <div id={`unit-${unit.id}`} className="unit-expanded">
          <p>
            Explore these topics using your school resource book and
            teacher-guided activities.
          </p>
          {unitModels.map((model) => (
            <Link
              key={model.id}
              href={routes.Explore}
              onClick={() => setModel(model.id)}
            >
              Open {model.title} <ArrowRight size={15} />
            </Link>
          ))}
          {unitModels.length === 0 && (
            <span>
              Interactive models for this unit are being developed. Use the
              topic outline to guide your revision.
            </span>
          )}
        </div>
      )}
    </article>
  );
}

export default function SyllabusPage() {
  return (
    <div className="syllabus-grid">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
