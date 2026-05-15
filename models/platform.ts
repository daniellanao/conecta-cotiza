export const CREATOR_PLATFORM_IDS = [
  "instagram",
  "tiktok",
  "youtube",
  "x",
  "linkedin",
] as const;

export type CreatorPlatformId = (typeof CREATOR_PLATFORM_IDS)[number];

export interface Platform {
  id: CreatorPlatformId;
  name: string;
  /** Factor de ajuste (demo), rango 0.0003 – 0.0005. */
  multiplier: number;
}

export const PLATFORMS: Platform[] = [
  { id: "instagram", name: "Instagram", multiplier: 0.00032 },
  { id: "tiktok", name: "TikTok", multiplier: 0.00042 },
  { id: "youtube", name: "YouTube", multiplier: 0.00038 },
  { id: "x", name: "X", multiplier: 0.0003 },
  { id: "linkedin", name: "LinkedIn", multiplier: 0.0005 },
];
