"use client";

import {
  BookOpen,
  Dna,
  Download,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import type { ResourceType, StudyResource } from "./data";
import { downloadResource } from "./download";

const resourceIcons: Record<ResourceType, LucideIcon> = {
  Practicals: FlaskConical,
  Diagrams: Dna,
  "Resource books": BookOpen,
};

export default function ResourceCard({
  resource,
}: {
  resource: StudyResource;
}) {
  const Icon = resourceIcons[resource.type];
  return (
    <article className="resource-card">
      <div className="resource-art">
        <Icon />
        <span>UNIT {resource.unit}</span>
      </div>
      <small>
        {resource.type.toUpperCase()} · {resource.diagram ? "SVG" : "TXT"}
      </small>
      <h3>{resource.title}</h3>
      <p>A focused companion for your A/L Biology revision.</p>
      <button onClick={() => downloadResource(resource)}>
        Download study aid <Download size={16} />
      </button>
    </article>
  );
}
