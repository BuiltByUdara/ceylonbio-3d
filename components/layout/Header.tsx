"use client";
import type { PageName } from "@/lib/navigation";
import { useStudio } from "@/lib/store";
import { ChevronRight, Menu } from "lucide-react";
export default function Header({
  tab,
  onOpen,
}: {
  tab: PageName;
  onOpen: () => void;
}) {
  const sinhala = useStudio((s) => s.sinhala);
  const toggleLanguage = useStudio((s) => s.toggleLanguage);
  return (
    <header>
      <div className="breadcrumb">
        <button
          className="mobile-menu"
          aria-label="Open navigation"
          onClick={onOpen}
        >
          <Menu />
        </button>
        <span>Your workspace</span>
        <ChevronRight size={13} />
        <strong>{tab}</strong>
      </div>
      <div className="header-actions">
        <span className="syllabus-badge">
          <i /> Sri Lankan A/L syllabus
        </span>
        <button
          className="language"
          onClick={toggleLanguage}
          aria-label="Toggle Sinhala terminology"
        >
          <span className={!sinhala ? "active" : ""}>EN</span>
          <span className={sinhala ? "active" : ""}>සිං</span>
        </button>
        <span className="avatar">AL</span>
      </div>
    </header>
  );
}
