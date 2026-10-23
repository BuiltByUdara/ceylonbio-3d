"use client";
import dynamic from "next/dynamic";
import { waterMolecule } from "./demo-data";
const MoleculeViewer = dynamic(
  () =>
    import("@/components/organui/molecule-viewer").then(
      (m) => m.MoleculeViewer,
    ),
  { ssr: false, loading: () => <p role="status">Preparing viewer…</p> },
);
export default function MoleculePanel() {
  return (
    <>
      <h3>Water · H₂O</h3>
      <p>
        Explore an idealised water molecule. Change representation and rotate to
        inspect its bent geometry.
      </p>
      <MoleculeViewer
        data={waterMolecule}
        format="pdb"
        water
        defaultRepresentation="ball-and-stick"
        defaultColorScheme="element"
        sequence={false}
        attribution={false}
      />
    </>
  );
}
