/* Tiny brand glyphs rendered with currentColor so they inherit the muted icon tones. */

export function XGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function DribbbleGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M5 8.4c3 1.7 6.6 2.6 9.3 2.6 1.7 0 3.3-.25 4.7-.8M3.9 14.4c4-.4 9.2.6 12.6 4.7M15 3.4c-2.6 2.6-4.7 8-4.9 17.4" strokeLinecap="round" />
    </svg>
  );
}

export function MediumGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="6.77" cy="12" rx="6.77" ry="6.92" />
      <ellipse cx="17.61" cy="12" rx="3.23" ry="6.5" />
      <ellipse cx="22.85" cy="12" rx="1.15" ry="5.77" />
    </svg>
  );
}

export function TwitterBirdGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 4.94c-.8.36-1.67.6-2.58.7a4.52 4.52 0 0 0 1.98-2.49 9 9 0 0 1-2.86 1.1A4.5 4.5 0 0 0 11.8 8a4.6 4.6 0 0 0 .12 1.03A12.78 12.78 0 0 1 2.64 4.3a4.5 4.5 0 0 0 1.4 6.01 4.46 4.46 0 0 1-2.04-.56v.06a4.5 4.5 0 0 0 3.61 4.41 4.52 4.52 0 0 1-2.03.08 4.51 4.51 0 0 0 4.2 3.13A9.04 9.04 0 0 1 1.1 19.3a12.75 12.75 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.84l-.01-.58A9.18 9.18 0 0 0 23 4.94Z" />
    </svg>
  );
}

export function LinkedInGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}
