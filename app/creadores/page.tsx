
import { CreatorsTable } from "@/components/creators/creators_table";
import { storage } from "@/data/storage";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creadoras | Conecta+",
  description: "Listado de creadoras en la plataforma",
};

export default function CreadoresPage() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <FontAwesomeIcon
            icon={faUsers}
            className="size-7 shrink-0 opacity-90 sm:size-8"
            aria-hidden
          />
          Creadores de contenido
        </h1>        
    
        <Link
          href="/creadores/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#321326] px-4 py-2.5 text-center text-sm font-medium text-[#fef6f0] transition-opacity hover:opacity-90"
        >
          <FontAwesomeIcon icon={faPlus} className="size-4" aria-hidden />
          Nuevo Creador
        </Link>
      </div>
      <CreatorsTable creators={storage.creators} />
    </>
  );
}
