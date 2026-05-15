"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import type { Creator } from "@/models/creator";
import { contentsSeed } from "@/data/contents.seed";
import { calculatePriceForCreator } from "@/services/calculate_price.service";
import { price_range_from_center } from "@/lib/creator_price_range";
import { creatorPlatformsSummary } from "@/lib/creator_platform_summary";

function formatAmountEs(amount: number): string {
  return new Intl.NumberFormat("es-419", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function EurCell({ amount }: { amount: number }) {
  return (
    <span className="flex w-full justify-end items-center gap-1.5 tabular-nums font-semibold">
      <FontAwesomeIcon
        icon={faEuroSign}
        className="size-3.5 shrink-0 opacity-80"
        aria-hidden
      />
      {formatAmountEs(amount)}
    </span>
  );
}

const selectClass =
  "mt-2 w-full appearance-none rounded-2xl border-2 border-[#321326]/20 bg-white px-4 py-4 text-base font-medium text-[#321326] shadow-sm outline-none transition focus:border-[#321326]/50 focus:ring-2 focus:ring-[#321326]/15 sm:text-lg";

interface CompararClientProps {
  creators: Creator[];
}

export function CompararClient({ creators }: CompararClientProps) {
  const [idA, setIdA] = useState("");
  const [idB, setIdB] = useState("");

  const creatorA = useMemo(
    () => creators.find((c) => c.id === idA),
    [creators, idA],
  );
  const creatorB = useMemo(
    () => creators.find((c) => c.id === idB),
    [creators, idB],
  );

  const ready =
    Boolean(idA && idB && idA !== idB && creatorA && creatorB);

  const detailRows: { label: string; a: string; b: string }[] =
    creatorA && creatorB
      ? [
          { label: "Nombre", a: creatorA.name, b: creatorB.name },
          { label: "Edad", a: String(creatorA.age), b: String(creatorB.age) },
          { label: "Ciudad", a: creatorA.city, b: creatorB.city },
          { label: "País", a: creatorA.country, b: creatorB.country },
          { label: "Nicho", a: creatorA.niche, b: creatorB.niche },
          {
            label: "Experiencia",
            a: `${creatorA.yearsExperience} ${creatorA.yearsExperience === 1 ? "año" : "años"}`,
            b: `${creatorB.yearsExperience} ${creatorB.yearsExperience === 1 ? "año" : "años"}`,
          },
          {
            label: "Redes",
            a: creatorPlatformsSummary(creatorA),
            b: creatorPlatformsSummary(creatorB),
          },
        ]
      : [];

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <FontAwesomeIcon
            icon={faScaleBalanced}
            className="size-7 shrink-0 opacity-90 sm:size-8"
            aria-hidden
          />
          Comparar creadores
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold uppercase tracking-wide opacity-80">
          Creador 1
          <select
            className={selectClass}
            value={idA}
            onChange={(e) => setIdA(e.target.value)}
            aria-label="Seleccionar primer creador"
          >
            <option value="">Selecciona un creador…</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === idB}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold uppercase tracking-wide opacity-80">
          Creador 2
          <select
            className={selectClass}
            value={idB}
            onChange={(e) => setIdB(e.target.value)}
            aria-label="Seleccionar segundo creador"
          >
            <option value="">Selecciona un creador…</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === idA}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!ready && idA && idB && idA === idB && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Elige dos creadores distintos para ver la comparación.
        </p>
      )}

      {ready && creatorA && creatorB && (
        <div className="space-y-10">
          <section
            className="rounded-2xl border border-[#321326]/15 bg-white/60 p-4 shadow-sm sm:p-5"
            aria-labelledby="compare-details-heading"
          >
            <h2
              id="compare-details-heading"
              className="mb-4 text-sm font-semibold uppercase tracking-wide opacity-80"
            >
              Detalles
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#321326]/15 bg-[#321326]/06">
                    <th
                      scope="col"
                      className="px-2 py-2 font-semibold sm:px-3 sm:py-2.5"
                    >
                      Campo
                    </th>
                    <th
                      scope="col"
                      className="min-w-[8rem] px-2 py-2 font-semibold sm:px-3 sm:py-2.5"
                    >
                      {creatorA.name}
                    </th>
                    <th
                      scope="col"
                      className="min-w-[8rem] px-2 py-2 font-semibold sm:px-3 sm:py-2.5"
                    >
                      {creatorB.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[#321326]/08 last:border-0 hover:bg-[#fef6f0]/80"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-2 py-2 font-medium opacity-80 sm:px-3 sm:py-2.5"
                      >
                        {row.label}
                      </th>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5">{row.a}</td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="rounded-2xl border border-[#321326]/15 bg-white/60 p-4 shadow-sm sm:p-5"
            aria-labelledby="compare-prices-heading"
          >
            <h2
              id="compare-prices-heading"
              className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-80"
            >
              Cotización por tipo de contenido
            </h2>
            <p className="mb-4 text-xs opacity-70">
              Banda de ±10 % sobre la estimación base (misma lógica que en la
              ficha del creador).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#321326]/15 bg-[#321326]/06">
                    <th
                      scope="col"
                      rowSpan={2}
                      className="align-bottom px-2 py-2 font-semibold sm:px-3 sm:py-2.5"
                    >
                      Tipo de contenido
                    </th>
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className="border-l border-[#321326]/10 px-2 py-2 text-center font-semibold sm:px-3 sm:py-2.5"
                    >
                      {creatorA.name}
                    </th>
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className="border-l border-[#321326]/10 px-2 py-2 text-center font-semibold sm:px-3 sm:py-2.5"
                    >
                      {creatorB.name}
                    </th>
                  </tr>
                  <tr className="border-b border-[#321326]/15 bg-[#321326]/04">
                    <th
                      scope="col"
                      className="border-l border-[#321326]/10 px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide opacity-75 sm:px-3 sm:text-xs"
                    >
                      Min EUR
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide opacity-75 sm:px-3 sm:text-xs"
                    >
                      Max EUR
                    </th>
                    <th
                      scope="col"
                      className="border-l border-[#321326]/10 px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide opacity-75 sm:px-3 sm:text-xs"
                    >
                      Min EUR
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide opacity-75 sm:px-3 sm:text-xs"
                    >
                      Max EUR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contentsSeed.map((content) => {
                    const centerA = calculatePriceForCreator(
                      creatorA,
                      content.id,
                    );
                    const centerB = calculatePriceForCreator(
                      creatorB,
                      content.id,
                    );
                    const rangeA = price_range_from_center(centerA);
                    const rangeB = price_range_from_center(centerB);
                    return (
                      <tr
                        key={content.id}
                        className="border-b border-[#321326]/08 last:border-0 hover:bg-[#fef6f0]/80"
                      >
                        <td className="px-2 py-2 font-medium sm:px-3 sm:py-2.5">
                          {content.name}
                        </td>
                        <td className="border-l border-[#321326]/08 px-2 py-2 text-right sm:px-3 sm:py-2.5">
                          <EurCell amount={rangeA.low} />
                        </td>
                        <td className="px-2 py-2 text-right sm:px-3 sm:py-2.5">
                          <EurCell amount={rangeA.high} />
                        </td>
                        <td className="border-l border-[#321326]/08 px-2 py-2 text-right sm:px-3 sm:py-2.5">
                          <EurCell amount={rangeB.low} />
                        </td>
                        <td className="px-2 py-2 text-right sm:px-3 sm:py-2.5">
                          <EurCell amount={rangeB.high} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
