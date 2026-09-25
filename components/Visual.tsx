import type { Media } from "@/payload-types";
import { ArtPanel } from "./ArtPanel";
import { Photo } from "./Photo";

/** Shows the CMS photo when one is chosen, otherwise a decorative illustration. */
export function Visual({
  media,
  fallback,
  sizes,
  priority,
  className,
}: {
  media: Media | null;
  fallback: "cherries" | "green" | "roasted" | "highlands";
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return media ? (
    <Photo media={media} sizes={sizes} priority={priority} className={className} />
  ) : (
    <ArtPanel variant={fallback} className={className} />
  );
}
