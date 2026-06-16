export interface BackgroundOption {
  id: string;
  name: string;
  css: string;
  isDark?: boolean;
}

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: "mint-air",
    name: "Mint Air",
    css: `url("/wallpaper.jpg") center / cover no-repeat`,
  },
  {
    id: "coral-bloom",
    name: "Coral Bloom",
    css: `linear-gradient(135deg, #fbc2eb 0%, #f9a8a8 40%, #fccf94 100%)`,
  },
  {
    id: "periwinkle",
    name: "Periwinkle",
    css: `linear-gradient(160deg, #a8c0ff 0%, #c3b1e1 50%, #fbc8d4 100%)`,
  },
  {
    id: "spring-glow",
    name: "Spring Glow",
    css: `linear-gradient(135deg, #d4fc79 0%, #96e6a1 50%, #84fab0 100%)`,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    css: `linear-gradient(160deg, #f6d365 0%, #fda085 60%, #f093fb 100%)`,
  },
  {
    id: "sky-candy",
    name: "Sky Candy",
    css: `linear-gradient(160deg, #89f7fe 0%, #66a6ff 100%)`,
  },
  {
    id: "frost",
    name: "Frost",
    css: `linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #dce8f8 100%)`,
  },
  {
    id: "petal-swirl",
    name: "Petal Swirl",
    css: `linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)`,
  },
  {
    id: "grape-soda",
    name: "Grape Soda",
    css: `linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)`,
  },
  {
    id: "aqua-splash",
    name: "Aqua Splash",
    css: `linear-gradient(160deg, #43e97b 0%, #38f9d7 100%)`,
  },
  {
    id: "lavender-marble",
    name: "Lavender Marble",
    css: `linear-gradient(135deg, #e9defc 0%, #c2a8ff 52%, #9f86f0 100%)`,
  },
  {
    id: "sunset-ribbon",
    name: "Sunset Ribbon",
    css: `linear-gradient(135deg, #f5af19 0%, #f12711 50%, #c0392b 100%)`,
  },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;
