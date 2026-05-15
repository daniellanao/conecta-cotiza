import type { ContentType } from "@/models/content-type";

/** Tipos de pieza / formato para cotización. */
export const contentsSeed: ContentType[] = [
  { id: "feed_post", name: "Post en Feed", base: 30 },
  { id: "reel", name: "Reel", base: 45 },
  { id: "story_pack", name: "Story (pack)", base: 30 },
  { id: "ugc_brand", name: "UGC para marca", base: 60 },
  { id: "long_video", name: "Video largo +60s", base: 80 },
];
