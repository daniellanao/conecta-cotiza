import { storage } from "@/data/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const creator = storage.creators.find((c) => c.id === id);
  if (!creator) {
    return Response.json(
      { error: "Creadora no encontrada" },
      { status: 404 },
    );
  }
  return Response.json(creator);
}
