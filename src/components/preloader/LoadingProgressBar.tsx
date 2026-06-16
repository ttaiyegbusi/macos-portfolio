interface LoadingProgressBarProps {
  progress: number; // 0..100
}

/**
 * Thin macOS-style progress bar. Soft gray track, refined gradient fill with
 * a gentle drifting sheen so it feels alive rather than static. Width eases
 * via CSS transition so it never jumps. Full progressbar a11y semantics.
 */
export default function LoadingProgressBar({ progress }: LoadingProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label="Loading portfolio"
      className="h-[9px] w-full overflow-hidden rounded-full bg-[#E3E3E5] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.06)]"
    >
      <div
        className="relative h-full overflow-hidden rounded-full bg-gradient-to-b from-[#9A9CA1] to-[#76787D] transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      >
        {/* Drifting highlight */}
        <div
          className="loader-sheen absolute inset-y-0 left-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
        />
      </div>
    </div>
  );
}
