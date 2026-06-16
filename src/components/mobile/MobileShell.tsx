import { AnimatePresence } from "framer-motion";
import { useBackground } from "../../context/BackgroundProvider";
import { useRevealed } from "../../context/RevealContext";
import { useMobileNav } from "../../hooks/useMobileNav";
import { getMobileApp } from "../../data/mobileApps";
import StatusBar from "./StatusBar";
import HomeScreen from "./HomeScreen";
import AppSheet from "./AppSheet";
import MobileSettings from "./MobileSettings";

/**
 * Root of the iOS-style mobile experience. Renders the themed wallpaper, the
 * home screen (status bar + app grid + dock), and—when a screen is open—a
 * full-screen sheet over the top. Shares the same Background/Preview/Window
 * contexts as the desktop, so wallpaper theming and app data stay unified.
 */
export default function MobileShell() {
  const { background } = useBackground();
  const revealed = useRevealed();
  const { active, open, close } = useMobileNav();

  const tone = background.isDark ? "light" : "dark";

  // Resolve the active target into a title + content.
  let sheetTitle = "";
  let sheetContent = null;
  if (active === "settings") {
    sheetTitle = "Settings";
    sheetContent = <MobileSettings />;
  } else if (active) {
    const app = getMobileApp(active);
    if (app) {
      sheetTitle = app.name;
      sheetContent = app.render();
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div className="absolute inset-0" style={{ background: background.css }} />

      {/* Home layer — waits for the preloader to exit so the app tiles animate
          in visibly rather than behind the loader. */}
      {revealed && (
        <div className="absolute inset-0 flex flex-col">
          <StatusBar tone={tone} />
          <div className="min-h-0 flex-1">
            <HomeScreen onOpen={open} />
          </div>
        </div>
      )}

      {/* Open screen sheet */}
      <AnimatePresence>
        {sheetContent && (
          <AppSheet key={active} title={sheetTitle} onClose={close}>
            {sheetContent}
          </AppSheet>
        )}
      </AnimatePresence>
    </div>
  );
}
