"use client";

import { getPageName } from "@/lib/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PageHeading from "./PageHeading";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = getPageName(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <div className="app-shell">
      <Sidebar
        tab={page}
        mobile={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <main id="main-content">
        <Header tab={page} onOpen={() => setMobileOpen(true)} />
        <motion.div
          className="content"
          key={pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <PageHeading tab={page} />
          {children}
          <Footer />
        </motion.div>
      </main>
    </div>
  );
}
