import { CreatorDetail } from "@/components/creators/creator_detail";
import { storage } from "@/data/storage";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const creator = storage.creators.find((c) => c.id === id);
  if (!creator) {
    return { title: "Creador no encontrado | Conecta+" };
  }
  return {
    title: `${creator.name} | Conecta+`,
    description: `Perfil de ${creator.name} — ${creator.niche}`,
  };
}

export default async function CreadorDetailPage({ params }: Props) {
  const { id } = await params;
  const creator = storage.creators.find((c) => c.id === id);
  if (!creator) {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/creadores"
          className="text-sm font-medium opacity-80 underline-offset-4 hover:underline"
        >
          ← Volver al listado
        </Link>
      </div>
      <CreatorDetail creator={creator} />
    </>
  );
}
