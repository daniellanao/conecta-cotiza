import type { Metadata } from "next";
import { CompararClient } from "@/components/comparar/comparar_client";
import { storage } from "@/data/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comparar | Conecta+",
  description:
    "Compara dos creadores de contenido: datos y rangos de cotización por tipo de contenido.",
};

export default function CompararPage() {
  return <CompararClient creators={storage.creators} />;
}
