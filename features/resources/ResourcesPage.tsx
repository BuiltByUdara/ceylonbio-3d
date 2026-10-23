"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { resources } from "./data";
import {
  filterResources,
  resourceFilters,
  type ResourceFilter,
} from "./filter";
import ResourceCard from "./ResourceCard";

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ResourceFilter>("All resources");
  const filteredResources = filterResources(resources, query, filter);

  return (
    <>
      <div className="resource-toolbar">
        <label className="search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes, practicals, diagrams…"
            aria-label="Search resources"
          />
        </label>
        <div
          className="filter-tabs"
          role="group"
          aria-label="Resource category"
        >
          {resourceFilters.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={filter === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <p className="resource-disclaimer">
        Original CeylonBio study aids. Resource book entries are concise
        revision notes; consult your official school resource books for the full
        syllabus.
      </p>
      <div className="resource-grid">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
      {filteredResources.length === 0 && (
        <div className="empty-state">
          <Search />
          <h3>No resources found</h3>
          <p>Try a topic such as heart, DNA, or osmosis.</p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("All resources");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
