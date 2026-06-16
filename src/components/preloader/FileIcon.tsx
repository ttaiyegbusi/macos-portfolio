interface FileIconProps {
  size?: number;
  className?: string;
}

/**
 * Light, line-style document glyph with a folded top corner — mirrors the
 * macOS copy-dialog file icon from the reference, kept calm and gray.
 */
export default function FileIcon({ size = 38, className }: FileIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 4.5A3.5 3.5 0 0 1 8.5 1h17.4a3.5 3.5 0 0 1 2.47 1.02l8.1 8.06A3.5 3.5 0 0 1 37.5 12.6V43.5A3.5 3.5 0 0 1 34 47H8.5A3.5 3.5 0 0 1 5 43.5V4.5Z"
        fill="#FCFCFD"
        stroke="#C9CACE"
        strokeWidth="1.7"
      />
      <path
        d="M25.5 1.6V8.5A3.5 3.5 0 0 0 29 12h6.6"
        stroke="#C9CACE"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
