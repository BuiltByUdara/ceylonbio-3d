"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { createPhantomSlices } from "./demo-data";
const ImageViewer = dynamic(
  () => import("@/components/organui/image-viewer").then((m) => m.ImageViewer),
  { ssr: false, loading: () => <p role="status">Preparing viewer…</p> },
);
export default function ImagingPanel() {
  const slices = useMemo(createPhantomSlices, []);
  return (
    <>
      <h3>Image windowing lab</h3>
      <p>
        Synthetic phantom, not a patient scan. Move through 12 slices and adjust
        contrast, zoom or pan.
      </p>
      <ImageViewer
        slices={slices}
        defaultWindow={{ center: 40, width: 100 }}
        presets={[
          { name: "Detail", center: 40, width: 100 },
          { name: "Wide", center: 0, width: 2000 },
        ]}
        label="Synthetic image phantom"
      />
    </>
  );
}
