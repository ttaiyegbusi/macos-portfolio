import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeftOpen, X } from "lucide-react";
import type { AppContentProps } from "../../../types";
import FigmaCanvas from "./FigmaCanvas";
import CanvasContent, { FRAME_CENTERS } from "./CanvasContent";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useProjectViewer } from "../../../context/ProjectViewerContext";
import { useWindowManager } from "../../../context/WindowManager";

const TABS = ["Knit", "icametoo", "Football booth", "Chain Core", "Foot...", "Foot..."];

const spring = { type: "spring", stiffness: 380, damping: 34 } as const;

export default function FigmaApp({ controls, dragHandleProps }: AppContentProps) {
  const [sidebarsVisible, setSidebarsVisible] = useState(true);
  const [activePage, setActivePage] = useState("About Me");
  const [focusKey, setFocusKey] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { setActiveProject } = useProjectViewer();
  const { handleDockClick } = useWindowManager();

  const selectPage = (page: string) => {
    setActivePage(page);
    setFocusKey((k) => k + 1);
  };

  const openProject = (page: string) => {
    setActiveProject(page);
    // handleDockClick covers open / restore-from-minimized / focus in one call,
    // exactly like clicking the app's own dock icon would.
    handleDockClick("projectPage");
  };

  return (
    <div className={`flex h-full flex-col ${isDarkMode ? "bg-[#1a1a1a] text-white" : ""}`}>
      {/* ----- Tab bar ----- */}
      <header
        {...dragHandleProps}
        className={`flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b ${
          isDarkMode ? "border-[#2a2a2a] bg-[#232323]" : "border-borderLight bg-chrome"
        }`}
      >
        <div className={`flex items-center border-r ${isDarkMode ? "border-[#2a2a2a]" : "border-borderLight"} px-4`}>
          {controls}
        </div>

        <div
          className={`flex h-full items-center border-r ${isDarkMode ? "border-[#2a2a2a]" : "border-borderLight"} px-4 text-[12px] font-semibold ${
            isDarkMode ? "text-[#ddd]" : "text-[#2F2F2F]"
          }`}
        >
          Figma
        </div>

        <div className="flex min-w-0 items-stretch overflow-hidden">
          {TABS.map((tab, i) => (
            <button
              key={`${tab}-${i}`}
              onClick={() => !tab.includes("...") && selectPage(tab)}
              onPointerDown={(e) => e.stopPropagation()}
              className={`group flex shrink-0 items-center gap-2 border-r px-3.5 text-[12px] transition-colors ${
                isDarkMode
                  ? "border-[#2a2a2a] text-[#aaa] hover:bg-white/[0.06]"
                  : "border-borderLight text-[#636363] hover:bg-black/[0.02]"
              }`}
            >
              <span className="max-w-[110px] truncate">{tab}</span>
              <X size={11} strokeWidth={1.8} className={`${isDarkMode ? "text-[#666]" : "text-[#9a9a9a]"} opacity-70 transition-opacity group-hover:opacity-100`} />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[7px] w-[7px] rounded-full ${isDarkMode ? "bg-[#555]" : "bg-[#D5D5D5]"}`} />
          ))}
        </div>
      </header>

      {/* ------ Body ------ */}
      <div className={`relative flex-1 overflow-hidden ${isDarkMode ? "bg-[#0f0f0f]" : "bg-windowBody"}`}>
        <FigmaCanvas focusPoint={FRAME_CENTERS[activePage] ?? null} focusKey={focusKey}>
          <CanvasContent onOpenProject={openProject} />
        </FigmaCanvas>

        {/* Floating sidebars */}
        <AnimatePresence>
          {sidebarsVisible && (
            <motion.aside
              key="left"
              initial={{ x: -230, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -230, opacity: 0 }}
              transition={spring}
              className="absolute bottom-[54px] left-[26px] top-[52px] w-[176px]"
            >
              <LeftSidebar
                activePage={activePage}
                onSelectPage={selectPage}
                onCollapse={() => setSidebarsVisible(false)}
                isDarkMode={isDarkMode}
              />
            </motion.aside>
          )}
          {sidebarsVisible && (
            <motion.aside
              key="right"
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 260, opacity: 0 }}
              transition={spring}
              className="absolute bottom-[54px] right-[26px] top-[52px] w-[212px]"
            >
              <RightSidebar isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode((v) => !v)} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Floating restore handle */}
        <AnimatePresence>
          {!sidebarsVisible && (
            <motion.button
              key="handle"
              initial={{ x: -36, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -36, opacity: 0 }}
              transition={spring}
              onClick={() => setSidebarsVisible(true)}
              title="Show sidebars"
              className="glass-tooltip absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-inkSecondary transition-transform hover:scale-110"
            >
              <PanelLeftOpen size={15} strokeWidth={1.7} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
