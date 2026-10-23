import type { StudyResource } from "./data";

export const resourceFilters = [
  "All resources",
  "Resource books",
  "Practicals",
  "Diagrams",
] as const;
export type ResourceFilter = (typeof resourceFilters)[number];

export function filterResources(
  resources: readonly StudyResource[],
  query: string,
  filter: ResourceFilter,
) {
  const search = query.trim().toLowerCase();
  return resources.filter(
    (resource) =>
      (filter === "All resources" || resource.type === filter) &&
      `${resource.title} ${resource.type} ${resource.unit}`
        .toLowerCase()
        .includes(search),
  );
}
