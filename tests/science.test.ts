import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createEcgSamples,
  createPhantomSlices,
  ECG_SAMPLE_RATE,
} from "../features/life-sciences/demo-data";
import { getPageName } from "../lib/navigation";

test("ECG samples retain duration and change their period with the example rate", () => {
  const samples = createEcgSamples(60);
  assert.equal(samples.length, 6 * ECG_SAMPLE_RATE);
  assert.ok(samples.every(Number.isFinite));
  assert.ok(Math.abs(samples[80] - samples[330]) < 1e-10);
  assert.notDeepEqual(samples, createEcgSamples(100));
  assert.throws(() => createEcgSamples(0), RangeError);
  assert.throws(() => createEcgSamples(NaN), RangeError);
});

test("phantom slices contain complete independent pixel buffers", () => {
  const slices = createPhantomSlices();
  assert.equal(slices.length, 12);
  for (const slice of slices) {
    assert.equal(slice.data.length, slice.width * slice.height);
    assert.ok(slice.data.every(Number.isFinite));
    assert.equal(slice.data[0], -1000);
  }
  assert.notDeepEqual(slices[0].data, slices[1].data);
  assert.notEqual(slices[0].data.buffer, slices[1].data.buffer);
});

test("page lookup supports the home alias and trailing slashes", () => {
  assert.equal(getPageName("/"), "Explore");
  assert.equal(getPageName("/syllabus/"), "Syllabus");
  assert.equal(getPageName("/resource-hub"), "Resource hub");
  assert.equal(getPageName("/life-sciences"), "Life sciences");
});
