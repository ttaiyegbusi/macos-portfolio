import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AppDefinition } from "../types";
import { useWindowManager } from "../context/WindowManager";
import { usePreview } from "../context/PreviewContext";
import { useProjectViewer } from "../context/ProjectViewerContext";
import { PROJECTS_BY_PAGE } from "../data/projects";
import { DOCK_CLEARANCE } from "../data/apps";
import WindowControls from "./WindowControls";

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const RESIZE_HANDLES: { dir: ResizeDir; className: string; cursor: string }[] = [
  { dir: "n", className: "left-2 right-2 -top-1 h-2", cursor: "ns-resize" },
  { dir: "s", className: "left-2 right-2 -bottom-1 h-2", cursor: "ns-resize" },
  { dir: "e", className: "top-2 bottom-2 -right-1 w-2", cursor: "ew-resize" },
  { dir: "w", className: "top-2 bottom-2 -left-1 w-2", cursor: "ew-resize" },
  { dir: "ne", className: "-top-1 -right-1 h-4 w-4", cursor: "nesw-resize" },
  { dir: "nw", className: "-top-1 -left-1 h-4 w-4", cursor: "nwse-resize" },
  { dir: "se", className: "-bottom-1 -right-1 h-4 w-4", cursor: "nwse-resize" },
  { dir: "sw", className: "-bottom-1 -left-1 h-4 w-4", cursor: "nesw-resize" },
];

