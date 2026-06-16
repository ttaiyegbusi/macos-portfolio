import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  role: "Product Designer & AI Design Engineer",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
};

/* --------------------------------- config --------------------------------- */

const CARD_W = 230;
const CARD_H = 300;
const ROPE_REST = 92;
const CLIP_TO_CARD = 14;
const STAGE_H = ROPE_REST + CLIP_TO_CARD + CARD_H + 110;

const STIFFNESS = 0.072;
const DAMPING = 0.92;
const ANG_STIFFNESS = 0.1;
const ANG_DAMPING = 0.86;

const MAX_X = 180;
const MIN_Y = -40;
const MAX_Y = 240;

/* -------------------------------- helpers --------------------------------- */

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
// elastic resistance past the soft bounds — lets the card keep stretching
// instead of hitting a hard wall (the "magnet" feeling)
function rubberBand(value: number, min: number, max: number) {
  if (value > max) return max + (value - max) * 0.4;
  if (value < min) return min + (value - min) * 0.4;
  return value;
}

/* -------------------------------- component ------------------------------- */

function HangingIDBadgeBase() {
  const reduceMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropePathRef = useRef<SVGPathElement>(null);
  const ropeHiRef = useRef<SVGPathElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  // stable measured width (never 0 once measured)
  const widthRef = useRef(560);

  // physics — start "thrown" so it falls & swings into place on mount
  const phys = useRef({
    x: 60,
    y: -90,
    vx: 0,
    vy: 0,
    rot: 8,
    avel: 0,
    dragging: false,
    pointerX: 0,
    pointerY: 0,
  });

  const raf = useRef<number>();
  const lastD = useRef("M 280 4 C 280 50, 280 73, 280 96");

  /* re-apply the rope path after every commit as a safety net against
     React reconciliation wiping the imperatively-set `d` attribute */
  useLayoutEffect(() => {
    if (ropePathRef.current) ropePathRef.current.setAttribute("d", lastD.current);
    if (ropeHiRef.current) ropeHiRef.current.setAttribute("d", lastD.current);
  });

  /* ---- keep width measured & valid via ResizeObserver ---- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w && w > 0) widthRef.current = w;
      // redraw immediately so the rope never sits at a stale/zero position
      drawRope(phys.current.x, phys.current.y, phys.current.rot);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- physics + render loop ---- */
  useEffect(() => {
    if (reduceMotion) {
      // static: reset to rest and draw a straight rope
      const s = phys.current;
      s.x = 0;
      s.y = 0;
      s.rot = 0;
      if (cardRef.current) cardRef.current.style.transform = "translate(0px,0px)";
      drawRope(0, 0, 0);
      return;
    }

    const tick = () => {
      const s = phys.current;

      if (s.dragging) {
        // rubber-band so it can stretch past the bounds with resistance
        const targetX = rubberBand(s.pointerX, -MAX_X, MAX_X);
        const targetY = rubberBand(s.pointerY, MIN_Y, MAX_Y);
        // responsive follow (higher = tracks pointer more closely, less "magnetic")
        const follow = 0.6;
        const nx = s.x + (targetX - s.x) * follow;
        const ny = s.y + (targetY - s.y) * follow;
        s.vx = nx - s.x;
        s.vy = ny - s.y;
        s.x = nx;
        s.y = ny;
      } else {
        const forceX = (0 - s.x) * STIFFNESS;
        const forceY = (0 - s.y) * STIFFNESS;
        s.vx = (s.vx + forceX) * DAMPING;
        s.vy = (s.vy + forceY) * DAMPING;
        s.x += s.vx;
        s.y += s.vy;
        if (
          Math.abs(s.x) < 0.01 &&
          Math.abs(s.y) < 0.01 &&
          Math.abs(s.vx) < 0.01 &&
          Math.abs(s.vy) < 0.01
        ) {
          s.x = s.y = s.vx = s.vy = 0;
        }
      }

      // rotation driven more by velocity for a livelier, connected feel
      const targetRot = clamp(s.x * 0.06 + s.vx * 0.9, -18, 18);
      const angForce = (targetRot - s.rot) * ANG_STIFFNESS;
      s.avel = (s.avel + angForce) * ANG_DAMPING;
      s.rot += s.avel;

      if (cardRef.current) {
        const x = safeNumber(s.x);
        const y = safeNumber(s.y);
        const rot = safeNumber(s.rot);
        cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      }
      drawRope(s.x, s.y, s.rot);

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  /* ---- reactive lanyard: always valid coordinates ---- */
  function drawRope(rawX: number, rawY: number, rawRot: number) {
    const path = ropePathRef.current;
    const hi = ropeHiRef.current;
    const clip = clipRef.current;
    if (!path) return;

    const x = safeNumber(rawX);
    const y = safeNumber(rawY);
    const rot = safeNumber(rawRot);

    const width = widthRef.current > 0 ? widthRef.current : 560;
    const ax = width / 2; // anchor x (top-center)
    const ay = 4; // anchor y

    const cx = safeNumber(ax + x, ax);
    const cy = safeNumber(ay + ROPE_REST + y, ay + ROPE_REST);

    const sag = phys.current.dragging ? 4 : 10;
    const c1x = ax + x * 0.1;
    const c1y = ay + (cy - ay) * 0.4 + sag;
    const c2x = ax + x * 0.55;
    const c2y = ay + (cy - ay) * 0.75;

    const d = `M ${ax} ${ay} C ${safeNumber(c1x, ax)} ${safeNumber(c1y, ay)}, ${safeNumber(
      c2x,
      ax,
    )} ${safeNumber(c2y, ay)}, ${cx} ${cy}`;

    path.setAttribute("d", d);
    lastD.current = d;
    if (hi) hi.setAttribute("d", d);

    if (clip) {
      clip.style.transform = `translate(${cx}px, ${cy}px) rotate(${rot * 0.5}deg)`;
    }
  }

  /* ---- pointer handlers ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const s = phys.current;
    s.dragging = true;
    const ax = stage.left + stage.width / 2;
    const ay = stage.top + 4 + ROPE_REST;
    s.pointerX = e.clientX - ax;
    s.pointerY = e.clientY - ay;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = phys.current;
    if (!s.dragging) return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const ax = stage.left + stage.width / 2;
    const ay = stage.top + 4 + ROPE_REST;
    s.pointerX = e.clientX - ax;
    s.pointerY = e.clientY - ay;
  };

  const endDrag = (e: React.PointerEvent) => {
    const s = phys.current;
    s.dragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    document.body.style.userSelect = "";
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      const s = phys.current;
      s.x = s.y = s.vx = s.vy = s.rot = s.avel = 0;
    }
  };

  return (
    <div ref={stageRef} className="relative -mt-6 mb-2 w-full" style={{ height: STAGE_H }}>
      {/* anchor dot */}
      <div className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-[#161616] shadow" />

      {/* reactive lanyard (above the card so it can never be covered, below the clip) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 9, overflow: "visible" }}
      >
        {/* main strap — solid color (no fragile gradient id reference) */}
        <path
          ref={ropePathRef}
          d="M 280 4 C 280 50, 280 73, 280 96"
          fill="none"
          stroke="#161616"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* subtle highlight on top for depth */}
        <path
          ref={ropeHiRef}
          d="M 280 4 C 280 50, 280 73, 280 96"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* clip + ring positioned at rope end */}
      <div
        ref={clipRef}
        className="absolute left-0 top-0 z-[11]"
        style={{ transform: `translate(${280}px, ${4 + ROPE_REST}px)` }}
      >
        <div className="flex -translate-x-1/2 flex-col items-center">
          <div className="h-5 w-5 rounded-full border-[3.5px] border-[#a0a0a4] shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
          <div className="-mt-2 h-4 w-2.5 rounded-b-full bg-gradient-to-b from-[#3a3a3a] to-[#0d0d0d] shadow" />
        </div>
      </div>

      {/* draggable card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 z-[8] cursor-grab touch-none active:cursor-grabbing"
        style={{
          top: 4 + ROPE_REST + CLIP_TO_CARD,
          marginLeft: -CARD_W / 2,
          width: CARD_W,
          willChange: "transform",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="img"
        aria-label={`Interactive ID badge for ${badgeProfile.name}. Drag to pull and swing it.`}
      >
        <BadgeCard />
      </div>
    </div>
  );
}

/* --------------------------------- card ----------------------------------- */

function BadgeCard() {
  return (
    <div
      className="relative flex flex-col items-center overflow-hidden rounded-[26px] border border-black/[0.05] bg-gradient-to-b from-white to-[#eef0f2] shadow-[0_2px_6px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.07)]"
      style={{ width: CARD_W, height: CARD_H }}
    >
      <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/15" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />

      <div className="mt-[52px] h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <div className="mt-6 px-5 text-center">
        <p className="text-[16px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-1.5 text-[11px] leading-snug text-inkTertiary">{badgeProfile.role}</p>
      </div>
    </div>
  );
}

/* Memoized so parent re-renders (e.g. hover, search typing) never reconcile
   the imperatively-set SVG path `d` back to its initial value. */
const HangingIDBadge = memo(HangingIDBadgeBase);
export default HangingIDBadge;
