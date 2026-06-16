import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PreviewTitleBarProps {
  fileName: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export default function PreviewTitleBar({
  fileName,
  onClose,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: PreviewTitleBarProps) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-borderFaint bg-white/95 px-4">
      {/* Traffic lights on the left */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          aria-label="Close preview"
          className="h-3 w-3 rounded-full bg-[#EA6B65] transition-opacity hover:opacity-75"
        />
        <div className="h-3 w-3 rounded-full bg-[#F3BF52]" />
        <div className="h-3 w-3 rounded-full bg-[#5EC550]" />
      </div>

      {/* File name in the center */}
      <p className="flex-1 text-center text-[13px] font-medium text-inkStrong">{fileName}</p>

      {/* Navigation controls on the right */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={canGoPrevious ? { x: -2 } : {}}
          whileTap={canGoPrevious ? { scale: 0.94 } : {}}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous design"
          className="rounded p-1 text-inkMuted transition-colors disabled:opacity-30 hover:bg-black/[0.04] hover:text-inkSecondary"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </motion.button>

        <motion.button
          whileHover={canGoNext ? { x: 2 } : {}}
          whileTap={canGoNext ? { scale: 0.94 } : {}}
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next design"
          className="rounded p-1 text-inkMuted transition-colors disabled:opacity-30 hover:bg-black/[0.04] hover:text-inkSecondary"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </motion.button>
      </div>
    </div>
  );
}
