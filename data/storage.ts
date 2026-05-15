import type { Creator } from "@/models/creator";
import { creatorsSeed } from "./creators.seed";

/** Same array for RSC + Route Handlers (avoids duplicate module state in dev). */
const GLOBAL_KEY = "__conectaCotizaCreators__";

function creatorsList(): Creator[] {
  const g = globalThis as unknown as Record<string, Creator[] | undefined>;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = [...creatorsSeed];
  }
  return g[GLOBAL_KEY];
}

export const storage = {
  get creators(): Creator[] {
    return creatorsList();
  },
};

export function nextCreatorId(): string {
  const list = creatorsList();
  const max = list.reduce(
    (m, c) => Math.max(m, Number.parseInt(c.id, 10) || 0),
    0,
  );
  return String(max + 1);
}

export function addCreator(creator: Creator): Creator {
  creatorsList().push(creator);
  return creator;
}
