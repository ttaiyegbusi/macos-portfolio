import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Calendar,
  CircleUser,
  Clock,
  Copy,
  Download,
  Gauge,
  Info,
  LayoutDashboard,
  MapPin,
  Table2,
  Timer,
} from "lucide-react";
import { DribbbleGlyph, LinkedInGlyph, MediumGlyph, TwitterBirdGlyph } from "./glyphs";
import { VIRTUAL_CANVAS } from "./FigmaCanvas";

export const FRAME_CENTERS: Record<string, { x: number; y: number }> = {
  "About Me": { x: VIRTUAL_CANVAS.w / 2, y: VIRTUAL_CANVAS.h / 2 },
  Knit: { x: 620, y: 540 },
  icametoo: { x: 2240, y: 600 },
  "Football booth": { x: 660, y: 1460 },
  "Chain Core": { x: 2220, y: 1420 },
};

const HERO_X = VIRTUAL_CANVAS.w / 2 - 318;
const HERO_Y = VIRTUAL_CANVAS.h / 2 - 330;

function useLagosTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Lagos",
      }).format(new Date());
      setTime(formatted.replace(" ", "").toLowerCase());
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function AvatarIllustration() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <circle cx="24" cy="24" r="24" fill="#EDE7DF" />
      <path d="M9 48c1.6-9.5 7.6-14 15-14s13.4 4.5 15 14H9Z" fill="#7C5CCB" />
      <path d="M16 35c2-2.4 4.8-3.6 8-3.6s6 1.2 8 3.6l-2.4 4.4H18.4L16 35Z" fill="#E7E1F8" />
      <circle cx="24" cy="21" r="9.5" fill="#8A5A3B" />
      <path d="M13.5 19.5C13.8 13 18.3 9 24 9s10.2 4 10.5 10.5c0 1-.3 1.8-.7 2.3-.4-5-4.4-8.3-9.8-8.3s-9.4 3.3-9.8 8.3c-.4-.5-.7-1.3-.7-2.3Z" fill="#E96B2C" />
      <path d="M14 17.2C15 12 19 8.6 24 8.6S33 12 34 17.2c.2.9-.5 1.4-1.2 1.1a20 20 0 0 0-17.6 0c-.7.3-1.4-.2-1.2-1.1Z" fill="#F07A38" />
      <circle cx="20.4" cy="22" r="1.2" fill="#2B2118" />
      <circle cx="27.6" cy="22" r="1.2" fill="#2B2118" />
      <path d="M21.5 27.2c1.5 1.1 3.5 1.1 5 0" stroke="#2B2118" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PictogramWall() {
  const icons = [Gauge, Clock, Table2, Info, Timer, Calendar, CircleUser, LayoutDashboard];
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[64px] overflow-hidden px-3 pt-2.5 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
      {[0, 1, 2].map((row) => (
        <div key={row} className="mb-2 flex justify-between" style={{ transform: `translateX(${row % 2 ? -9 : 0}px)` }}>
          {Array.from({ length: 9 }).map((_, i) => {
            const Icon = icons[(i + row * 3) % icons.length];
            return <Icon key={i} size={15} strokeWidth={1.4} className="shrink-0 text-black/[0.07]" />;
          })}
        </div>
      ))}
    </div>
  );
}

function SocialTile({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className="flex h-[50px] cursor-pointer flex-col justify-between rounded-[7px] border border-borderFaint bg-white px-2.5 py-1.5 shadow-card transition-colors hover:border-borderSubtle">
      <span className="text-[7.5px] font-medium text-inkMuted">{label}</span>
      <span className="text-inkStrong/80">{icon}</span>
    </div>
  );
}

function CanvasFrame({
  label,
  style,
  children,
}: {
  label: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={style}>
      <p className="mb-1.5 text-[10px] font-medium text-inkTertiary">{label}</p>
      <div className="h-full w-full overflow-hidden rounded-[6px] border border-black/[0.06] bg-white shadow-card">
        {children}
      </div>
    </div>
  );
}

function MiniBars({ tones }: { tones: string[] }) {
  return (
    <div className="flex h-full items-end gap-1.5 p-4">
      {[34, 58, 42, 72, 50, 88, 64, 46, 76].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: tones[i % tones.length] }} />
      ))}
    </div>
  );
}

