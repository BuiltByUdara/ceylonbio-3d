import PromoLink from "@/components/PromoLink";
import Viewer from "@/components/Viewer";
import { models } from "@/lib/models";
import { routes } from "@/lib/navigation";
import { units } from "@/lib/syllabus";
import { ArrowUpRight, BookOpen, Box, Download, Sparkles } from "lucide-react";
import ModelPicker from "./ModelPicker";

export default function ExplorePage() {
  return (
    <>
      <div className="stats-row">
        <div>
          <Box />
          <strong>{String(models.length).padStart(2, "0")}</strong>
          <span>Interactive 3D models</span>
        </div>
        <div>
          <BookOpen />
          <strong>{String(units.length).padStart(2, "0")}</strong>
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
        <ModelPicker />
      </div>
      <div className="bottom-grid">
        <PromoLink
          href={routes.Syllabus}
          className="syllabus-promo"
          icon={BookOpen}
          eyebrow="YOUR SYLLABUS, CONNECTED"
          title="From the first cell to entire ecosystems."
          description="Explore all 10 units of A/L Biology."
        />
        <PromoLink
          href={routes["Resource hub"]}
          className="resource-promo"
          icon={Download}
          eyebrow="A LITTLE HELP ALONG THE WAY"
          title="Good resources. Deeper understanding."
          description="Revision notes, practicals & diagrams."
        />
      </div>
    </>
  );
}
