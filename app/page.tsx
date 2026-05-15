import { CreatorsOnPlatform } from "@/components/creators-on-platform";
import { storage } from "@/data/storage";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  return (
    <div
      className={`${inter.className} flex min-h-full flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12`}
      style={{
        backgroundColor: "#fef6f0",
        color: "#321326",
      }}
    >
      <header className="flex w-full max-w-3xl flex-col items-center px-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Conecta+
        </h1>
        <p className="mt-2 max-w-3xl text-xl leading-snug sm:text-2xl md:text-3xl">
          ¿Cuánto debería cobrar ?
        </p>
      </header>

      <CreatorsOnPlatform creators={storage.creators} />
    </div>
  );
}
