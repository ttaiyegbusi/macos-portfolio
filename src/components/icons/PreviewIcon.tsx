export default function PreviewIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prev-bg" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFDFD" />
          <stop offset="1" stopColor="#E4E7EC" />
        </linearGradient>
        <linearGradient id="prev-loupe" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4AA3FF" />
          <stop offset="1" stopColor="#2B7CE0" />
        </linearGradient>
      </defs>

      {/* Document body */}
      <path
        d="M11 3h17l9 9v30a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        fill="url(#prev-bg)"
        stroke="#D2D6DD"
        strokeWidth="0.6"
      />
      {/* Folded corner */}
      <path d="M28 3l9 9h-7a2 2 0 0 1-2-2V3Z" fill="#CDD2D9" />

      {/* Mini photo inside the doc */}
      <rect x="13" y="16" width="22" height="16" rx="2" fill="#EEF1F5" />
      <circle cx="18.5" cy="21" r="2" fill="#FBC02D" />
      <path d="M14 31l5.5-6 4 4 4-5 4.5 7H14Z" fill="#6FBF73" />

      {/* Magnifying loupe */}
      <circle cx="30" cy="30" r="9" fill="url(#prev-loupe)" stroke="#fff" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="5.5" fill="#BFE0FF" fillOpacity="0.55" />
      <rect
        x="35.5"
        y="35.5"
        width="9"
        height="4"
        rx="2"
        transform="rotate(45 35.5 35.5)"
        fill="#2B7CE0"
        stroke="#fff"
        strokeWidth="1"
      />
    </svg>
  );
}
