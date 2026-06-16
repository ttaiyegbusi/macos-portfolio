import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { APP_LIST } from "../data/apps";
import { useWindowManager } from "../context/WindowManager";
import { useBackground } from "../context/BackgroundProvider";
import { useRevealed } from "../context/RevealContext";
import AppWindow from "./AppWindow";
import Dock from "./Dock";
import TopNav from "./appearance/TopNav";

export default function Desktop() {
  const { windows } = useWindowManager();
  const { background } = useBackground();
  const revealed = useRevealed();

  // Once revealed, hold a brief beat so the bare desktop reads for a moment
  // before the windows and chrome animate in — a clean staged entrance.
  const [mountContent, setMountContent] = useState(false);
  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => setMountContent(true), 240);
    return () => window.clearTimeout(t);
  }, [revealed]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#9bd5c3]">
      {/* Background layer — mounts immediately so the loader reveals a real
          desktop. Crossfades between selections. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={background.id}
          className="absolute inset-0"
          style={{ background: background.css }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Windows + chrome wait for the reveal (plus a brief beat) so their
          entrance animations play visibly on a bare desktop, instead of
          behind the loader. */}
      {mountContent && (
        <>
          {/* Windows layer */}
          <AnimatePresence>
            {APP_LIST.filter((app) => windows[app.id].open).map((app) => (
              <AppWindow key={app.id} app={app} />
            ))}
          </AnimatePresence>

          <Dock />
          <TopNav />
        </>
      )}
    </div>
  );
}
