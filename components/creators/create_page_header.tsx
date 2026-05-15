"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCloudArrowUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function CreatePageHeader() {
  return (
    <div className="mb-6">
      <Link
        href="/creadores"
        className="inline-flex items-center gap-2 text-sm font-medium opacity-80 underline-offset-4 hover:underline"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="size-3.5" aria-hidden />
        Volver a creadoras
      </Link>
      <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="size-7 shrink-0 opacity-90 sm:size-8"
          aria-hidden
        />
        Nueva creadora
      </h1>
      <p className="mt-2 flex items-start gap-2 text-sm opacity-80 sm:items-center">
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className="mt-0.5 size-4 shrink-0 sm:mt-0"
          aria-hidden
        />
        Los datos se envían a la API y se guardan en el almacén en memoria.
      </p>
    </div>
  );
}
