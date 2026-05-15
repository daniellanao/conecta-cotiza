import { contentsSeed } from "@/data/contents.seed";
import { storage } from "@/data/storage";
import { calculatePriceForCreator } from "@/services/calculate_price.service";

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

  const contents = contentsSeed.map((content) => ({
    id: content.id,
    name: content.name,
    price: calculatePriceForCreator(creator, content.id),
  }));

  return Response.json({ creatorId: creator.id, contents });
}
