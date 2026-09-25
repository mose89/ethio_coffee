import Image from "next/image";
import type { Media } from "@/payload-types";

/**
 * Responsive CMS image. Fills its container (which sets the aspect ratio, so
 * there is no layout shift), respects the focal point chosen in the CMS, and
 * labels stock/illustrative photos so they are never mistaken for our own
 * suppliers, facilities or team.
 */
export function Photo({
  media,
  sizes,
  priority = false,
  className,
  showCredit = true,
}: {
  media: Media;
  sizes: string;
  priority?: boolean;
  className?: string;
  showCredit?: boolean;
}) {
  const src = (media.url ?? "").split("?")[0];
  const position = `${media.focalX ?? 50}% ${media.focalY ?? 50}%`;
  const label = media.illustrative ? ["Illustrative photo", media.credit].filter(Boolean).join(" · ") : media.credit;
  return (
    <div className={`photo ${className ?? ""}`}>
      <Image
        src={src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: position }}
      />
      {showCredit && label && <span className="photo-credit">{label}</span>}
    </div>
  );
}
