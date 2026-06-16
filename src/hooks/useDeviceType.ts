import { useEffect, useState } from "react";

export type DeviceType = "phone" | "desktop";

/** Phones below this width get the iOS shell; tablets and up get the macOS desktop. */
export const PHONE_MAX_WIDTH = 768;
/** A viewport this short is almost always a phone held in landscape. */
export const PHONE_MAX_HEIGHT = 500;

function detect(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Phone in portrait (narrow) OR phone in landscape (short). Coarse pointer
  // confirms a touch device so a short-but-wide desktop window isn't mistaken
  // for a phone.
  const coarse =
    typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
  if (w < PHONE_MAX_WIDTH) return "phone";
  if (h < PHONE_MAX_HEIGHT && coarse) return "phone";
  return "desktop";
}

/**
 * Live device classification. Re-evaluates on resize and orientation change so
 * rotating a phone or resizing a window swaps shells correctly. Width-based
 * (plus a short-landscape + coarse-pointer rule), not user-agent sniffing.
 */
export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(detect);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setDevice(detect()));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return device;
}
