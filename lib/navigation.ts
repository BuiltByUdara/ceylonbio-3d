export const routes = {
  Explore: "/explore",
  Syllabus: "/syllabus",
  "Resource hub": "/resource-hub",
  "Life sciences": "/life-sciences",
} as const;

export type PageName = keyof typeof routes;

export function getPageName(pathname: string): PageName {
  return (
    (Object.keys(routes) as PageName[]).find(
      (name) => routes[name] === pathname.replace(/\/$/, ""),
    ) ?? "Explore"
  );
}