export default function CanvasContent() {
  const lagosTime = useLagosTime();

  return (
    <>
      {/* Decorative frames */}
      <CanvasFrame label="Knit — Wireframes" style={{ left: 420, top: 410, width: 400, height: 264 }}>
        <div className="flex h-full">
          <div className="w-[88px] border-r border-borderFaint bg-[#FAFAFA] p-2.5">
            {[44, 60, 36, 52, 40].map((w, i) => (
              <div key={i} className="mb-2 h-1.5 rounded-full bg-black/[0.07]" style={{ width: w }} />
            ))}
          </div>
          <div className="flex-1 p-3">
            <div className="mb-2.5 h-2 w-24 rounded-full bg-black/[0.1]" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-[4px] border border-black/[0.06] bg-[#F4F4F4]" />
              ))}
            </div>
          </div>
        </div>
      </CanvasFrame>

      <CanvasFrame label="icametoo — Mobile App" style={{ left: 2150, top: 380, width: 180, height: 360 }}>
        <div className="flex h-full flex-col bg-gradient-to-b from-[#0A0D14] to-[#2A2F3A] p-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25" />
          <div className="mb-2 h-2 w-20 rounded-full bg-white/60" />
          <div className="mb-4 h-1.5 w-14 rounded-full bg-white/25" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-2 rounded-lg bg-white/10 p-2.5">
              <div className="mb-1.5 h-1.5 w-16 rounded-full bg-white/50" />
              <div className="h-1 w-10 rounded-full bg-white/25" />
            </div>
          ))}
          <div className="mt-auto h-7 rounded-full bg-[#5EC550]/90" />
        </div>
      </CanvasFrame>

      <CanvasFrame label="Football booth — Match Hub" style={{ left: 430, top: 1330, width: 460, height: 260 }}>
        <div className="flex h-full flex-col bg-[#0E2A14] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-2 w-16 rounded-full bg-white/55" />
            <div className="rounded-full bg-[#5EC550] px-2 py-0.5 text-[8px] font-semibold text-white">LIVE 74'</div>
          </div>
          <div className="flex flex-1 items-center justify-center gap-6 text-white">
            <div className="h-9 w-9 rounded-full bg-white/15" />
            <span className="text-[22px] font-semibold tracking-tight">2 — 1</span>
            <div className="h-9 w-9 rounded-full bg-white/15" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 rounded-md bg-white/10" />
            ))}
          </div>
        </div>
      </CanvasFrame>

      <CanvasFrame label="Chain Core — Dashboard" style={{ left: 1990, top: 1280, width: 460, height: 280 }}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-borderFaint px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-[#3099DE]" />
            <div className="h-1.5 w-20 rounded-full bg-black/[0.12]" />
            <div className="ml-auto h-1.5 w-10 rounded-full bg-black/[0.07]" />
          </div>
          <MiniBars tones={["#B6DFEB", "#3099DE", "#DCF0FB"]} />
        </div>
      </CanvasFrame>

      <CanvasFrame label="Keyboard — Exploration" style={{ left: 1240, top: 250, width: 330, height: 180 }}>
        <div className="grid h-full grid-cols-6 gap-1.5 bg-[#ECEEF1] p-3">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="rounded-[5px] border border-black/[0.07] bg-white shadow-[0_2px_0_rgba(0,0,0,0.08)]" />
          ))}
        </div>
      </CanvasFrame>

      {/* Hero block */}
      <section className="absolute" style={{ left: HERO_X, top: HERO_Y, width: 636 }}>
        <div className="grid grid-cols-[1fr_236px] items-start gap-[13px]">
          {/* Profile card */}
          <div className="relative h-[216px] overflow-hidden rounded-card border border-borderFaint bg-white shadow-card">
            <PictogramWall />
            <div className="absolute left-4 top-[58px] h-[46px] w-[46px]">
              <AvatarIllustration />
              <span className="absolute bottom-0.5 right-0.5 h-[9px] w-[9px] rounded-full border-2 border-white bg-[#30D158]" />
            </div>
            <div className="absolute inset-x-4 bottom-3.5">
              <p className="mb-1 flex items-center gap-1 text-[9px] text-inkMuted">
                <MapPin size={9} strokeWidth={2.2} className="text-[#2B6BFF]" />
                {lagosTime || "6:45pm"} - Lagos, Nigeria
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[13px] font-semibold leading-snug text-[#111111]">Temitope Aiyegbusi</p>
                  <p className="mt-0.5 text-[8.5px] text-inkMuted">Product Designer</p>
                </div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1.5 rounded-full bg-inkStrong px-3.5 py-2 text-[10px] font-semibold text-white transition-opacity hover:opacity-85"
                >
                  CV
                  <span className="flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-white/20">
                    <Download size={8.5} strokeWidth={2.4} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Social tiles */}
          <div className="grid grid-cols-2 gap-[8px]">
            <SocialTile label="View Dribbble" icon={<DribbbleGlyph size={15} />} />
            <SocialTile label="View Medium" icon={<MediumGlyph size={15} />} />
            <SocialTile label="View Twitter" icon={<TwitterBirdGlyph size={14} />} />
            <SocialTile label="View Linkedin" icon={<LinkedInGlyph size={14} />} />
            <div className="col-span-2 flex h-[50px] items-center justify-between rounded-[7px] border border-borderFaint bg-white px-2.5 shadow-card">
              <div className="min-w-0">
                <p className="text-[7.5px] font-medium text-inkMuted">Mail Me?</p>
                <p className="mt-0.5 truncate text-[10.5px] text-inkSecondary">aiyegbusitope@gmail.com</p>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText("aiyegbusitope@gmail.com")}
                title="Copy email"
                className="shrink-0 rounded p-1 text-iconSoft transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
              >
                <Copy size={11} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mt-12 text-[26px] font-semibold leading-[1.35] tracking-[-0.03em]">
          <span className="text-inkMuted">Designing Digital Products with</span>
          <br />
          <span className="text-ink">Intentionality </span>
          <span className="text-inkMuted">and</span>
          <span className="text-ink"> Excellence.</span>
        </h1>

        {/* Body copy */}
        <div className="mt-[53px] max-w-[460px] space-y-5 text-[16px] leading-[1.6] text-inkSecondary">
          <p>
            Hi, I am <span className="font-medium text-inkStrong">Temitope Aiyegbusi.</span>
          </p>
          <p>
            I'm passionate about transforming ideas into clean, functional, and visually captivating products—this
            portfolio is proof of that.
          </p>
          <p>Take a look around; I'm excited to share my work with you!</p>
        </div>
      </section>
    </>
  );
}