export default function AppWindow({ app }: { app: AppDefinition }) {
  const { windows, zTop, focusApp, closeApp, minimizeApp, toggleMaximize, setBounds } = useWindowManager();
  const { title: previewTitle } = usePreview();
  const { activePage } = useProjectViewer();
  const win = windows[app.id];
  const [interacting, setInteracting] = useState(false);
  const reduceMotion = useReducedMotion();
  const boundsRef = useRef(win.bounds);
  boundsRef.current = win.bounds;

  const isFocused = win.z === zTop;

  /* ------------------------------- dragging ------------------------------- */
  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 || win.maximized) return;
      focusApp(app.id);
      const startX = e.clientX;
      const startY = e.clientY;
      const origin = { ...boundsRef.current };
      setInteracting(true);

      const onMove = (ev: PointerEvent) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = Math.min(Math.max(origin.x + ev.clientX - startX, -origin.w + 140), vw - 140);
        const y = Math.min(Math.max(origin.y + ev.clientY - startY, 0), vh - 60);
        setBounds(app.id, { ...origin, x, y });
      };
      const onUp = () => {
        setInteracting(false);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [app.id, win.maximized, focusApp, setBounds],
  );

  /* ------------------------------- resizing ------------------------------- */
  const startResize = useCallback(
    (e: React.PointerEvent, dir: ResizeDir) => {
      if (e.button !== 0 || win.maximized) return;
      e.stopPropagation();
      focusApp(app.id);
      const startX = e.clientX;
      const startY = e.clientY;
      const origin = { ...boundsRef.current };
      const { w: minW, h: minH } = app.minSize;
      setInteracting(true);

      const onMove = (ev: PointerEvent) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxW = vw - 16;
        const maxH = vh - DOCK_CLEARANCE + 24;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let { x, y, w, h } = origin;

        if (dir.includes("e")) w = Math.min(Math.max(origin.w + dx, minW), maxW);
        if (dir.includes("s")) h = Math.min(Math.max(origin.h + dy, minH), maxH);
        if (dir.includes("w")) {
          w = Math.min(Math.max(origin.w - dx, minW), maxW);
          x = origin.x + (origin.w - w);
        }
        if (dir.includes("n")) {
          h = Math.min(Math.max(origin.h - dy, minH), maxH);
          y = Math.max(0, origin.y + (origin.h - h));
          h = origin.h + (origin.y - y); // re-derive so clamping y never detaches the edge
        }
        setBounds(app.id, { x, y, w, h });
      };
      const onUp = () => {
        setInteracting(false);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [app.id, app.minSize, win.maximized, focusApp, setBounds],
  );

  const controls = (
    <WindowControls
      onClose={() => closeApp(app.id)}
      onMinimize={() => minimizeApp(app.id)}
      onMaximize={() => toggleMaximize(app.id)}
      isMaximized={win.maximized}
    />
  );

  const dragHandleProps = {
    onPointerDown: startDrag,
    onDoubleClick: () => toggleMaximize(app.id),
  };

  return (
    <motion.div
      className={`window-frame absolute ${interacting ? "interacting" : ""}`}
      style={{
        left: win.bounds.x,
        top: win.bounds.y,
        width: win.bounds.w,
        height: win.bounds.h,
        zIndex: win.z,
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      onPointerDownCapture={() => focusApp(app.id)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0, transition: { duration: 0.18 } }
          : { opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }
      }
    >
      {/* Inner shell: handles open spring + minimize-to-dock travel */}
      <motion.div
        key={win.openCount}
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-window border border-white/55 bg-windowBody ${
          isFocused ? "shadow-window" : "shadow-[0_14px_40px_rgba(0,0,0,0.07)]"
        }`}
        style={{ transformOrigin: "50% 50%", willChange: "transform, opacity" }}
        initial={reduceMotion ? { opacity: 0 } : { scale: 0.94, opacity: 0, y: 14 }}
        animate={
          win.minimized
            ? reduceMotion
              ? { opacity: 0, transition: { duration: 0.2 } }
              : {
                  // Collapse into the matching dock icon: travel + shrink,
                  // opacity holds while moving and only fades at the very end,
                  // corners round off as the window becomes icon-sized.
                  x: win.minimizeTarget?.dx ?? 0,
                  y: win.minimizeTarget?.dy ?? window.innerHeight / 2,
                  scale: 0.05,
                  opacity: [1, 1, 0.85, 0],
                  borderRadius: "26px",
                  transition: {
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                    opacity: { duration: 0.5, times: [0, 0.55, 0.82, 1] },
                  },
                }
            : reduceMotion
              ? { x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.2 } }
              : {
                  // Restore: expand back out of the dock icon with a soft spring.
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  borderRadius: "12px",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.9,
                    opacity: { duration: 0.28, ease: "easeOut" },
                  },
                }
        }
      >
        {app.customChrome ? (
          app.render({ appId: app.id, isMaximized: win.maximized, controls, dragHandleProps })
        ) : (
          <>
            <header
              {...dragHandleProps}
              className="flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b border-borderLight bg-chrome"
            >
              <div className="flex items-center border-r border-borderLight px-4">{controls}</div>
              <div className="flex items-center border-r border-borderLight px-4 text-[12px] font-semibold text-[#2F2F2F]">
                {app.id === "imagePreview"
                  ? previewTitle || "Preview"
                  : app.id === "projectPage"
                    ? (activePage && PROJECTS_BY_PAGE[activePage]?.windowTitle) || "Project"
                    : app.name}
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-4">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#D5D5D5]" />
                ))}
              </div>
            </header>
            <div className="min-h-0 flex-1">
              {app.render({ appId: app.id, isMaximized: win.maximized, controls, dragHandleProps })}
            </div>
          </>
        )}

        {/* dim unfocused windows very slightly, like macOS */}
        {!isFocused && <div className="pointer-events-none absolute inset-0 rounded-window bg-white/[0.14]" />}
      </motion.div>

      {/* Resize handles (outside the overflow-hidden shell so they stay grabbable) */}
      {!win.maximized && !win.minimized &&
        RESIZE_HANDLES.map(({ dir, className, cursor }) => (
          <div
            key={dir}
            onPointerDown={(e) => startResize(e, dir)}
            className={`absolute z-10 ${className}`}
            style={{ cursor, touchAction: "none" }}
          />
        ))}
    </motion.div>
  );
}
