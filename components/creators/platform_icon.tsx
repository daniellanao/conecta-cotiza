"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { CreatorPlatformId } from "@/models/creator";

const brandIcons: Record<CreatorPlatformId, IconDefinition> = {
  instagram: faInstagram,
  tiktok: faTiktok,
  youtube: faYoutube,
  x: faXTwitter,
  linkedin: faLinkedin,
};

export function PlatformIcon({
  id,
  className = "size-4 shrink-0",
}: {
  id: CreatorPlatformId;
  className?: string;
}) {
  return <FontAwesomeIcon icon={brandIcons[id]} className={className} aria-hidden />;
}
