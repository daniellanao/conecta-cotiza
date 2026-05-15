import type { Creator } from "@/models/creator";
import {
  CREATOR_PLATFORM_IDS,
  type CreatorPlatformId,
} from "@/models/creator";
import { PLATFORMS } from "@/models/platform";

const platformName = (id: CreatorPlatformId): string =>
  PLATFORMS.find((p) => p.id === id)?.name ?? id;

function formatFollowers(count: number): string {
  return new Intl.NumberFormat("es-419", {
    notation: count >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

interface CreatorDetailProps {
  creator: Creator;
}

export function CreatorDetail({ creator }: CreatorDetailProps) {
  const platforms = CREATOR_PLATFORM_IDS.filter(
    (id) => creator.platforms[id] != null,
  ).map((id) => ({
    id,
    label: platformName(id),
    ...creator.platforms[id]!,
  }));

  return (
    <article className="space-y-6">
      <header className="border-b border-[#321326]/12 pb-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {creator.name}
        </h1>
        <p className="mt-1 text-sm opacity-75">
          {creator.city}, {creator.country} · {creator.age} años ·{" "}
          {creator.yearsExperience}{" "}
          {creator.yearsExperience === 1 ? "año" : "años"} de experiencia
        </p>
        <p className="mt-2 text-sm font-medium opacity-90">{creator.niche}</p>
      </header>

      <section aria-labelledby="creator-platforms-heading">
        <h2
          id="creator-platforms-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-80"
        >
          Redes
        </h2>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {platforms.map((p) => (
            <li
              key={p.id}
              className="min-w-0 flex-1 rounded-xl border border-[#321326]/12 bg-white/60 px-4 py-3 sm:min-w-[12rem]"
            >
              <p className="font-semibold">{p.label}</p>
              <p className="mt-1 text-sm opacity-85">
                {formatFollowers(p.followers)} seguidores
              </p>
              <p className="text-sm opacity-75">{p.engagementRate}% engagement</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
