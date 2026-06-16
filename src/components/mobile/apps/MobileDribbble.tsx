import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { DRIBBBLE_YEARS, designItems, type DesignItem } from "../../../data/dribbble";

export default function MobileDribbble() {
  const reduceMotion = useReducedMotion();
  const [year, setYear] = useState(2026);
  const [active, setActive] = useState<DesignItem | null>(null);

  const items = designItems.filter((d) => d.year === year);

  return (
    <div className="relative flex h-full flex-col bg-[#F4F4F5]">
      {/* Year chips */}
      <div className="shrink-0 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {DRIBBBLE_YEARS.map((y) => {
            const selected = y === year;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
                  selected
                    ? "bg-inkStrong text-white"
                    : "bg-black/[0.05] text-inkSecondary active:bg-black/[0.1]"
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => item.imageUrl && setActive(item)}
                layout={!reduceMotion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="flex flex-col gap-1.5 text-left"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-[12px] text-inkFaint">{item.title}</span>
                  )}
                </div>
                <p className="truncate px-0.5 text-[12px] font-medium text-inkSecondary">{item.title}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-screen viewer */}
      <AnimatePresence>
        {active?.imageUrl && (
          <motion.div
            key="viewer"
            className="absolute inset-0 z-10 flex flex-col bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex shrink-0 items-center justify-between px-4 pt-3 pb-2">
              <p className="truncate pr-3 text-[15px] font-medium text-white/90">{active.title}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white active:bg-white/25"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
              <motion.img
                key={active.id}
                src={active.imageUrl}
                alt={active.title}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
