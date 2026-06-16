import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_LIST } from "../data/apps";
import { useWindowManager } from "../context/WindowManager";
import { TrashIcon } from "./icons/AppIcons";
import type { AppDefinition } from "../types";

function DockIcon({ app }: { app: AppDefinition }) {
  const { windows, zTop, handleDockClick, registerDockIcon } = useWindowManager();
  const win = windows[app.id];
  const [hovered, setHovered] = useState(false);

  const isOpen = win.open;
  const isActive = isOpen && !win.minimized && win.z === zTop;

  return (
    <div className="relative flex flex-col items-center">
      {/* macOS-style hover label — wrapper owns centering so the motion
          transform (scale/y) can never knock the pill off-center */}
      <AnimatePresence>
        {hovered && (
          <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 -translate-x-1/2">
            <motion.span
              initial={{ opacity: 0, y: 4, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{ type: "spring", stiffness: 480, damping: 30 }}
              className="glass-tooltip block whitespace-nowrap rounded-full px-2.5 py-[5px] text-[12px] font-medium leading-none text-inkStrong"
            >
              {app.name}
            </motion.span>
          </span>
        )}
      </AnimatePresence>

      <motion.button
        ref={(el) => registerDockIcon(app.id, el)}
        onClick={() => handleDockClick(app.id)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.18, y: -8 }}
        whileTap={{ scale: 1.04, y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        aria-label={`${app.name}${isOpen ? " (open)" : ""}`}
        className="relative h-[42px] w-[42px] drop-shadow-[0_4px_7px_rgba(0,0,0,0.18)]"
      >
        {app.icon}
        {/* glossy top reflection on the icon tile */}
        <span className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-b from-white/30 via-transparent to-transparent opacity-55" />
      </motion.button>

      {/* open / active indicator */}
      <span
        className={`absolute -bottom-[8px] h-[4px] w-[4px] rounded-full transition-all duration-200 ${
          isOpen ? (isActive ? "bg-inkStrong/65" : "bg-inkStrong/30") : "bg-transparent"
        }`}
      />
    </div>
  );
}

export default function Dock() {
  const { windows } = useWindowManager();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3.5 z-[9999] flex justify-center">
      <motion.div
        initial={{ y: 72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.15 }}
        className="dock-glass pointer-events-auto relative flex items-center gap-[12px] rounded-[21px] px-[16px] py-[10px]"
      >
        {/* sheen sweep */}
        <span className="dock-sheen absolute inset-0 rounded-[21px]" />

        <AnimatePresence initial={false} mode="popLayout">
          {APP_LIST.filter(
            (app) =>
              (app.id !== "imagePreview" || windows.imagePreview.open) &&
              (app.id !== "projectPage" || windows.projectPage.open),
          ).map((app) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, scale: 0.6, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.6, width: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              <DockIcon app={app} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* divider + trash */}
        <span className="mx-0.5 h-[38px] w-px bg-gradient-to-b from-transparent via-black/[0.16] to-transparent" />
        <motion.div
          whileHover={{ scale: 1.15, y: -7 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          title="Trash (empty — nothing to see here)"
          className="h-[42px] w-[37px] cursor-default drop-shadow-[0_4px_7px_rgba(0,0,0,0.15)]"
        >
          <TrashIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}
