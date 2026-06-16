import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { AppId, Bounds, WindowState } from "../types";
import { APP_LIST, APPS, DOCK_CLEARANCE } from "../data/apps";

interface State {
  windows: Record<AppId, WindowState>;
  zTop: number;
}

type Action =
  | { type: "OPEN"; id: AppId; bounds?: Bounds }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId; target: { dx: number; dy: number } }
  | { type: "RESTORE"; id: AppId }
  | { type: "TOGGLE_MAXIMIZE"; id: AppId; viewport: { vw: number; vh: number } }
  | { type: "FOCUS"; id: AppId }
  | { type: "SET_BOUNDS"; id: AppId; bounds: Bounds };

function initialWindow(id: AppId, openOnBoot: boolean, z: number): WindowState {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1536;
  const vh = typeof window !== "undefined" ? window.innerHeight : 960;
  return {
    open: openOnBoot,
    minimized: false,
    maximized: false,
    bounds: APPS[id].defaultBounds(vw, vh),
    prevBounds: null,
    z,
    minimizeTarget: null,
    openCount: openOnBoot ? 1 : 0,
  };
}

function buildInitialState(): State {
  const windows = {} as Record<AppId, WindowState>;
  APP_LIST.forEach((app, i) => {
    // Figma boots open and focused, exactly like the screenshot
    windows[app.id] = initialWindow(app.id, app.id === "figma", i + 1);
  });
  const zTop = APP_LIST.length + 1;
  windows.figma.z = zTop;
  return { windows, zTop };
}

function reducer(state: State, action: Action): State {
  const win = state.windows[action.id];
  const set = (patch: Partial<WindowState>): State => ({
    ...state,
    windows: { ...state.windows, [action.id]: { ...win, ...patch } },
  });

  switch (action.type) {
    case "OPEN": {
      const zTop = state.zTop + 1;
      return {
        ...set({
          open: true,
          minimized: false,
          minimizeTarget: null,
          z: zTop,
          openCount: win.openCount + 1,
          ...(action.bounds ? { bounds: action.bounds } : {}),
        }),
        zTop,
      };
    }
    case "CLOSE":
      return set({ open: false, minimized: false, maximized: false, prevBounds: null, minimizeTarget: null });
    case "MINIMIZE":
      return set({ minimized: true, minimizeTarget: action.target });
    case "RESTORE": {
      const zTop = state.zTop + 1;
      return { ...set({ minimized: false, minimizeTarget: null, z: zTop }), zTop };
    }
    case "TOGGLE_MAXIMIZE": {
      const zTop = state.zTop + 1;
      if (win.maximized) {
        return {
          ...set({
            maximized: false,
            bounds: win.prevBounds ?? win.bounds,
            prevBounds: null,
            z: zTop,
          }),
          zTop,
        };
      }
      const { vw, vh } = action.viewport;
      return {
        ...set({
          maximized: true,
          prevBounds: win.bounds,
          bounds: { x: 10, y: 10, w: vw - 20, h: vh - DOCK_CLEARANCE - 10 },
          z: zTop,
        }),
        zTop,
      };
    }
    case "FOCUS": {
      if (win.z === state.zTop && win.open && !win.minimized) return state;
      const zTop = state.zTop + 1;
      return { ...set({ z: zTop }), zTop };
    }
    case "SET_BOUNDS":
      return set({ bounds: action.bounds });
    default:
      return state;
  }
}

interface WindowManagerValue {
  windows: Record<AppId, WindowState>;
  zTop: number;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  setBounds: (id: AppId, bounds: Bounds) => void;
  /** dock icons register their DOM nodes so windows can animate toward them */
  registerDockIcon: (id: AppId, el: HTMLElement | null) => void;
  /** click behavior for dock icons: open / restore / focus */
  handleDockClick: (id: AppId) => void;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);
  const dockIconRefs = useRef<Partial<Record<AppId, HTMLElement | null>>>({});
  const stateRef = useRef(state);
  stateRef.current = state;

  const registerDockIcon = useCallback((id: AppId, el: HTMLElement | null) => {
    dockIconRefs.current[id] = el;
  }, []);

  const openApp = useCallback((id: AppId) => dispatch({ type: "OPEN", id }), []);
  const closeApp = useCallback((id: AppId) => dispatch({ type: "CLOSE", id }), []);
  const focusApp = useCallback((id: AppId) => dispatch({ type: "FOCUS", id }), []);
  const setBounds = useCallback((id: AppId, bounds: Bounds) => dispatch({ type: "SET_BOUNDS", id, bounds }), []);

  const minimizeApp = useCallback((id: AppId) => {
    const win = stateRef.current.windows[id];
    const iconEl = dockIconRefs.current[id];
    let target = { dx: 0, dy: window.innerHeight / 2 };
    if (iconEl) {
      const rect = iconEl.getBoundingClientRect();
      target = {
        dx: rect.left + rect.width / 2 - (win.bounds.x + win.bounds.w / 2),
        dy: rect.top + rect.height / 2 - (win.bounds.y + win.bounds.h / 2),
      };
    }
    dispatch({ type: "MINIMIZE", id, target });
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    dispatch({
      type: "TOGGLE_MAXIMIZE",
      id,
      viewport: { vw: window.innerWidth, vh: window.innerHeight },
    });
  }, []);

  const handleDockClick = useCallback((id: AppId) => {
    const win = stateRef.current.windows[id];
    if (!win.open) {
      dispatch({ type: "OPEN", id });
    } else if (win.minimized) {
      dispatch({ type: "RESTORE", id });
    } else {
      dispatch({ type: "FOCUS", id });
    }
  }, []);

  const value = useMemo<WindowManagerValue>(
    () => ({
      windows: state.windows,
      zTop: state.zTop,
      openApp,
      closeApp,
      minimizeApp,
      toggleMaximize,
      focusApp,
      setBounds,
      registerDockIcon,
      handleDockClick,
    }),
    [state, openApp, closeApp, minimizeApp, toggleMaximize, focusApp, setBounds, registerDockIcon, handleDockClick],
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager(): WindowManagerValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}
