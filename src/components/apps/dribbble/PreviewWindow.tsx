import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PreviewTitleBar from "./PreviewTitleBar";
import type { DesignShot } from "../../../data/designShots";

interface PreviewWindowProps {
  design: DesignShot;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export default function PreviewWindow({
  design,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: PreviewWindowProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canGoPrevious && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && canGoNext && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, canGoPrevious, onPrevious, canGoNext, onNext]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/[0.12]"
          />

          {/* Preview window */}
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 20 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 16 }
            }
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 320, damping: 28 }
            }
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[78vw] max-w-[1000px] h-[78vh] max-h-[720px] flex flex-col rounded-[18px] border border-white/40 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.20)]"
          >
            {/* Title bar */}
            <PreviewTitleBar
              fileName={design.fileName}
              onClose={onClose}
              onPrevious={onPrevious}
              onNext={onNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />

            {/* Image container */}
            <motion.div
              key={design.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-1 items-center justify-center overflow-hidden bg-[#f5f5f5] p-6"
            >
              <div
                className="h-full w-full rounded-lg bg-gradient-to-br bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${design.imageUrl}), linear-gradient(135deg, #e0e7ff 0%, #f0e7ff 100%)` }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
