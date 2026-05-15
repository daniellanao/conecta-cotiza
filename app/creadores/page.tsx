import { CreadoresPageHeading } from "@/components/creators/creadores_page_heading";
import { CreatorsTable } from "@/components/creators/creators_table";
import { NewCreatorLink } from "@/components/creators/new_creator_link";
import { storage } from "@/data/storage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creadoras | Conecta+",
  description: "Listado de creadoras en la plataforma",
};

export default function CreadoresPage() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CreadoresPageHeading />
        <NewCreatorLink />
      </div>
      <CreatorsTable creators={storage.creators} />
    </>
  );
}
