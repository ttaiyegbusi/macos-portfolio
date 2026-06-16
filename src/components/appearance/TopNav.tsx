import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppearanceDropdown from "./AppearanceDropdown";

/** Three short rounded horizontal lines — a clean macOS-style menu glyph. */
function MenuGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 11.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape (returning focus to the button) and on outside clicks
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      {/* Brand mark — tta. (Temitope Aiyegbusi) */}
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="pointer-events-none fixed left-6 top-5 z-[10001] select-none text-[21px] font-semibold lowercase leading-none tracking-tight text-white lg:left-[72px] lg:top-[48px]"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.18), 0 4px 18px rgba(0,0,0,0.16)" }}
      >
        tta.
      </motion.span>

      {/* Appearance menu button + dropdown */}
      <div className="fixed right-5 top-5 z-[10001] lg:right-[72px] lg:top-[44px]">
        <motion.button
          ref={buttonRef}
          type="button"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: "easeOut" }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close appearance menu" : "Open appearance menu"}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-[transform] duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black/10"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.22))" }}
        >
          <MenuGlyph />
        </motion.button>

        <AnimatePresence>
          {open && (
            <AppearanceDropdown
              ref={panelRef}
              onClose={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
