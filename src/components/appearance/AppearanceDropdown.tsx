import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useBackground } from "../../context/BackgroundProvider";
import BackgroundThumbnail from "./BackgroundThumbnail";

interface AppearanceDropdownProps {
  onClose: () => void;
}

/**
 * Liquid-glass appearance panel. Opens like a soft glass bubble from the
 * top-right menu button: opacity + scale + slight drop + blur reveal,
 * driven by a gentle spring. Thumbnails stagger in subtly behind it.
 */
const AppearanceDropdown = forwardRef<HTMLDivElement, AppearanceDropdownProps>(({ onClose }, ref) => {
  const { background, backgrounds, setBackgroundId } = useBackground();
  const reduceMotion = useReducedMotion();

  const panelVariants = {
    closed: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.94,
      y: reduceMotion ? 0 : -8,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 26,
        mass: 0.9,
        filter: { duration: 0.22, ease: "easeOut" as const },
      },
    },
    exit: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.95,
      y: reduceMotion ? 0 : -6,
      filter: reduceMotion ? "blur(0px)" : "blur(4px)",
      transition: { duration: 0.18, ease: [0.32, 0.72, 0, 1] as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, scale: reduceMotion ? 1 : 0.9, y: reduceMotion ? 0 : 4 },
    open: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 420,
        damping: 28,
        delay: reduceMotion ? 0 : 0.04 + i * 0.018,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-label="Appearance settings"
      variants={panelVariants}
      initial="closed"
      animate="open"
      exit="exit"
      style={{ transformOrigin: "top right", willChange: "transform, opacity, filter" }}
      className="liquid-glass-panel absolute right-0 top-[calc(100%+12px)] w-[250px] max-w-[calc(100vw-32px)] rounded-[20px] p-3"
    >
      {/* glossy reflection sweep */}
      <span className="dock-sheen pointer-events-none absolute inset-0 rounded-[20px] opacity-60" />

      <div className="relative mb-2.5 flex items-center justify-between pl-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-inkStrong/90">Appearance</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close appearance settings"
          className="rounded-full p-1 text-inkStrong/60 transition-colors hover:bg-black/[0.07] hover:text-inkStrong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/60"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="relative grid grid-cols-4 gap-2">
        {backgrounds.map((bg, i) => (
          <motion.div key={bg.id} custom={i} variants={itemVariants}>
            <BackgroundThumbnail
              background={bg}
              index={i}
              isSelected={bg.id === background.id}
              onSelect={() => setBackgroundId(bg.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

AppearanceDropdown.displayName = "AppearanceDropdown";

export default AppearanceDropdown;
