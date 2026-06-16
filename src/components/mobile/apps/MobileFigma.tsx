import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, MapPin } from "lucide-react";
import { SOCIALS, PROJECTS, EMAIL } from "../../../data/profile";

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

function Avatar() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <circle cx="24" cy="24" r="24" fill="#EDE7DF" />
      <path d="M9 48c1.6-9.5 7.6-14 15-14s13.4 4.5 15 14H9Z" fill="#7C5CCB" />
      <path d="M16 35c2-2.4 4.8-3.6 8-3.6s6 1.2 8 3.6l-2.4 4.4H18.4L16 35Z" fill="#E7E1F8" />
      <circle cx="24" cy="21" r="9.5" fill="#8A5A3B" />
      <path
        d="M13.5 19.5C13.8 13 18.3 9 24 9s10.2 4 10.5 10.5c0 1-.3 1.8-.7 2.3-.4-5-4.4-8.3-9.8-8.3s-9.4 3.3-9.8 8.3c-.4-.5-.7-1.3-.7-2.3Z"
        fill="#E96B2C"
      />
      <path
        d="M14 17.2C15 12 19 8.6 24 8.6S33 12 34 17.2c.2.9-.5 1.4-1.2 1.1a20 20 0 0 0-17.6 0c-.7.3-1.4-.2-1.2-1.1Z"
        fill="#F07A38"
      />
      <circle cx="20.4" cy="22" r="1.2" fill="#2B2118" />
      <circle cx="27.6" cy="22" r="1.2" fill="#2B2118" />
      <path d="M21.5 27.2c1.5 1.1 3.5 1.1 5 0" stroke="#2B2118" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function MobileFigma() {
  const reduceMotion = useReducedMotion();
  const lagosTime = useLagosTime();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const fade = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 * i, type: "spring", stiffness: 300, damping: 30 },
        };

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F8] px-5 pb-16 pt-1">
      {/* Profile card */}
      <motion.div
        {...fade(0)}
        className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <Avatar />
            <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#30D158]" />
          </div>
          <div className="min-w-0">
            <p className="text-[18px] font-semibold text-inkStrong">Temitope Aiyegbusi</p>
            <p className="text-[14px] text-inkTertiary">Product Designer</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-inkMuted">
              <MapPin size={11} strokeWidth={2.2} className="text-[#2B6BFF]" />
              {lagosTime || "—"} · Lagos, Nigeria
            </p>
          </div>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fade(1)}
        className="mt-7 text-[26px] font-semibold leading-[1.3] tracking-[-0.02em]"
      >
        <span className="text-inkMuted">Designing Digital Products with </span>
        <span className="text-ink">Intentionality</span>
        <span className="text-inkMuted"> and </span>
        <span className="text-ink">Excellence.</span>
      </motion.h1>

      {/* Intro copy */}
      <motion.div {...fade(2)} className="mt-5 space-y-4 text-[16px] leading-[1.7] text-inkSecondary">
        <p>
          Hi, I am <span className="font-medium text-inkStrong">Temitope Aiyegbusi.</span>
        </p>
        <p>
          I'm passionate about transforming ideas into clean, functional, and visually captivating products — this
          portfolio is proof of that.
        </p>
        <p>Take a look around; I'm excited to share my work with you!</p>
      </motion.div>

      {/* CV + email */}
      <motion.div {...fade(3)} className="mt-6 flex flex-col gap-3">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-center gap-2 rounded-xl bg-inkStrong px-4 py-3 text-[15px] font-semibold text-white active:bg-black/85"
        >
          Download CV
          <Download size={16} strokeWidth={2.2} />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-left active:bg-black/[0.02]"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-inkMuted">Mail me?</p>
            <p className="truncate text-[14px] text-inkSecondary">{EMAIL}</p>
          </div>
          {copied ? (
            <Check size={17} strokeWidth={2.2} className="shrink-0 text-[#30A14E]" />
          ) : (
            <Copy size={16} strokeWidth={1.9} className="shrink-0 text-inkMuted" />
          )}
        </button>
      </motion.div>

      {/* Projects */}
      <motion.div {...fade(4)} className="mt-8">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-inkMuted">Projects</p>
        <div className="space-y-2.5">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-3"
            >
              <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-[#EEF0F3] to-[#E2E5EA]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-inkStrong">{p.title}</p>
                <p className="truncate text-[13px] text-inkTertiary">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Socials */}
      <motion.div {...fade(5)} className="mt-8">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-inkMuted">Socials</p>
        <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white">
          {SOCIALS.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 active:bg-black/[0.03]"
              style={{ borderTop: i === 0 ? undefined : "1px solid rgba(0,0,0,0.06)" }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-inkSecondary">
                {s.icon}
              </span>
              <span className="flex-1 text-[15px] text-inkStrong">{s.label}</span>
              <ArrowUpRight size={16} strokeWidth={1.8} className="text-inkFaint" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
