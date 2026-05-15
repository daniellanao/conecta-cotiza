"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

export function HomeHeading() {
  return (
    <header className="flex w-full max-w-3xl flex-col items-center px-1 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Conecta+
      </h1>
      <p className="mt-2 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xl leading-snug sm:text-2xl md:text-3xl">
        <FontAwesomeIcon
          icon={faSackDollar}
          className="size-6 shrink-0 opacity-85 sm:size-7 md:size-8"
          aria-hidden
        />
        <span>¿Cuánto debería cobrar ?</span>
      </p>
    </header>
  );
}
