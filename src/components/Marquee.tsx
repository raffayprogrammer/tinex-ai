const JOBS = [
  "Paver patios",
  "Spring cleanups",
  "Retaining walls",
  "Mulch installs",
  "Irrigation repair",
  "Drainage and grading",
  "Sod and seeding",
  "Snow contracts",
  "Landscape lighting",
  "Weekly maintenance",
];

/**
 * The work the agents are trained on, moving past. Duplicated once and
 * translated -50% so the loop is seamless; pauses on hover so anything that
 * catches the eye can actually be read.
 */
export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
      {JOBS.map((job) => (
        <span key={job} className="flex items-center gap-3 whitespace-nowrap">
          <span className="h-1 w-1 shrink-0 rounded-full bg-brass/60" />
          <span className="text-[0.9375rem] tracking-[-0.01em] text-muted">
            {job}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line-soft py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee-track">
        {row}
        <div aria-hidden="true" className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}
