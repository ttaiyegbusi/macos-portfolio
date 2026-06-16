export default function ProjectPageIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="proj-bg" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDFDFD" />
          <stop offset="1" stopColor="#E4E7EC" />
        </linearGradient>
        <linearGradient id="proj-accent" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8A6CF0" />
          <stop offset="1" stopColor="#5B3FD6" />
        </linearGradient>
      </defs>

      {/* Document body */}
      <path
        d="M11 3h17l9 9v30a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        fill="url(#proj-bg)"
        stroke="#D2D6DD"
        strokeWidth="0.6"
      />
      {/* Folded corner */}
      <path d="M28 3l9 9h-7a2 2 0 0 1-2-2V3Z" fill="#CDD2D9" />

      {/* Title bar */}
      <rect x="12" y="14" width="20" height="2.4" rx="1.2" fill="#C7CBD2" />
      <rect x="12" y="19" width="13" height="2" rx="1" fill="#DBDEE3" />

      {/* Case-study section block (the "page" content) */}
      <rect x="12" y="25" width="24" height="14" rx="2.4" fill="url(#proj-accent)" />
      <rect x="15" y="28.5" width="11" height="1.8" rx="0.9" fill="white" fillOpacity="0.85" />
      <rect x="15" y="32" width="16" height="1.4" rx="0.7" fill="white" fillOpacity="0.55" />
      <rect x="15" y="34.6" width="16" height="1.4" rx="0.7" fill="white" fillOpacity="0.55" />
    </svg>
  );
}
