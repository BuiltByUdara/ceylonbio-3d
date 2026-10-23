export type ModelId = "heart" | "brain" | "dna" | "membrane";
export type Structure = {
  id: string;
  en: string;
  si: string;
  detail: string;
  color: string;
};
export const structures: Record<ModelId, Structure[]> = {
  heart: [
    {
      id: "lv",
      en: "Left ventricle",
      si: "වම් කෝෂිකාව",
      detail:
        "The thick muscular wall generates the pressure needed to pump oxygenated blood through the aorta to the body.",
      color: "#fb7185",
    },
    {
      id: "rv",
      en: "Right ventricle",
      si: "දකුණු කෝෂිකාව",
      detail:
        "Pumps deoxygenated blood to the lungs through the pulmonary artery.",
      color: "#c084fc",
    },
    {
      id: "la",
      en: "Left atrium",
      si: "වම් කර්ණිකාව",
      detail:
        "Receives oxygenated blood from the lungs through the pulmonary veins.",
      color: "#fda4af",
    },
    {
      id: "ra",
      en: "Right atrium",
      si: "දකුණු කර්ණිකාව",
      detail:
        "Receives deoxygenated blood from the body through the venae cavae.",
      color: "#818cf8",
    },
  ],
  brain: [
    {
      id: "frontal",
      en: "Frontal lobe",
      si: "ලලාට ඛණ්ඩිකාව",
      detail:
        "Involved in voluntary movement, planning, reasoning, and aspects of speech production.",
      color: "#fda4af",
    },
    {
      id: "parietal",
      en: "Parietal lobe",
      si: "පාර්ශ්වික ඛණ්ඩිකාව",
      detail:
        "Processes somatic sensory information, including touch, temperature, and spatial relationships.",
      color: "#a78bfa",
    },
    {
      id: "occipital",
      en: "Occipital lobe",
      si: "අපර කපාල ඛණ්ඩිකාව",
      detail: "Processes visual information received from the eyes.",
      color: "#67e8f9",
    },
    {
      id: "cerebellum",
      en: "Cerebellum",
      si: "අනුමස්තිෂ්කය",
      detail: "Coordinates movement, balance, and posture.",
      color: "#6ee7b7",
    },
  ],
  dna: [
    {
      id: "at",
      en: "Adenine–Thymine",
      si: "ඇඩිනීන්–තයිමීන්",
      detail:
        "Adenine pairs with thymine through two hydrogen bonds. Complementary pairing helps preserve genetic information.",
      color: "#67e8f9",
    },
    {
      id: "gc",
      en: "Guanine–Cytosine",
      si: "ගුවනීන්–සයිටොසීන්",
      detail:
        "Guanine pairs with cytosine through three hydrogen bonds. The two DNA strands run antiparallel.",
      color: "#a78bfa",
    },
  ],
  membrane: [
    {
      id: "head",
      en: "Hydrophilic head",
      si: "ජලකාමී හිස",
      detail:
        "The polar phosphate-containing heads face the aqueous environments inside and outside the cell.",
      color: "#67e8f9",
    },
    {
      id: "tail",
      en: "Hydrophobic tails",
      si: "ජලභීතික වලිග",
      detail:
        "Nonpolar fatty acid tails face inward, forming a barrier to many water-soluble substances.",
      color: "#a78bfa",
    },
    {
      id: "protein",
      en: "Channel protein",
      si: "නාලිකා ප්‍රෝටීනය",
      detail:
        "A transmembrane protein provides a selective route for ions or molecules to cross the membrane.",
      color: "#6ee7b7",
    },
  ],
};
export type BiologyModel = {
  id: ModelId;
  title: string;
  subtitle: string;
  unit: number;
  tag: string;
  category: string;
};
export const models: BiologyModel[] = [
  {
    id: "heart",
    category: "Circulation",
    title: "The human heart",
    subtitle: "Follow the rhythm of life.",
    unit: 5,
    tag: "4 interactive structures",
  },
  {
    id: "brain",
    category: "Coordination",
    title: "The human brain",
    subtitle: "Explore the architecture of thought.",
    unit: 5,
    tag: "4 anatomical regions",
  },
  {
    id: "dna",
    category: "Molecular biology",
    title: "DNA double helix",
    subtitle: "Decode the blueprint of life.",
    unit: 6,
    tag: "Interactive base pairs",
  },
  {
    id: "membrane",
    category: "Cell biology",
    title: "Cell membrane",
    subtitle: "Discover a living boundary.",
    unit: 2,
    tag: "Phospholipid bilayer",
  },
];
