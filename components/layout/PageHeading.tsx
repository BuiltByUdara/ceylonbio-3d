import type { PageName } from "@/lib/navigation";
import type { ReactNode } from "react";

const headings: Record<PageName, { title: ReactNode; description: string }> = {
  Explore: {
    title: (
      <>
        Small details.
        <br />
        <span>Extraordinary discoveries.</span>
      </>
    ),
    description:
      "Go beyond the textbook. Explore the living world in a whole new dimension.",
  },
  Syllabus: {
    title: (
      <>
        Your path to <span>understanding.</span>
      </>
    ),
    description:
      "Ten units. One connected living world. Start wherever curiosity takes you.",
  },
  "Resource hub": {
    title: (
      <>
        A little resource.
        <br />
        <span>A bigger understanding.</span>
      </>
    ),
    description: "Thoughtful study materials to support your next discovery.",
  },
  "Life sciences": {
    title: (
      <>
        Life, at <span>every scale.</span>
      </>
    ),
    description: "Anatomy, clinical signals, molecules and image exploration.",
  },
};

export default function PageHeading({ tab }: { tab: PageName }) {
  const heading = headings[tab];
  return (
    <>
      <div className="eyebrow">
        <span /> MADE FOR THE CURIOUS MIND
      </div>
      <div className="page-heading">
        <div>
          <h1>{heading.title}</h1>
          <p>{heading.description}</p>
        </div>
        <div className="edition">
          <span>DESIGNED FOR</span>
          <strong>G.C.E. A/L</strong>
          <span>BIOLOGY · SRI LANKA</span>
        </div>
      </div>
    </>
  );
}
