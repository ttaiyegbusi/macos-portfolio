/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        windowBody: "#F1F1F1",
        chrome: "#F6F6F6",
        panel: "#FFFFFF",
        borderLight: "#EDEDED",
        borderSubtle: "#E6E6E6",
        borderFaint: "#F0F0F0",
        iconMuted: "#D8D8D8",
        iconSoft: "#B5B5B5",
        ink: "#020202",
        inkStrong: "#0A0D14",
        inkSecondary: "#5D5E64",
        inkMuted: "#8A8D95",
        inkTertiary: "#A8A8A8",
        inkFaint: "#C1C1C1",
        ctlClose: "#EA6B65",
        ctlMin: "#F3BF52",
        ctlMax: "#5EC550",
      },
      boxShadow: {
        window: "0 28px 70px rgba(0,0,0,0.10), 0 6px 18px rgba(0,0,0,0.05)",
        panel: "0 1px 2px rgba(0,0,0,0.025), 0 8px 24px rgba(0,0,0,0.025)",
        card: "0 1px 2px rgba(0,0,0,0.03)",
        dock: "inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -1px 0 rgba(255,255,255,0.22), 0 10px 26px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        window: "10px",
        panel: "6px",
        card: "8px",
      },
    },
  },
  plugins: [],
};
