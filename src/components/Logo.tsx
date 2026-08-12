import Image from "next/image";

/**
 * The brand mark.
 *
 * The artwork lives at `public/tinex-logo.svg` so it can be replaced by
 * dropping the real file over it — no code change, no rebuild of this
 * component. Keep the same filename and a roughly square viewBox.
 */
export function Logo({
  size = 26,
  withWordmark = true,
  className = "",
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/tinex-logo.svg"
        alt=""
        width={size}
        height={size}
        priority
        className="shrink-0"
        style={{ width: size, height: "auto" }}
      />
      {withWordmark && (
        <span className="text-[0.9375rem] font-semibold uppercase leading-none tracking-[0.22em] text-ink">
          Tinex
          <span className="ml-[0.15em] tracking-normal text-brass">.AI</span>
        </span>
      )}
    </span>
  );
}
