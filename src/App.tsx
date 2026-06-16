import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import { BackgroundProvider } from "./context/BackgroundProvider";
import { PreviewProvider } from "./context/PreviewContext";
import { ProjectViewerProvider } from "./context/ProjectViewerContext";
import { RevealContext } from "./context/RevealContext";
import { useDeviceType } from "./hooks/useDeviceType";
import Desktop from "./components/Desktop";
import MobileShell from "./components/mobile/MobileShell";
import Preloader from "./components/preloader/Preloader";

export default function App() {
  // Flipped true once the preloader has fully animated out.
  const [revealed, setRevealed] = useState(false);
  const device = useDeviceType();

  return (
    <MotionConfig reducedMotion="user">
      <BackgroundProvider>
        <PreviewProvider>
          <ProjectViewerProvider>
            <WindowManagerProvider>
              <RevealContext.Provider value={revealed}>
                {device === "phone" ? <MobileShell /> : <Desktop />}
              </RevealContext.Provider>
            </WindowManagerProvider>
          </ProjectViewerProvider>
        </PreviewProvider>
      </BackgroundProvider>

      <Preloader onComplete={() => setRevealed(true)} />
    </MotionConfig>
  );
}
