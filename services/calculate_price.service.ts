import { contentsSeed } from "@/data/contents.seed";
import { countriesSeed } from "@/data/countries.seed";
import { experienceYearsSeed } from "@/data/experience-years.seed";
import { nichesSeed } from "@/data/niches.seed";
import type { Creator, CreatorPlatforms } from "@/models/creator";
import {
  CREATOR_PLATFORM_IDS,
  type CreatorPlatformId,
} from "@/models/creator";
import { PLATFORMS } from "@/models/platform";

export type CalculatePriceParams = {
  /** `id` del tipo de contenido en `contentsSeed` (p. ej. `feed_post`). */
  contentTypeId: string;
  countryName: string;
  yearsExperience: number;
  nicheName: string;
  platforms: CreatorPlatforms;
};

function content_type_base(content_type_id: string): number {
  return contentsSeed.find((c) => c.id === content_type_id)?.base ?? 0;
}

function country_multiplier(country_name: string): number {
  return countriesSeed.find((c) => c.name === country_name)?.multiplier ?? 1;
}

function experience_year_multiplier(years: number): number {
  const clamped_years = Math.max(0, Math.min(10, Math.floor(years)));
  return (
    experienceYearsSeed.find((e) => e.years === clamped_years)?.multiplier ??
    1
  );
}

function niche_multiplier(niche_name: string): number {
  return nichesSeed.find((n) => n.name === niche_name)?.multiplier ?? 1;
}

function platform_catalog_multiplier(platform_id: CreatorPlatformId): number {
  return PLATFORMS.find((p) => p.id === platform_id)?.multiplier ?? 0;
}

/**
 * Factor por red: seguidores × (tasa de engagement como fracción 0–1) × multiplier de plataforma.
 * `engagement_rate_percent` en datos es porcentaje (p. ej. 4.8 → 0.048).
 */
function platform_factor(
  followers: number,
  engagement_rate_percent: number,
  platform_id: CreatorPlatformId,
): number {
  const engagement_rate_fraction = engagement_rate_percent / 100;
  const platform_multiplier = platform_catalog_multiplier(platform_id);
  return followers * engagement_rate_fraction * platform_multiplier;
}

/**
 * Precio estimado para un tipo de contenido:
 *
 * `base` × `country` × `experience` × `niche` × ∏\_red (seguidores × (engagement/100) × multiplier\_plataforma)
 *
 * Si no hay redes en `platforms`, el producto de redes vale **1** (solo aplican país, experiencia y nicho).
 *
 * Resultado: **techo al siguiente múltiplo de 10** (`Math.ceil(total / 10) * 10`).
 */
export function calculatePrice(params: CalculatePriceParams): number {
  const content_base = content_type_base(params.contentTypeId);
  const country_mult = country_multiplier(params.countryName);
  const experience_mult = experience_year_multiplier(params.yearsExperience);
  const niche_mult = niche_multiplier(params.nicheName);

  let platform_product = 1;
  for (const platform_id of CREATOR_PLATFORM_IDS) {
    const platform_stats = params.platforms[platform_id];
    if (!platform_stats) continue;
    const platform_factor_value = platform_factor(
      platform_stats.followers,
      platform_stats.engagementRate,
      platform_id,
    );
    platform_product *= platform_factor_value;
  }

  const raw_total =
    content_base * country_mult * experience_mult * niche_mult * platform_product;
  const rounded_up_to_next_ten = Math.ceil(raw_total / 10) * 10;
  return rounded_up_to_next_ten;
}

/** Atajo usando un `Creator` completo. */
export function calculatePriceForCreator(
  creator: Creator,
  contentTypeId: string,
): number {
  return calculatePrice({
    contentTypeId,
    countryName: creator.country,
    yearsExperience: creator.yearsExperience,
    nicheName: creator.niche,
    platforms: creator.platforms,
  });
}
