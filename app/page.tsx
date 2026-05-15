import { CreatorsOnPlatform } from "@/components/creators-on-platform";
import { HomeHeading } from "@/components/home-heading";
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
      <HomeHeading />

      <CreatorsOnPlatform creators={storage.creators} />
    </div>
  );
}
