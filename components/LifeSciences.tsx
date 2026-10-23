"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { EcgTrace } from "./organui/ecg-trace";
import { heartModel } from "./organui/heart";
const Heart = dynamic(() => import("./organui/heart").then((m) => m.Heart), {
  ssr: false,
  loading: () => <p>Preparing anatomy viewer…</p>,
});
const MoleculeViewer = dynamic(
  () => import("./organui/molecule-viewer").then((m) => m.MoleculeViewer),
  { ssr: false },
);
const ImageViewer = dynamic(
  () => import("./organui/image-viewer").then((m) => m.ImageViewer),
  { ssr: false },
);
const categories = [
  "3D anatomy",
  "Clinical charts",
  "Molecules",
  "Medical images",
] as const;
// Original, idealised water coordinates in PDB format; no external dataset.
const water = [
  "HETATM    1  O   HOH A   1       0.000   0.000   0.000  1.00  0.00           O",
  "HETATM    2  H1  HOH A   1       0.957   0.000   0.000  1.00  0.00           H",
  "HETATM    3  H2  HOH A   1      -0.240   0.927   0.000  1.00  0.00           H",
  "CONECT    1    2    3",
  "END",
].join("\n");
export default function LifeSciences() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("3D anatomy");
  const [selected, setSelected] = useState<string | null>(null);
  const [rate, setRate] = useState(72);
  const samples = useMemo(
    () =>
      Array.from({ length: 1500 }, (_, i) => {
        const t = (i / 250) % (60 / rate);
        return [
          [0.15, 0.16, 0.025],
          [-0.12, 0.295, 0.01],
          [1.2, 0.32, 0.012],
          [-0.3, 0.35, 0.012],
          [0.32, 0.56, 0.045],
        ].reduce(
          (sum, [a, c, w]) => sum + a * Math.exp(-((t - c) ** 2) / (2 * w * w)),
          0,
        );
      }),
    [rate],
  );
  const slices = useMemo(
    () =>
      Array.from({ length: 12 }, (_, z) => ({
        width: 128,
        height: 128,
        label: `Synthetic phantom ${z + 1}`,
        data: Float32Array.from({ length: 128 * 128 }, (_, i) => {
          const x = ((i % 128) - 64) / 48,
            y = (Math.floor(i / 128) - 64) / 54;
          const r = x * x + y * y;
          if (r > 1) return -1000;
          if (r > 0.85) return 900;
          return (
            35 +
            15 * Math.cos(x * 12 + z / 3) * Math.sin(y * 9) +
            (Math.abs(x) < 0.08 ? 20 : 0)
          );
        }),
      })),
    [],
  );
  return (
    <section className="science-lab">
      <div className="section-heading">
        <div>
          <h2>Life sciences lab</h2>
          <p>Explore structure, signals and images with OrganUI.</p>
        </div>
        <a href="https://organui.com/" target="_blank" rel="noreferrer">
          About OrganUI ↗
        </a>
      </div>
      <div
        className="science-tabs"
        role="tablist"
        aria-label="Life sciences tools"
      >
        {categories.map((c) => (
          <button
            key={c}
            id={`science-tab-${categories.indexOf(c)}`}
            role="tab"
            aria-selected={c === category}
            aria-controls="science-panel"
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div
        id="science-panel"
        role="tabpanel"
        aria-labelledby={`science-tab-${categories.indexOf(category)}`}
        className="science-panel"
      >
        {category === "3D anatomy" && (
          <>
            <h3>Human heart</h3>
            <p>Select a structure or rotate the anatomical model.</p>
            <Heart selectedId={selected} onSelectionChange={setSelected} />
            <div className="science-structures">
              {heartModel.structures.map((s) => (
                <button
                  key={s.id}
                  aria-pressed={s.id === selected}
                  onClick={() => setSelected(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {selected && (
              <p>
                {
                  heartModel.structures.find((s) => s.id === selected)
                    ?.description
                }
              </p>
            )}
            <small>
              <a href={heartModel.attribution.source}>
                {heartModel.attribution.credit}
              </a>{" "}
              · <a href={heartModel.attribution.licenseUrl}>CC BY 4.0</a>
            </small>
          </>
        )}
        {category === "Clinical charts" && (
          <>
            <h3>Electrical activity of the heart</h3>
            <p>Original synthetic signal for exploring P, QRS and T waves.</p>
            <label>
              Example rate: {rate} bpm{" "}
              <input
                aria-label="Example heart rate"
                type="range"
                min={50}
                max={100}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </label>
            <EcgTrace
              samples={samples}
              sampleRate={250}
              label="Synthetic ECG teaching example"
            />
          </>
        )}
        {category === "Molecules" && (
          <>
            <h3>Water · H₂O</h3>
            <p>
              Explore an idealised water molecule. Change representation and
              rotate to inspect its bent geometry.
            </p>
            <MoleculeViewer
              data={water}
              format="pdb"
              water
              defaultRepresentation="ball-and-stick"
              defaultColorScheme="element"
              sequence={false}
              attribution={false}
            />
          </>
        )}
        {category === "Medical images" && (
          <>
            <h3>Image windowing lab</h3>
            <p>
              Synthetic phantom, not a patient scan. Move through 12 slices and
              adjust contrast, zoom or pan.
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
        )}
      </div>
      <p className="resource-disclaimer">
        Educational exploration only. Charts and image data are synthetic; these
        tools are not for diagnosis.
      </p>
    </section>
  );
}
