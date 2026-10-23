import assert from "node:assert/strict";
import { test } from "node:test";
import { resources } from "../features/resources/data";
import { createResourceFile } from "../features/resources/download";
import { filterResources } from "../features/resources/filter";

test("resource search trims whitespace, ignores case, and combines category filters", () => {
  assert.deepEqual(
    filterResources(resources, "  HEART ", "Diagrams").map((r) => r.title),
    [resources[0].title],
  );
  assert.equal(filterResources(resources, "heart", "Practicals").length, 0);
  assert.equal(
    filterResources(resources, "unavailable-topic", "All resources").length,
    0,
  );
  assert.equal(
    filterResources(resources, " ", "All resources").length,
    resources.length,
  );
});

test("downloads use explicit diagram metadata rather than guessing from titles", () => {
  const renamedHeart = { ...resources[0], title: "Circulation overview <A&B>" };
  const file = createResourceFile(renamedHeart);
  assert.equal(file.extension, "svg");
  assert.match(file.content, /Right atrium/);
  assert.match(file.content, /&lt;A&amp;B&gt;/);
  assert.doesNotMatch(file.content, /<A&B>/);
  const notes = createResourceFile(resources[1]);
  assert.equal(notes.extension, "txt");
  assert.equal(notes.content, resources[1].text);
  assert.match(createResourceFile(resources[3]).content, /A = T/);
});
