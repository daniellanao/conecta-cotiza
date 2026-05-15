"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function NewCreatorLink() {
  return (
    <Link
      href="/creadores/create"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#321326] px-4 py-2.5 text-center text-sm font-medium text-[#fef6f0] transition-opacity hover:opacity-90"
    >
      <FontAwesomeIcon icon={faPlus} className="size-4" aria-hidden />
      Nueva creadora
    </Link>
  );
}
