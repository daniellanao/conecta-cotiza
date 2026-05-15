import { addCreator, nextCreatorId, storage } from "@/data/storage";
import { parseCreatorFromBody } from "@/lib/validate-creator-body";

export async function GET() {
  return Response.json({ creators: [...storage.creators] });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = parseCreatorFromBody(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const bodyObj =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  let id: string;
  if (typeof bodyObj.id === "string" && bodyObj.id.trim().length > 0) {
    id = bodyObj.id.trim();
    if (storage.creators.some((c) => c.id === id)) {
      return Response.json(
        { error: "Ya existe una creadora con ese id" },
        { status: 409 },
      );
    }
  } else {
    id = nextCreatorId();
  }

  const creator = { ...parsed.value, id };
  addCreator(creator);
  return Response.json({ creator }, { status: 201 });
}
