import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  return (
    <div
      className={`${inter.className} flex min-h-full flex-1 flex-col items-center justify-center px-6`}
      style={{
        backgroundColor: "#fef6f0",
        color: "#321326",
      }}
    >
      <h1 className="text-4xl font-bold">
        Conecta+
      </h1>
      <p className="max-w-3xl text-center text-2xl leading-snug sm:text-3xl">
         ¿Cuánto debería cobrar ?
      </p>
    </div>
  );
}
