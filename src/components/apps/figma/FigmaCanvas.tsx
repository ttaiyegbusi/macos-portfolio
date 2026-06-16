import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const VIRTUAL_CANVAS = { w: 2800, h: 1900 };

interface FigmaCanvasProps {
  children: ReactNode;
  /** point (in virtual-canvas coordinates) to center in the viewport, e.g. when a page is selected */
  focusPoint: { x: number; y: number } | null;
  focusKey: number;
}

function clampPan(x: number, y: number, cw: number, ch: number) {
  // if the container is larger than the canvas on an axis, center it; otherwise clamp to edges
  const minX = cw - VIRTUAL_CANVAS.w;
  const minY = ch - VIRTUAL_CANVAS.h;
  return {
    x: minX >= 0 ? minX / 2 : Math.min(0, Math.max(minX, x)),
    y: minY >= 0 ? minY / 2 : Math.min(0, Math.max(minY, y)),
  };
}

export default function FigmaCanvas({ children, focusPoint, focusKey }: FigmaCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panRef = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const didPanRef = useRef(false);
  const initializedRef = useRef(false);

  const applyPan = useCallback((x: number, y: number, animate = false) => {
    const el = containerRef.current;
    if (!el) return;
    const next = clampPan(x, y, el.clientWidth, el.clientHeight);
    panRef.current = next;
    setSmooth(animate);
    setPan(next);
  }, []);

  // Center the canvas on first layout, and re-clamp whenever the window/app is resized
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (!initializedRef.current) {
        initializedRef.current = true;
        applyPan(
          (el.clientWidth - VIRTUAL_CANVAS.w) / 2,
          (el.clientHeight - VIRTUAL_CANVAS.h) / 2,
        );
      } else {
        applyPan(panRef.current.x, panRef.current.y);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [applyPan]);

  // Animated pan when a page/frame is selected in the sidebar
  useEffect(() => {
    if (!focusPoint || !containerRef.current) return;
    const el = containerRef.current;
    applyPan(el.clientWidth / 2 - focusPoint.x, el.clientHeight / 2 - focusPoint.y, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey]);

  // Drag-to-pan (pointer events, with a small threshold so taps still click links)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const origin = { ...panRef.current };
    didPanRef.current = false;
    setSmooth(false);
    setIsPanning(true);
    el.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!didPanRef.current && Math.hypot(dx, dy) > 3) didPanRef.current = true;
      if (didPanRef.current) applyPan(origin.x + dx, origin.y + dy);
    };
    const onUp = (ev: PointerEvent) => {
      el.releasePointerCapture?.(ev.pointerId);
      setIsPanning(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [applyPan]);

  // Swallow clicks that were really drags, so links don't fire after panning
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (didPanRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didPanRef.current = false;
    }
  }, []);

  // Wheel / trackpad panning, contained to the canvas (non-passive so we can preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setSmooth(false);
      applyPan(panRef.current.x - e.deltaX, panRef.current.y - e.deltaY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyPan]);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onClickCapture={onClickCapture}
      className="absolute inset-0 overflow-hidden bg-windowBody"
      style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
    >
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          width: VIRTUAL_CANVAS.w,
          height: VIRTUAL_CANVAS.h,
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
          transition: smooth ? "transform 0.55s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
