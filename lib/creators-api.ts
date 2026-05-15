import type { Creator } from "@/models/creator";

const API = "/api/creators";

export type CreateCreatorPayload = Omit<Creator, "id"> & { id?: string };

export async function fetchCreators(): Promise<Creator[]> {
  const res = await fetch(API, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`No se pudieron obtener los creadores de contenido (${res.status})`);
  }
  const data: unknown = await res.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "creators" in data &&
    Array.isArray((data as { creators: unknown }).creators)
  ) {
    return (data as { creators: Creator[] }).creators;
  }
  throw new Error("Respuesta inválida del servidor");
}

export async function postCreator(payload: CreateCreatorPayload): Promise<Creator> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : `Error al crear (${res.status})`;
    throw new Error(message);
  }
  if (
    typeof data === "object" &&
    data !== null &&
    "creator" in data &&
    typeof (data as { creator: unknown }).creator === "object"
  ) {
    return (data as { creator: Creator }).creator;
  }
  throw new Error("Respuesta inválida del servidor");
}
