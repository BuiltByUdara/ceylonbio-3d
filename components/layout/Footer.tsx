"use client";
import { models } from "@/lib/models";
import { useStudio } from "@/lib/store";
import { Atom, Check } from "lucide-react";
export default function Footer() {
  const visited = useStudio((s) => s.visited);
  return (
    <footer>
      <span>
        <Atom size={15} /> CeylonBio 3D <span>·</span> Made for a deeper
        understanding.
      </span>
      <span>
        {visited.length} / {models.length} models explored <Check size={13} />
        <i /> Learn with curiosity.
      </span>
    </footer>
  );
}
