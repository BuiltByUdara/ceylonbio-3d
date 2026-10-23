import assert from "node:assert/strict";
import { test } from "node:test";
import { models, structures } from "../lib/models";
import { useStudio } from "../lib/store";
import { units } from "../lib/syllabus";

test("changing models clears structure selection and records unique visits", () => {
  const initial = useStudio.getState();
  try {
    initial.select("lv");
    initial.setModel("brain");
    assert.equal(useStudio.getState().selected, null);
    initial.setModel("brain");
    assert.equal(
      useStudio.getState().visited.filter((id) => id === "brain").length,
      1,
    );
  } finally {
    useStudio.setState(initial, true);
  }
});

test("every model belongs to an existing syllabus unit and has selectable structures", () => {
  assert.equal(new Set(units.map((unit) => unit.id)).size, units.length);
  for (const model of models) {
    assert.ok(units.some((unit) => unit.id === model.unit));
    assert.ok(structures[model.id].length > 0);
    assert.equal(
      new Set(structures[model.id].map((part) => part.id)).size,
      structures[model.id].length,
    );
  }
});
