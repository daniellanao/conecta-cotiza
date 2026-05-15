import { CreatePageHeader } from "@/components/creators/create_page_header";
import { CreatorsCreate } from "@/components/creators/creators_create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva creadora | Conecta+",
  description: "Alta de creadora en la plataforma",
};

export default function CreateCreadoraPage() {
  return (
    <>
      <CreatePageHeader />
      <CreatorsCreate />
    </>
  );
}
