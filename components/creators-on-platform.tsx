import {
  CREATOR_PLATFORM_IDS,
  type Creator,
  type CreatorPlatformId,
} from "@/models/creator";

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
        className="mb-3 text-center text-base font-semibold tracking-tight opacity-90 sm:mb-4 sm:text-lg"
      >
        Creadoras en la plataforma
      </h2>
      <ul className="flex flex-col gap-4">
        {creators.map((creator) => (
          <li key={creator.id}>
            <article className="rounded-2xl border border-[#321326]/15 bg-white/60 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-5">
              <header className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
                <h3 className="text-lg font-semibold sm:text-xl">{creator.name}</h3>
                <p className="text-xs opacity-75 sm:text-sm">
                  {creator.city}, {creator.country} · {creator.age} años
                </p>
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
                    className="min-w-0 rounded-xl bg-[#321326]/08 px-3 py-2 text-xs leading-relaxed break-words sm:text-sm"
                  >
                    <span className="font-medium">{p.label}</span>
                    <span className="mx-1.5 opacity-50">·</span>
                    <span>{formatFollowers(p.followers)} seguidores</span>
                    <span className="mx-1.5 opacity-50">·</span>
                    <span>{p.engagementRate}% engagement</span>
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
