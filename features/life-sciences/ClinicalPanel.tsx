"use client";
import { EcgTrace } from "@/components/organui/ecg-trace";
import { useMemo, useState } from "react";
import { createEcgSamples, ECG_SAMPLE_RATE } from "./demo-data";
export default function ClinicalPanel() {
  const [rate, setRate] = useState(72);
  const samples = useMemo(() => createEcgSamples(rate), [rate]);
  return (
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
        sampleRate={ECG_SAMPLE_RATE}
        label="Synthetic ECG teaching example"
      />
    </>
  );
}
