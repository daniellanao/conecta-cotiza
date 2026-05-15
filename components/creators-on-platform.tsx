"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUsers } from "@fortawesome/free-solid-svg-icons";
import {
  CREATOR_PLATFORM_IDS,
  type Creator,
  type CreatorPlatformId,
} from "@/models/creator";
import { PlatformIcon } from "@/components/creators/platform_icon";
import Link from "next/link";

const PLATFORM_LABELS: Record<CreatorPlatformId, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  linkedin: "LinkedIn",
};

function formatFollowers(count: number): string {
  return new Intl.NumberFormat("es-419", {
    notation: count >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

function platformsWithStats(creator: Creator) {
  return CREATOR_PLATFORM_IDS.filter(
    (id) => creator.platforms[id] != null,
  ).map((id) => ({
    id,
    label: PLATFORM_LABELS[id],
    followers: creator.platforms[id]!.followers,
    engagementRate: creator.platforms[id]!.engagementRate,
  }));
}

interface CreatorsOnPlatformProps {
  creators: Creator[];
}

export function CreatorsOnPlatform({ creators }: CreatorsOnPlatformProps) {
  return (
    <section
      className="mt-8 w-full max-w-2xl sm:mt-12"
      aria-labelledby="creators-on-platform-heading"
    >
      <h2
        id="creators-on-platform-heading"
        className="mb-3 flex items-center justify-center gap-2 text-center text-base font-semibold tracking-tight opacity-90 sm:mb-4 sm:text-lg"
      >
        <FontAwesomeIcon icon={faUsers} className="size-5 shrink-0" aria-hidden />
        Creadores de Conecta+
      </h2>
      <ul className="flex flex-col gap-4">
        {creators.map((creator) => (
          <li key={creator.id}>
            <article className="rounded-2xl border border-[#321326]/15 bg-white/60 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-5">
              <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {creator.name}
                  </h3>
                  <p className="mt-1 text-xs opacity-75 sm:text-sm">
                    {creator.city}, {creator.country} · {creator.age} años
                  </p>
                </div>
                <Link
                  href={`/creadores/${encodeURIComponent(creator.id)}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#321326] px-4 py-2.5 text-sm font-medium text-[#fef6f0] transition-opacity hover:opacity-90"
                >
                  Ver detalle
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="size-3.5"
                    aria-hidden
                  />
                </Link>
              </header>
              <p className="mt-1 text-sm opacity-85">{creator.niche}</p>
              <p className="mt-0.5 text-xs opacity-70">
                {creator.yearsExperience}{" "}
                {creator.yearsExperience === 1 ? "año" : "años"} de experiencia
              </p>
              <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {platformsWithStats(creator).map((p) => (
                  <li
                    key={`${creator.id}-${p.id}`}
                    className="flex min-w-0 items-start gap-2 rounded-xl bg-[#321326]/08 px-3 py-2 text-xs leading-relaxed break-words sm:items-center sm:text-sm"
                  >
                    <PlatformIcon
                      id={p.id}
                      className="mt-0.5 size-4 shrink-0 sm:mt-0"
                    />
                    <span>
                      <span className="font-medium">{p.label}</span>
                      <span className="mx-1.5 opacity-50">·</span>
                      <span>{formatFollowers(p.followers)} seguidores</span>
                      <span className="mx-1.5 opacity-50">·</span>
                      <span>{p.engagementRate}% engagement</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
