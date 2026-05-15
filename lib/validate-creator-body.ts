import {
  CREATOR_PLATFORM_IDS,
  type Creator,
  type CreatorPlatformId,
  type CreatorPlatforms,
} from "@/models/creator";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function parseCreatorFromBody(body: unknown):
  | { ok: true; value: Omit<Creator, "id"> }
  | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Cuerpo JSON inválido" };
  }

  const o = body as Record<string, unknown>;

  if (!isNonEmptyString(o.name)) return { ok: false, error: "Nombre requerido" };
  if (!isFiniteNumber(o.age) || o.age < 1 || o.age > 120) {
    return { ok: false, error: "Edad inválida" };
  }
  if (!isNonEmptyString(o.country)) {
    return { ok: false, error: "País requerido" };
  }
  if (!isNonEmptyString(o.city)) return { ok: false, error: "Ciudad requerida" };
  if (!isNonEmptyString(o.niche)) return { ok: false, error: "Nicho requerido" };
  if (
    !isFiniteNumber(o.yearsExperience) ||
    o.yearsExperience < 0 ||
    o.yearsExperience > 10
  ) {
    return { ok: false, error: "Años de experiencia inválidos (0–10)" };
  }

  const platformsInput = o.platforms;
  if (typeof platformsInput !== "object" || platformsInput === null) {
    return { ok: false, error: "Plataformas requeridas (objeto)" };
  }

  const platforms: CreatorPlatforms = {};
  const pi = platformsInput as Record<string, unknown>;

  for (const id of CREATOR_PLATFORM_IDS) {
    const block = pi[id];
    if (block === undefined || block === null) continue;
    if (typeof block !== "object") {
      return { ok: false, error: `Datos inválidos para ${id}` };
    }
    const b = block as Record<string, unknown>;
    const followers = b.followers;
    const engagementRate = b.engagementRate;
    if (!isFiniteNumber(followers) || followers < 0) {
      return { ok: false, error: `Seguidores inválidos en ${id}` };
    }
    if (
      !isFiniteNumber(engagementRate) ||
      engagementRate < 0 ||
      engagementRate > 100
    ) {
      return { ok: false, error: `Engagement inválido en ${id}` };
    }
    if (followers === 0 && engagementRate === 0) continue;
    if (followers < 1) {
      return { ok: false, error: `Si usas ${id}, indica al menos 1 seguidor` };
    }
    platforms[id as CreatorPlatformId] = { followers, engagementRate };
  }

  if (Object.keys(platforms).length === 0) {
    return { ok: false, error: "Indica al menos una red con seguidores" };
  }

  return {
    ok: true,
    value: {
      name: o.name.trim(),
      age: Math.floor(o.age),
      country: o.country.trim(),
      city: o.city.trim(),
      niche: o.niche.trim(),
      yearsExperience: Math.floor(o.yearsExperience),
      platforms,
    },
  };
}
