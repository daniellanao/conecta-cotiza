import type { CreatorPlatformId } from "./platform";

export type { CreatorPlatformId, Platform } from "./platform";
export { CREATOR_PLATFORM_IDS, PLATFORMS } from "./platform";

export interface CreatorPlatformStats {
  followers: number;
  engagementRate: number;
}

/** Solo incluye claves de redes que usa la creadora; omite el resto. */
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
