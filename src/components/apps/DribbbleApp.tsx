import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PanelLeft, PanelLeftOpen } from "lucide-react";
import { usePreview } from "../../context/PreviewContext";
import { useWindowManager } from "../../context/WindowManager";
import { DRIBBBLE_YEARS as YEARS, designItems, type DesignItem } from "../../data/dribbble";

export default function DribbbleApp() {
  const reduceMotion = useReducedMotion();
  const [selectedYear, setSelectedYear] = useState(2026);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { setPreview } = usePreview();
  const { openApp } = useWindowManager();

  const filteredItems = designItems.filter((item) => item.year === selectedYear);

  const handleImageClick = (item: DesignItem) => {
    if (!item.imageUrl) return;
    setPreview(item.imageUrl, item.title);
    openApp("imagePreview");
  };

  const spring = { type: "spring", stiffness: 360, damping: 34 } as const;

  return (
    <div className="relative flex h-full w-full gap-4 bg-[#F7F7F7] p-4">
      {/* Floating sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16, width: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, width: 180 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16, width: 0 }}
            transition={reduceMotion ? { duration: 0.15 } : spring}
            className="flex shrink-0 flex-col overflow-hidden rounded-lg border border-white/40 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[13px] font-normal text-inkSecondary">Explorations</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Collapse sidebar"
                className="rounded p-1 text-inkTertiary transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
              >
                <PanelLeft size={14} strokeWidth={1.8} />
              </button>
            </div>
            <div className="space-y-1">
              {YEARS.map((year) => (
                <motion.button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-3 py-2 rounded text-[13px] transition-all ${
                    selectedYear === year
                      ? "bg-black/[0.06] font-medium text-inkStrong"
                      : "text-inkTertiary hover:bg-black/[0.03] font-normal"
                  }`}
                >
                  {year}
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Expand handle when collapsed */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            key="expand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Expand sidebar"
            className="absolute left-6 top-6 z-10 rounded-md border border-white/50 bg-white/80 p-1.5 text-inkSecondary shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
          >
            <PanelLeftOpen size={14} strokeWidth={1.8} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleImageClick(item)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex flex-col gap-2 cursor-pointer group text-left"
              >
                <div className="aspect-square rounded-lg bg-white overflow-hidden flex items-center justify-center p-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <p className="text-center text-[12px] font-medium text-inkStrong">{item.title}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
