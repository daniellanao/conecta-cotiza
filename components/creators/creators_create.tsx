"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faBriefcase,
  faCakeCandles,
  faChartLine,
  faCircleExclamation,
  faFloppyDisk,
  faGlobe,
  faLocationDot,
  faPercent,
  faShareNodes,
  faSpinner,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { CreatorPlatformId } from "@/models/creator";
import { CREATOR_PLATFORM_IDS } from "@/models/creator";
import { postCreator, type CreateCreatorPayload } from "@/lib/creators-api";
import { PlatformIcon } from "@/components/creators/platform_icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

const LABELS: Record<CreatorPlatformId, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  linkedin: "LinkedIn",
};

type PlatformForm = {
  enabled: boolean;
  followers: string;
  engagementRate: string;
};

const emptyPlatforms = (): Record<CreatorPlatformId, PlatformForm> => ({
  instagram: { enabled: false, followers: "", engagementRate: "" },
  tiktok: { enabled: false, followers: "", engagementRate: "" },
  youtube: { enabled: false, followers: "", engagementRate: "" },
  x: { enabled: false, followers: "", engagementRate: "" },
  linkedin: { enabled: false, followers: "", engagementRate: "" },
});

export function CreatorsCreate() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [platforms, setPlatforms] = useState(emptyPlatforms);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setPlatform(
    id: CreatorPlatformId,
    patch: Partial<PlatformForm>,
  ) {
    setPlatforms((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!CREATOR_PLATFORM_IDS.some((id) => platforms[id].enabled)) {
      setError("Activa al menos una red social.");
      return;
    }

    setSubmitting(true);
    try {
      const platformsPayload: CreateCreatorPayload["platforms"] = {};
      for (const id of CREATOR_PLATFORM_IDS) {
        const p = platforms[id];
        if (!p.enabled) continue;
        const followers = Number.parseInt(p.followers, 10);
        const engagementRate = Number.parseFloat(p.engagementRate);
        platformsPayload[id] = {
          followers: Number.isFinite(followers) ? followers : 0,
          engagementRate: Number.isFinite(engagementRate) ? engagementRate : 0,
        };
      }

      const payload: CreateCreatorPayload = {
        name: name.trim(),
        age: Number.parseInt(age, 10),
        country: country.trim(),
        city: city.trim(),
        niche: niche.trim(),
        yearsExperience: Number.parseInt(yearsExperience, 10),
        platforms: platformsPayload,
      };

      await postCreator(payload);
      router.push("/creadores");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-[#321326]/20 bg-white px-3 py-2 text-[#321326] outline-none ring-[#321326]/20 focus:ring-2";

  const labelClass = "block text-sm font-medium opacity-90";

  function FieldLabel({
    htmlFor,
    icon,
    children,
  }: {
    htmlFor: string;
    icon: IconDefinition;
    children: ReactNode;
  }) {
    return (
      <label htmlFor={htmlFor} className={labelClass}>
        <span className="inline-flex items-center gap-2">
          <FontAwesomeIcon
            icon={icon}
            className="size-3.5 shrink-0 opacity-70"
            aria-hidden
          />
          {children}
        </span>
      </label>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg space-y-6 rounded-2xl border border-[#321326]/15 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6"
    >
      {error ? (
        <p
          className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="mt-0.5 size-4 shrink-0"
            aria-hidden
          />
          <span>{error}</span>
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="cc-name" icon={faUser}>
            Nombre
          </FieldLabel>
          <input
            id="cc-name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <FieldLabel htmlFor="cc-age" icon={faCakeCandles}>
            Edad
          </FieldLabel>
          <input
            id="cc-age"
            type="number"
            min={1}
            max={120}
            className={inputClass}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="cc-years" icon={faBriefcase}>
            Años de experiencia
          </FieldLabel>
          <input
            id="cc-years"
            type="number"
            min={0}
            max={80}
            className={inputClass}
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="cc-country" icon={faGlobe}>
            País
          </FieldLabel>
          <input
            id="cc-country"
            className={inputClass}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="cc-city" icon={faLocationDot}>
            Ciudad
          </FieldLabel>
          <input
            id="cc-city"
            className={inputClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="cc-niche" icon={faTag}>
            Nicho
          </FieldLabel>
          <input
            id="cc-niche"
            className={inputClass}
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            required
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="flex items-center gap-2 text-sm font-semibold opacity-90">
          <FontAwesomeIcon icon={faShareNodes} className="size-4" aria-hidden />
          Redes sociales (activa al menos una)
        </legend>
        <div className="space-y-4">
          {CREATOR_PLATFORM_IDS.map((id) => {
            const p = platforms[id];
            const checkId = `cc-en-${id}`;
            return (
              <div
                key={id}
                className="rounded-xl border border-[#321326]/12 bg-[#fef6f0]/50 p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    id={checkId}
                    type="checkbox"
                    checked={p.enabled}
                    onChange={(e) =>
                      setPlatform(id, { enabled: e.target.checked })
                    }
                    className="size-4 rounded border-[#321326]/30 text-[#321326] focus:ring-[#321326]"
                  />
                  <PlatformIcon id={id} className="size-4 shrink-0" />
                  <label
                    htmlFor={checkId}
                    className="cursor-pointer font-medium"
                  >
                    {LABELS[id]}
                  </label>
                </div>
                {p.enabled ? (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`cc-${id}-f`}
                        className="inline-flex items-center gap-1.5 text-xs opacity-75"
                      >
                        <FontAwesomeIcon
                          icon={faChartLine}
                          className="size-3"
                          aria-hidden
                        />
                        Seguidores
                      </label>
                      <input
                        id={`cc-${id}-f`}
                        type="number"
                        min={1}
                        className={inputClass}
                        value={p.followers}
                        onChange={(e) =>
                          setPlatform(id, { followers: e.target.value })
                        }
                        required={p.enabled}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`cc-${id}-e`}
                        className="inline-flex items-center gap-1.5 text-xs opacity-75"
                      >
                        <FontAwesomeIcon
                          icon={faPercent}
                          className="size-3"
                          aria-hidden
                        />
                        Engagement (%)
                      </label>
                      <input
                        id={`cc-${id}-e`}
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        className={inputClass}
                        value={p.engagementRate}
                        onChange={(e) =>
                          setPlatform(id, { engagementRate: e.target.value })
                        }
                        required={p.enabled}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/creadores"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#321326]/25 px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-[#321326]/5"
        >
          <FontAwesomeIcon icon={faBan} className="size-3.5" aria-hidden />
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#321326] px-4 py-2.5 text-sm font-medium text-[#fef6f0] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="size-4"
                aria-hidden
              />
              Guardando…
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="size-4" aria-hidden />
              Crear
            </>
          )}
        </button>
      </div>
    </form>
  );
}
