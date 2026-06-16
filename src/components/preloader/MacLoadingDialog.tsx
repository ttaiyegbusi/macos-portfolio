import FileIcon from "./FileIcon";
import LoadingProgressBar from "./LoadingProgressBar";
import { stageLabel } from "./usePortfolioPreloader";

interface MacLoadingDialogProps {
  progress: number; // 0..100
}

/**
 * The centered macOS copy/open dialog. Title bar with decorative traffic
 * lights + right-side dots, then a content row: document icon, opening
 * line, progress bar, and a percentage / status line.
 *
 * The traffic lights are purely decorative (no close/minimize behavior).
 */
export default function MacLoadingDialog({ progress }: MacLoadingDialogProps) {
  const pct = Math.round(Math.max(0, Math.min(100, progress)));

  return (
    <div
      role="dialog"
      aria-label="Opening Temitope Aiyegbusi portfolio"
      aria-modal="true"
      className="w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-[11px] border border-black/[0.08] bg-[#F6F6F7] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_50px_rgba(0,0,0,0.16)]"
    >
      {/* ---- Title bar ---- */}
      <div className="flex h-[37px] items-stretch border-b border-black/[0.07] bg-[#F0F0F1]">
        {/* Traffic lights */}
        <div className="flex items-center gap-2 border-r border-black/[0.06] px-3.5">
          <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)]" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right-side dots */}
        <div className="flex items-center gap-1.5 border-l border-black/[0.06] px-3.5">
          <span className="h-[5px] w-[5px] rounded-full bg-[#C7C7C9]" />
          <span className="h-[5px] w-[5px] rounded-full bg-[#C7C7C9]" />
          <span className="h-[5px] w-[5px] rounded-full bg-[#C7C7C9]" />
        </div>
      </div>

      {/* ---- Content ---- */}
      <div className="flex items-center gap-5 px-6 py-5">
        <FileIcon size={40} className="shrink-0" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] leading-tight text-[#9A9A9E]">
            Opening <span className="font-medium text-[#3A3A3C]">&ldquo;Temitope Aiyegbusi&rdquo;</span> portfolio
          </p>

          <div className="my-2.5">
            <LoadingProgressBar progress={progress} />
          </div>

          <p
            className="text-[13.5px] leading-tight text-[#86868B]"
            aria-live="polite"
          >
            <span className="text-[#9A9A9E]">{pct}%</span> {stageLabel(progress)}
          </p>
        </div>
      </div>
    </div>
  );
}
