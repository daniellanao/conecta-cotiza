"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faRightLeft,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks: readonly {
  href: string;
  label: string;
  icon: IconDefinition;
}[] = [
  { href: "/", label: "Inicio", icon: faHouse },
  { href: "/creadores", label: "Creadores", icon: faUsers },
  { href: "/comparar", label: "Comparar", icon: faRightLeft },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const closeIfDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#321326]/12 bg-[#fef6f0]/95 backdrop-blur-sm"
      style={{ color: "#321326" }}
    >
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6"
        aria-label="Principal"
      >
        <Link
          href="/"
          className="min-w-0 shrink truncate py-2 text-base font-semibold tracking-tight transition-opacity hover:opacity-80 sm:text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Conecta+
        </Link>

        <ul className="hidden items-center gap-1 md:flex md:gap-2">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#321326]/10"
              >
                <FontAwesomeIcon icon={icon} className="size-3.5 opacity-80" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex shrink-0 rounded-lg p-2.5 transition-colors hover:bg-[#321326]/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-panel"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <FontAwesomeIcon
            icon={menuOpen ? faXmark : faBars}
            className="size-6"
            aria-hidden
          />
        </button>
      </nav>

      <div
        id="navbar-mobile-panel"
        className={`border-t border-[#321326]/12 bg-[#fef6f0] md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-3 py-2 sm:px-6">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-[#321326]/10 active:bg-[#321326]/15"
                onClick={() => setMenuOpen(false)}
              >
                <FontAwesomeIcon icon={icon} className="size-4 w-5 opacity-80" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
