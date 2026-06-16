import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BackgroundOption } from "../../data/backgrounds";

interface BackgroundThumbnailProps {
  background: BackgroundOption;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BackgroundThumbnail({ background, index, isSelected, onSelect }: BackgroundThumbnailProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Select background ${index + 1}: ${background.name}`}
      aria-pressed={isSelected}
      title={background.name}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
      className={`relative aspect-square w-full overflow-hidden rounded-[9px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white/40 ${
        isSelected
          ? "border-white shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.18)]"
          : "border-white/45 shadow-[0_1px_4px_rgba(0,0,0,0.10)] hover:border-white/80"
      } ${background.isDark ? "focus-visible:ring-white" : "focus-visible:ring-inkStrong/60"}`}
      style={{ background: background.css }}
    >
      {/* soft gloss so every swatch reads as a "material" */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/[0.06]" />

      {isSelected && (
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 520, damping: 26 }}
          className="absolute right-1 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
        >
          <Check size={9} strokeWidth={3.2} className="text-inkStrong" />
        </motion.span>
      )}
    </motion.button>
  );
}
