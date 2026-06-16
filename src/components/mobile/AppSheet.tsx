import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import StatusBar from "./StatusBar";

interface AppSheetProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

/**
 * Full-screen iOS app sheet. Slides up from the bottom on open, can be
 * dismissed by swiping down from the header or tapping the chevron. Carries its
 * own status bar so the app feels like a self-contained screen. One sheet is
 * visible at a time.
 */
export default function AppSheet({ title, children, onClose }: AppSheetProps) {
  const reduceMotion = useReducedMotion();

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Dismiss if dragged down far enough or flicked down quickly.
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col bg-[#F7F7F8]"
      initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 320, damping: 34, mass: 0.9 }
      }
    >
      <StatusBar tone="dark" />

      {/* Header — draggable handle for swipe-to-dismiss */}
      <motion.header
        className="flex shrink-0 items-center gap-2 px-4 pb-2 pt-1"
        drag={reduceMotion ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={handleDragEnd}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] text-inkSecondary transition-colors active:bg-black/[0.1]"
        >
          <ChevronDown size={20} strokeWidth={2} />
        </button>
        <h1 className="text-[20px] font-semibold tracking-tight text-inkStrong">{title}</h1>
      </motion.header>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </motion.div>
  );
}
