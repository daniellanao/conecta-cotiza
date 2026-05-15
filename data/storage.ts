import type { Creator } from "@/models/creator";
import { creatorsSeed } from "./creators.seed";

export const storage = {
  creators: [...creatorsSeed] as Creator[],
};

export function nextCreatorId(): string {
  const max = storage.creators.reduce(
    (m, c) => Math.max(m, Number.parseInt(c.id, 10) || 0),
    0,
  );
  return String(max + 1);
}

export function addCreator(creator: Creator): Creator {
  storage.creators.push(creator);
  return creator;
}
