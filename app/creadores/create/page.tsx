import { CreatorsCreate } from "@/components/creators/creators_create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva creadora | Conecta+",
  description: "Alta de creadora en la plataforma",
};

export default function CreateCreadoraPage() {
  return (
    <>
      <div className="mb-6">
      <Link
        href="/creadores"
        className="inline-flex items-center gap-2 text-sm font-medium opacity-80 underline-offset-4 hover:underline"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="size-3.5" aria-hidden />
        Volver a creadores
      </Link>
      <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="size-7 shrink-0 opacity-90 sm:size-8"
          aria-hidden
        />
        Nuevo
      </h1>
      
    </div>
      <CreatorsCreate />
    </>
  );
}
