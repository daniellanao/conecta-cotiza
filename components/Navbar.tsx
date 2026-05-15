"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/creadores", label: "Creadores" },
  { href: "/comparar", label: "Comparar" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      viewBox="0 0 24 24"
    >
      {open ? (
        <>
          <path d="M6 18L18 6M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </>
      )}
    </svg>
  );
}

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
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#321326]/10"
              >
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
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <div
        id="navbar-mobile-panel"
        className={`border-t border-[#321326]/12 bg-[#fef6f0] md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-3 py-2 sm:px-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-[#321326]/10 active:bg-[#321326]/15"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
