import { Check } from "lucide-react";
import { useBackground } from "../../context/BackgroundProvider";

/**
 * Mobile Settings — currently a wallpaper picker that mirrors the desktop
 * appearance menu. Tapping a swatch themes the whole shell live (it shares the
 * same Background context as the desktop).
 */
export default function MobileSettings() {
  const { background, backgrounds, setBackgroundId } = useBackground();

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F8] px-5 pb-16 pt-1">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-inkMuted">Wallpaper</p>

      <div className="grid grid-cols-3 gap-3">
        {backgrounds.map((bg) => {
          const selected = bg.id === background.id;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => setBackgroundId(bg.id)}
              className="flex flex-col items-center gap-1.5"
              aria-pressed={selected}
            >
              <span
                className={`relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border transition-shadow ${
                  selected ? "border-[#2B6BFF] shadow-[0_0_0_2px_rgba(43,107,255,0.4)]" : "border-black/[0.08]"
                }`}
                style={{ background: bg.css }}
              >
                {selected && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2B6BFF] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </span>
              <span className="truncate text-[11px] text-inkTertiary">{bg.name}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-center text-[12px] text-inkFaint">
        Temitope Aiyegbusi · Portfolio
      </p>
    </div>
  );
}
