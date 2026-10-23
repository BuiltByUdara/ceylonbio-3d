export type ResourceType = "Diagrams" | "Resource books" | "Practicals";
export type StudyResource = {
  title: string;
  type: ResourceType;
  unit: number;
  text: string;
  diagram?: "heart" | "dna";
};
export const resources: StudyResource[] = [
  {
    title: "Human heart · annotated diagram",
    diagram: "heart",
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
    diagram: "dna",
    type: "Diagrams",
    unit: 6,
    text: "DNA base pairing\nAdenine pairs with thymine (two hydrogen bonds). Guanine pairs with cytosine (three hydrogen bonds).\nDraw antiparallel sugar-phosphate backbones. Label the 5′ and 3′ ends.",
  },
];
