/** iOS-style Settings icon — a gear on a soft gray gradient tile. */
export default function SettingsIcon() {
  const teeth = Array.from({ length: 12 }).map((_, i) => i * 30);
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="setBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8D9DD" />
          <stop offset="1" stopColor="#A9ABB2" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#setBg)" />
      <g transform="translate(32 32)" fill="#F4F4F6">
        {teeth.map((deg) => (
          <rect key={deg} x="-2.4" y="-21" width="4.8" height="9" rx="1.6" transform={`rotate(${deg})`} />
        ))}
        <circle r="14.5" />
      </g>
      <circle cx="32" cy="32" r="6.5" fill="#A9ABB2" />
    </svg>
  );
}
