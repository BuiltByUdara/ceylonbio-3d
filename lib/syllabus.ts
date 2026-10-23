export type SyllabusUnit = {
  id: number;
  title: string;
  summary: string;
  shortTitle: string;
};

export const units: SyllabusUnit[] = [
  {
    id: 1,
    title: "Introduction to Biology & Chemicals of Life",
    summary: "Biomolecules, water & the scientific method",
    shortTitle: "Introduction to biology",
  },
  {
    id: 2,
    title: "Structure and Function of Cell",
    summary: "Organelles, membranes & cell division",
    shortTitle: "Cell biology",
  },
  {
    id: 3,
    title: "Diversity of Organisms",
    summary: "Kingdoms, viruses, bacteria, plants & animals",
    shortTitle: "Diversity of organisms",
  },
  {
    id: 4,
    title: "Plant Form and Function",
    summary: "Photosynthesis, transpiration & hormones",
    shortTitle: "Plant form & function",
  },
  {
    id: 5,
    title: "Animal Form and Function",
    summary:
      "Digestive, circulatory, nervous, endocrine, excretory & reproductive systems",
    shortTitle: "Animal form & function",
  },
  {
    id: 6,
    title: "Genetics & Molecular Biology",
    summary: "DNA, inheritance, transcription & translation",
    shortTitle: "Genetics & molecular biology",
  },
  {
    id: 7,
    title: "Recombinant DNA Technology",
    summary: "Gene cloning, vectors & genetic engineering",
    shortTitle: "Recombinant DNA",
  },
  {
    id: 8,
    title: "Environmental Biology & Ecology",
    summary: "Sri Lankan biomes, ecosystems & endemic species",
    shortTitle: "Environmental biology",
  },
  {
    id: 9,
    title: "Applied Biology",
    summary: "Agriculture, tissue culture & aquaculture",
    shortTitle: "Applied biology",
  },
  {
    id: 10,
    title: "Microbiology",
    summary: "Microbial growth, metabolism & applications",
    shortTitle: "Microbiology",
  },
];
