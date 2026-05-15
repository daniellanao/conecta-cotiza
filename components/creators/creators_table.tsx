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

function platformsSummary(creator: Creator): string {
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

interface CreatorsTableProps {
  creators: Creator[];
}

export function CreatorsTable({ creators }: CreatorsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#321326]/15 bg-white/70 shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-[#321326]/15 bg-[#321326]/06">
            <th scope="col" className="whitespace-nowrap px-2 py-1.5 font-semibold">
              Id
            </th>
            <th scope="col" className="whitespace-nowrap px-2 py-1.5 font-semibold">
              Nombre
            </th>
            <th scope="col" className="whitespace-nowrap px-2 py-1.5 font-semibold">
              Edad
            </th>
            <th scope="col" className="whitespace-nowrap px-2 py-1.5 font-semibold">
              Ubicación
            </th>
            <th scope="col" className="min-w-[8rem] px-2 py-1.5 font-semibold">
              Nicho
            </th>
            <th scope="col" className="whitespace-nowrap px-2 py-1.5 font-semibold">
              Años
            </th>
            <th scope="col" className="min-w-[12rem] px-2 py-1.5 font-semibold">
              Redes
            </th>
          </tr>
        </thead>
        <tbody>
          {creators.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-2 py-4 text-center text-sm opacity-70"
              >
                No hay creadoras registradas.
              </td>
            </tr>
          ) : (
            creators.map((c) => (
              <tr
                key={c.id}
                className="border-b border-[#321326]/08 last:border-0 hover:bg-[#fef6f0]/80"
              >
                <td className="whitespace-nowrap px-2 py-1.5 font-mono tabular-nums opacity-80">
                  {c.id}
                </td>
                <td className="whitespace-nowrap px-2 py-1.5 font-medium">
                  {c.name}
                </td>
                <td className="whitespace-nowrap px-2 py-1.5 tabular-nums">
                  {c.age}
                </td>
                <td className="max-w-[10rem] truncate px-2 py-1.5" title={`${c.city}, ${c.country}`}>
                  {c.city}, {c.country}
                </td>
                <td
                  className="max-w-[12rem] truncate px-2 py-1.5"
                  title={c.niche}
                >
                  {c.niche}
                </td>
                <td className="whitespace-nowrap px-2 py-1.5 tabular-nums">
                  {c.yearsExperience}
                </td>
                <td
                  className="max-w-[18rem] truncate px-2 py-1.5 font-mono text-[0.7rem] leading-tight opacity-90"
                  title={platformsSummary(c)}
                >
                  {platformsSummary(c)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
