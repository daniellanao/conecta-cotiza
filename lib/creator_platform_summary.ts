import type { Creator } from "@/models/creator";
import {
  CREATOR_PLATFORM_IDS,
  type CreatorPlatformId,
} from "@/models/creator";

const PLATFORM_SHORT: Record<CreatorPlatformId, string> = {
  instagram: "IG",
  tiktok: "TT",
  youtube: "YT",
  x: "X",
  linkedin: "LI",
};

function compactFollowers(n: number): string {
  return new Intl.NumberFormat("es-419", {
    notation: n >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(n);
}

/** Resumen legible de plataformas y métricas (misma lógica que la tabla de creadores). */
export function creatorPlatformsSummary(creator: Creator): string {
  const parts: string[] = [];
  for (const id of CREATOR_PLATFORM_IDS) {
    const p = creator.platforms[id];
    if (!p) continue;
    parts.push(
      `${PLATFORM_SHORT[id]} ${compactFollowers(p.followers)} ${p.engagementRate}%`,
    );
  }
  return parts.join(" · ") || "—";
}
