import LifeSciences from "@/features/life-sciences/LifeSciences";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Life sciences | CeylonBio 3D" };
export default function Page() {
  return <LifeSciences />;
}
