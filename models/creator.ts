/** Fixed set of social platforms supported in this demo. */
export const CREATOR_PLATFORM_IDS = [
  "instagram",
  "tiktok",
  "youtube",
  "x",
  "linkedin",
] as const;

export type CreatorPlatformId = (typeof CREATOR_PLATFORM_IDS)[number];

export interface CreatorPlatformStats {
  followers: number;
  engagementRate: number;
}

/** Only include keys for platforms the creator uses; omit the rest. */
export type CreatorPlatforms = Partial<
  Record<CreatorPlatformId, CreatorPlatformStats>
>;

export interface Creator {
  id: string;
  name: string;
  age: number;
  country: string;
  city: string;
  niche: string;
  yearsExperience: number;
  platforms: CreatorPlatforms;
}
