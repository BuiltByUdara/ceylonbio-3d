"use client";
import type { PageName } from "@/lib/navigation";
import { routes } from "@/lib/navigation";
import { useStudio } from "@/lib/store";
import { units } from "@/lib/syllabus";
import {
  Atom,
  BookOpen,
  Box,
  FlaskConical,
  GraduationCap,
  Layers3,
  Leaf,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const navigationIcons: Record<PageName, typeof Box> = {
  Explore: Box,
  Syllabus: BookOpen,
  "Resource hub": Layers3,
  "Life sciences": FlaskConical,
};
export default function Sidebar({
  tab,
  mobile,
  onClose,
}: {
  tab: PageName;
  mobile: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const setExpandedUnit = useStudio((s) => s.setExpandedUnit);
  const navigate = (tab: PageName) => {
    onClose();
    router.push(routes[tab]);
  };
  return (
    <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
      <Link href="/explore" className="brand" onClick={() => onClose()}>
        <span className="brand-icon">
          <Atom size={26} />
        </span>
        <span>
          CeylonBio<span className="brand-3d">3D</span>
          <small>A NEW DIMENSION OF LEARNING</small>
        </span>
      </Link>
      <button
        className="mobile-close"
        aria-label="Close navigation"
        onClick={() => onClose()}
      >
        <X />
      </button>
      <div className="workspace-label">YOUR LEARNING SPACE</div>
      <nav>
        {(
          ["Explore", "Syllabus", "Resource hub", "Life sciences"] as PageName[]
        ).map((t) => {
          const Icon = navigationIcons[t];
          return (
            <Link
              key={t}
              href={routes[t]}
              aria-current={tab === t ? "page" : undefined}
              onClick={() => onClose()}
              className={tab === t ? "nav-active" : ""}
            >
              <Icon size={19} />
              {t}
              {t === "Explore" && <span className="new-label">NEW</span>}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-divider" />
      <div className="workspace-label">
        THE BIG PICTURE <span>{units.length} UNITS</span>
      </div>
      <div className="unit-shortcuts">
        {units.map((u) => (
          <button
            key={u.id}
            onClick={() => {
              navigate("Syllabus");
              setExpandedUnit(u.id);
            }}
          >
            <span>{String(u.id).padStart(2, "0")}</span>
            <span>{u.shortTitle}</span>
          </button>
        ))}
      </div>
      <div className="sidebar-bottom">
        <div className="student-note">
          <GraduationCap size={22} />
          <strong>Big dreams. Small steps.</strong>
          <p>Your next discovery starts here.</p>
        </div>
        <div className="profile">
          <span>AL</span>
          <div>
            A/L Biology student<small>Let curiosity lead the way</small>
          </div>
          <Leaf size={16} />
        </div>
      </div>
    </aside>
  );
}
