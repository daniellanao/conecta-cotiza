import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { contentsSeed } from "@/data/contents.seed";
import type { Creator } from "@/models/creator";
import { calculatePriceForCreator } from "@/services/calculate_price.service";

function format_amount_es(amount: number): string {
  return new Intl.NumberFormat("es-419", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Techo al siguiente múltiplo de 10 (alineado con `calculate_price.service`). */
function round_up_to_ten(value: number): number {
  return Math.ceil(value / 10) * 10;
}

/** Rango ±10 % sobre el precio base, cada extremo con techo a múltiplo de 10. */
function price_range(center: number): { low: number; high: number } {
  const low = round_up_to_ten(center * 0.9);
  const high = round_up_to_ten(center * 1.1);
  return low <= high ? { low, high } : { low: high, high: low };
}

function EurCell({ amount }: { amount: number }) {
  return (
    <span className="flex w-full justify-end items-center gap-1.5 tabular-nums font-semibold">
      <FontAwesomeIcon
        icon={faEuroSign}
        className="size-3.5 shrink-0 opacity-80"
        aria-hidden
      />
      {format_amount_es(amount)}
    </span>
  );
}

interface CreatorContentPricesProps {
  creator: Creator;
}

export function CreatorContentPrices({ creator }: CreatorContentPricesProps) {
  return (
    <section
      className="mt-8 rounded-2xl border border-[#321326]/15 bg-white/60 p-4 shadow-sm sm:p-5"
      aria-labelledby="creator-prices-heading"
    >
      <h2
        id="creator-prices-heading"
        className="mb-1 text-sm font-semibold uppercase tracking-wide opacity-80"
      >
        Cotización
      </h2>
      <p className="mb-4 text-xs opacity-70">
        Banda de ±10 % sobre la estimación base
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#321326]/15 bg-[#321326]/06">
              <th
                scope="col"
                className="px-2 py-2 font-semibold sm:px-3 sm:py-2.5"
              >
                Tipo de contenido
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-2 text-right font-semibold sm:px-3 sm:py-2.5"
              >
                Rango min EUR
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-2 text-right font-semibold sm:px-3 sm:py-2.5"
              >
                Rango max EUR
              </th>
            </tr>
          </thead>
          <tbody>
            {contentsSeed.map((content) => {
              const center = calculatePriceForCreator(creator, content.id);
              const { low, high } = price_range(center);
              return (
                <tr
                  key={content.id}
                  className="border-b border-[#321326]/08 last:border-0 hover:bg-[#fef6f0]/80"
                >
                  <td className="px-2 py-2 font-medium sm:px-3 sm:py-2.5">
                    {content.name}
                  </td>
                  <td className="px-2 py-2 text-right sm:px-3 sm:py-2.5">
                    <EurCell amount={low} />
                  </td>
                  <td className="px-2 py-2 text-right sm:px-3 sm:py-2.5">
                    <EurCell amount={high} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
