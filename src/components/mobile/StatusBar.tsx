import { useEffect, useState } from "react";

interface StatusBarProps {
  /** dark glyphs for light wallpapers (default), or light glyphs for dark ones */
  tone?: "dark" | "light";
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      // iOS shows "9:41" without AM/PM in the status bar
      setTime(t.replace(/\s?[AP]M$/i, ""));
    };
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * iOS-style status bar. Live time on the left; signal, wifi, and battery on the
 * right. Sits inside the top safe-area inset so it clears notches.
 */
export default function StatusBar({ tone = "dark" }: StatusBarProps) {
  const time = useClock();
  const color = tone === "dark" ? "#1A1A1C" : "#FFFFFF";

  return (
    <div
      className="pointer-events-none relative z-30 flex shrink-0 items-center justify-between px-7 pt-[max(env(safe-area-inset-top),12px)] pb-1.5 text-[15px] font-semibold"
      style={{ color }}
    >
      <span className="tracking-tight tabular-nums">{time || "9:41"}</span>

      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" fill={color} />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill={color} />
          <rect x="10" y="3" width="3" height="9" rx="1" fill={color} />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" fill={color} />
        </svg>

        {/* Wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <path
            d="M8.5 2.2c2.6 0 5 1 6.8 2.6.3.3.3.7 0 1l-.6.6c-.3.3-.7.3-1 0A8 8 0 0 0 8.5 4.2 8 8 0 0 0 2.8 6.4c-.3.3-.7.3-1 0l-.6-.6c-.3-.3-.3-.7 0-1A9.6 9.6 0 0 1 8.5 2.2Z"
            fill={color}
          />
          <path
            d="M8.5 6.1c1.4 0 2.7.5 3.7 1.4.3.3.3.7 0 1l-.7.7c-.3.3-.6.3-.9 0a3 3 0 0 0-4.2 0c-.3.3-.6.3-.9 0l-.7-.7c-.3-.3-.3-.7 0-1a5.4 5.4 0 0 1 3.7-1.4Z"
            fill={color}
          />
          <circle cx="8.5" cy="10.4" r="1.4" fill={color} />
        </svg>

        {/* Battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={color} strokeOpacity="0.4" />
          <rect x="2" y="2" width="17" height="9" rx="2" fill={color} />
          <path d="M24 4.5v4c.9-.4.9-3.6 0-4Z" fill={color} fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
