/** Original idealised coordinates, not a downloaded molecular dataset. */
export const waterMolecule = [
  "HETATM    1  O   HOH A   1       0.000   0.000   0.000  1.00  0.00           O",
  "HETATM    2  H1  HOH A   1       0.957   0.000   0.000  1.00  0.00           H",
  "HETATM    3  H2  HOH A   1      -0.240   0.927   0.000  1.00  0.00           H",
  "CONECT    1    2    3",
  "END",
].join("\n");

export const ECG_SAMPLE_RATE = 250;
const ECG_DURATION_SECONDS = 6;
// Amplitude (mV), centre (seconds), width (seconds) for P, Q, R, S and T.
const ECG_WAVES = [
  [0.15, 0.16, 0.025],
  [-0.12, 0.295, 0.01],
  [1.2, 0.32, 0.012],
  [-0.3, 0.35, 0.012],
  [0.32, 0.56, 0.045],
] as const;

export function createEcgSamples(beatsPerMinute: number) {
  if (!Number.isFinite(beatsPerMinute) || beatsPerMinute <= 0) {
    throw new RangeError(
      "The example heart rate must be a positive finite number.",
    );
  }
  return Array.from(
    { length: ECG_SAMPLE_RATE * ECG_DURATION_SECONDS },
    (_, index) => {
      const time = (index / ECG_SAMPLE_RATE) % (60 / beatsPerMinute);
      return ECG_WAVES.reduce(
        (sum, [amplitude, centre, width]) =>
          sum +
          amplitude * Math.exp(-((time - centre) ** 2) / (2 * width ** 2)),
        0,
      );
    },
  );
}

/** An artificial image phantom for teaching windowing; no patient data. */
export function createPhantomSlices() {
  const imageSize = 128;
  return Array.from({ length: 12 }, (_, sliceIndex) => ({
    width: imageSize,
    height: imageSize,
    label: `Synthetic phantom ${sliceIndex + 1}`,
    data: Float32Array.from(
      { length: imageSize * imageSize },
      (_, pixelIndex) => {
        const x = ((pixelIndex % imageSize) - imageSize / 2) / 48;
        const y = (Math.floor(pixelIndex / imageSize) - imageSize / 2) / 54;
        const radiusSquared = x * x + y * y;
        if (radiusSquared > 1) return -1000;
        if (radiusSquared > 0.85) return 900;
        return (
          35 +
          15 * Math.cos(x * 12 + sliceIndex / 3) * Math.sin(y * 9) +
          (Math.abs(x) < 0.08 ? 20 : 0)
        );
      },
    ),
  }));
}
