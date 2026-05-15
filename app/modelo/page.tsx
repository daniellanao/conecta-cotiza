import type { Metadata } from "next";
import { contentsSeed } from "@/data/contents.seed";
import { PLATFORMS } from "@/models/platform";

export const metadata: Metadata = {
  title: "Modelo de cotización | Conecta+",
  description:
    "Cómo estimamos el precio de un contenido según formato, perfil y redes.",
};

function TimesGlyph() {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#321326]/10 text-sm font-bold text-[#321326]"
      aria-hidden
    >
      ×
    </span>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <svg
        className="h-6 w-6 text-[#321326]/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
      {label ? (
        <span className="text-center text-[10px] font-medium uppercase tracking-wide text-[#321326]/55">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default function ModeloPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3 border-b border-[#321326]/12 pb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#321326]/60">
          Guía rápida
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Cómo se calcula la cotización
        </h1>
        <p className="max-w-2xl text-base leading-relaxed opacity-85">
          El precio parte de un valor base según el tipo de pieza y se ajusta con
          tu país, experiencia, nicho y el alcance en redes. Al final se redondea
          hacia arriba a la decena de euros más cercana.
        </p>
      </header>

      <section
        className="rounded-2xl border border-[#321326]/15 bg-white/70 p-5 shadow-sm sm:p-6"
        aria-labelledby="formula-heading"
      >
        <h2
          id="formula-heading"
          className="mb-1 text-center text-lg font-bold tracking-tight"
        >
          La fórmula
        </h2>
        <p className="mb-4 text-center text-sm opacity-80">
          Todo en una sola multiplicación
        </p>
        <div className="flex flex-col items-stretch gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="rounded-xl border-2 border-[#321326]/20 bg-[#fef6f0] px-3 py-2.5 text-center text-xs font-semibold sm:min-w-[5.5rem] sm:px-4 sm:text-sm">
              Base del
              <br />
              contenido
            </span>
            <TimesGlyph />
            <span className="rounded-xl border-2 border-[#321326]/20 bg-[#fef6f0] px-3 py-2.5 text-center text-xs font-semibold sm:min-w-[5.5rem] sm:px-4 sm:text-sm">
              País
            </span>
            <TimesGlyph />
            <span className="rounded-xl border-2 border-[#321326]/20 bg-[#fef6f0] px-3 py-2.5 text-center text-xs font-semibold sm:min-w-[5.5rem] sm:px-4 sm:text-sm">
              Años de
              <br />
              experiencia
            </span>
            <TimesGlyph />
            <span className="rounded-xl border-2 border-[#321326]/20 bg-[#fef6f0] px-3 py-2.5 text-center text-xs font-semibold sm:min-w-[5.5rem] sm:px-4 sm:text-sm">
              Nicho
            </span>
            <TimesGlyph />
            <span className="rounded-xl border-2 border-dashed border-[#321326]/35 bg-[#321326]/05 px-3 py-2.5 text-center text-xs font-semibold sm:min-w-[6rem] sm:px-4 sm:text-sm">
              Producto
              <br />
              de redes
            </span>
          </div>
          <FlowArrow label="resultado bruto" />
          <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-2xl border-2 border-[#321326] bg-[#321326] px-5 py-4 text-center text-[#fef6f0]">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
              Precio mostrado (EUR)
            </span>
            <span className="text-lg font-bold">
              techo al siguiente múltiplo de 10
            </span>
            <span className="text-xs opacity-85">
              Ej.: 187 → 190
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="factores-heading">
        <h2
          id="factores-heading"
          className="mb-4 text-xl font-bold tracking-tight"
        >
          Qué entra en cada parte
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#321326]/12 bg-white/60 p-4 sm:p-5">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-lg font-bold text-emerald-800">
            1
          </div>
          <h3 className="text-base font-bold">Base del contenido</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-85">
            Cada formato (post, reel, UGC, etc.) tiene un punto de partida en la
            tabla interna. Un reel no parte del mismo número que un story.
          </p>
          <ul className="mt-3 space-y-1.5 border-t border-[#321326]/10 pt-3 text-xs opacity-80">
            {contentsSeed.map((c) => (
              <li key={c.id} className="flex justify-between gap-2">
                <span>{c.name}</span>
                <span className="tabular-nums font-medium opacity-90">
                  base {c.base}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#321326]/12 bg-white/60 p-4 sm:p-5">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-lg font-bold text-sky-900">
            2
          </div>
          <h3 className="text-base font-bold">Perfil</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-85">
            País, años de experiencia (hasta 10 considerados en la tabla) y
            nicho aplican cada uno un multiplicador tomado del catálogo de
            datos. Si no hay coincidencia exacta, se usa 1 como valor neutro.
          </p>
        </div>
        <div className="rounded-2xl border border-[#321326]/12 bg-white/60 p-4 sm:col-span-2 sm:p-5">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-lg font-bold text-amber-900">
            3
          </div>
          <h3 className="text-base font-bold">Redes sociales</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-85">
            Por cada red que tengas cargada se calcula un factor y luego se
            multiplican todos entre sí:
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#321326]/06 px-3 py-4 text-center font-mono text-xs sm:text-sm">
            <span className="rounded-lg bg-white/80 px-2 py-1 shadow-sm">
              seguidores
            </span>
            <span className="font-bold text-[#321326]/50">×</span>
            <span className="rounded-lg bg-white/80 px-2 py-1 shadow-sm">
              engagement ÷ 100
            </span>
            <span className="font-bold text-[#321326]/50">×</span>
            <span className="rounded-lg bg-white/80 px-2 py-1 shadow-sm">
              peso de la red
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed opacity-75">
            El “peso de la red” es un coeficiente distinto por plataforma
            (Instagram, TikTok, YouTube, X, LinkedIn). Si no registraste ninguna
            red, este bloque vale 1 y solo cuentan base + perfil.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium opacity-70">
            {PLATFORMS.map((p) => (
              <li
                key={p.id}
                className="rounded-full border border-[#321326]/12 bg-[#fef6f0] px-2.5 py-1"
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-[#321326]/15 bg-[#321326]/08 p-5 sm:p-6"
        aria-labelledby="ui-heading"
      >
        <h2 id="ui-heading" className="text-base font-bold">
          Lo que ves en la ficha
        </h2>
        <p className="mt-2 text-sm leading-relaxed opacity-90">
          En pantalla, además del precio base del modelo, mostramos una{" "}
          <strong className="font-semibold">banda de ±10&nbsp;%</strong> alrededor
          de esa cifra (mínimo y máximo), para reflejar que la negociación real
          puede moverse un poco arriba o abajo. El número central sigue siendo el
          del modelo descrito arriba.
        </p>
      </section>
    </article>
  );
}
