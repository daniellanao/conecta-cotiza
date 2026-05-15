"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export function CreadoresPageHeading() {
  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
        <FontAwesomeIcon
          icon={faUsers}
          className="size-7 shrink-0 opacity-90 sm:size-8"
          aria-hidden
        />
        Creadores de contenido
      </h1>
      <p className="mt-1 text-sm opacity-80">
        Datos de demostración almacenados en memoria (se reinician al reiniciar
        el servidor).
      </p>
    </div>
  );
}
