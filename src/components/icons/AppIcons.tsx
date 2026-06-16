/* Dock app icons, drawn to echo the screenshot's icon set. */

export function FinderIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="finderL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9BDBFF" />
          <stop offset="1" stopColor="#5FBDF6" />
        </linearGradient>
        <linearGradient id="finderR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3FA9F5" />
          <stop offset="1" stopColor="#1B7FE0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#finderL)" />
      <path d="M33.5 2H48a14 14 0 0 1 14 14v32a14 14 0 0 1-14 14H33.2c4.4-5.6 7.6-13 8.3-20.7h6.3a2.3 2.3 0 0 0 0-4.6h-6.2C41.4 27 38.4 9.4 33.5 2Z" fill="url(#finderR)" />
      <path
        d="M33.5 2c-5 7.8-8 17-8.4 26.7 0 3.5.2 7 .8 10.3.9 6 3.2 12.6 7.3 18M20 22v8M44 22v8"
        fill="none"
        stroke="#0B3E66"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M17 42c4.6 3.6 10 5.4 15.6 5.4 5.5 0 10.9-1.8 14.4-5.4" fill="none" stroke="#0B3E66" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ProjectsIcon() {
  // Launchpad-style glass grid of colorful app dots
  const dots = [
    "#FF6259", "#FFB340", "#FFD426",
    "#30D158", "#40C8E0", "#3D82F7",
    "#BF5AF2", "#FF6482", "#A8A8AC",
  ];
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="lpBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="1" stopColor="rgba(235,238,242,0.92)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#lpBg)" stroke="rgba(255,255,255,0.9)" />
      {dots.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return <circle key={i} cx={18 + col * 14} cy={18 + row * 14} r="5" fill={c} />;
      })}
    </svg>
  );
}

export function FigmaIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <g transform="translate(13 4) scale(1)">
        <g transform="scale(0.98)">
          <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
          <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
          <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
          <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
          <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
        </g>
      </g>
    </svg>
  );
}

export function NotesIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="notesTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE067" />
          <stop offset="1" stopColor="#FFCE3F" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#FFFFFF" />
      <path d="M2 16h60v32a14 14 0 0 1-14 14H16A14 14 0 0 1 2 48V16Z" fill="#FBFBF9" />
      <path d="M16 2h32a14 14 0 0 1 14 14v3H2v-3A14 14 0 0 1 16 2Z" fill="url(#notesTop)" />
      <circle cx="14" cy="10.5" r="1.7" fill="#C99A1A" opacity="0.85" />
      <circle cx="22" cy="10.5" r="1.7" fill="#C99A1A" opacity="0.85" />
      <circle cx="30" cy="10.5" r="1.7" fill="#C99A1A" opacity="0.85" />
      <circle cx="38" cy="10.5" r="1.7" fill="#C99A1A" opacity="0.85" />
      <circle cx="46" cy="10.5" r="1.7" fill="#C99A1A" opacity="0.85" />
      <line x1="12" y1="30" x2="52" y2="30" stroke="#DADADA" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="12" y1="39" x2="52" y2="39" stroke="#DADADA" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="12" y1="48" x2="38" y2="48" stroke="#DADADA" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function DribbbleIcon() {
  // Black outline basketball mark, like the screenshot
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <circle cx="32" cy="32" r="26" fill="#FDFDFD" stroke="#0A0D14" strokeWidth="4" />
      <path
        d="M13.5 22.5c8 4.6 17.6 7 24.8 7 4.6 0 8.9-.7 12.7-2.2M10 38.5c10.5-1 24.5 1.5 33.5 12.5M40 8.5c-7 7-12.5 21.5-13 47"
        fill="none"
        stroke="#0A0D14"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="binBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9CCD1" />
          <stop offset="0.2" stopColor="#EDEFF2" />
          <stop offset="0.5" stopColor="#B9BDC4" />
          <stop offset="0.8" stopColor="#E6E8EC" />
          <stop offset="1" stopColor="#C2C5CB" />
        </linearGradient>
      </defs>
      <path d="M18 18h28l-3 38a4 4 0 0 1-4 3.6H25a4 4 0 0 1-4-3.6L18 18Z" fill="url(#binBody)" opacity="0.92" />
      <ellipse cx="32" cy="17" rx="16" ry="4.6" fill="#9CA1A8" />
      <ellipse cx="32" cy="16.2" rx="16" ry="4.6" fill="#DFE2E6" />
      <ellipse cx="32" cy="16.2" rx="11.5" ry="3" fill="#74787F" />
      <path d="M24 24l1.6 30M32 24v30M40 24l-1.6 30" stroke="#8A8F96" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
