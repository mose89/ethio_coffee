import Image from "next/image";
import type { Media } from "@/payload-types";

/**
 * Responsive CMS image. Fills its container (which sets the aspect ratio, so
 * there is no layout shift) and respects the focal point chosen in the CMS.
 * A small photographer credit is shown when one is recorded.
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
  const label = media.credit;
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
