export interface DesignShot {
  id: string;
  title: string;
  year: number;
  fileName: string;
  imageUrl: string;
  description?: string;
  type?: "jpg" | "png" | "figma" | "case-study";
}

export const designShots: DesignShot[] = [
  // 2026
  {
    id: "clockin-app-2026",
    title: "Clockin App",
    year: 2026,
    fileName: "clockin-app.jpg",
    imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description: "Time tracking application design",
    type: "case-study",
  },
  {
    id: "dashboard-2026",
    title: "Dashboard Design",
    year: 2026,
    fileName: "dashboard-2026.jpg",
    imageUrl: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description: "Analytics dashboard interface",
    type: "case-study",
  },
  {
    id: "mobile-exploration-2026",
    title: "Mobile Exploration",
    year: 2026,
    fileName: "mobile-exploration.jpg",
    imageUrl: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    description: "Mobile app interaction design",
    type: "case-study",
  },
  {
    id: "design-system-2026",
    title: "Design System",
    year: 2026,
    fileName: "design-system.jpg",
    imageUrl: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    description: "Component library and design tokens",
    type: "case-study",
  },

  // 2025
  {
    id: "football-booth-2025",
    title: "Football Booth",
    year: 2025,
    fileName: "football-booth-2025.jpg",
    imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    description: "Sports social platform design",
    type: "case-study",
  },
  {
    id: "task-management-2025",
    title: "Task Management",
    year: 2025,
    fileName: "task-management.jpg",
    imageUrl: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    description: "Productivity tool interface",
    type: "case-study",
  },
  {
    id: "landing-page-2025",
    title: "Landing Page",
    year: 2025,
    fileName: "landing-page-2025.jpg",
    imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    description: "Marketing landing page design",
    type: "case-study",
  },
  {
    id: "mobile-app-2025",
    title: "Mobile App",
    year: 2025,
    fileName: "mobile-app-2025.jpg",
    imageUrl: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
    description: "Cross-platform mobile design",
    type: "case-study",
  },

  // 2024
  {
    id: "icametoo-2024",
    title: "icametoo",
    year: 2024,
    fileName: "icametoo-2024.jpg",
    imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description: "Event discovery platform",
    type: "case-study",
  },
  {
    id: "keyboard-app-2024",
    title: "Keyboard App",
    year: 2024,
    fileName: "keyboard-app.jpg",
    imageUrl: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description: "Custom keyboard design exploration",
    type: "case-study",
  },
  {
    id: "chain-core-2024",
    title: "Chain Core",
    year: 2024,
    fileName: "chain-core.jpg",
    imageUrl: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    description: "Web3 dashboard interface",
    type: "case-study",
  },
  {
    id: "portfolio-concept-2024",
    title: "Portfolio Concept",
    year: 2024,
    fileName: "portfolio-concept.jpg",
    imageUrl: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    description: "Portfolio website design",
    type: "case-study",
  },

  // 2023
  {
    id: "saas-platform-2023",
    title: "SaaS Platform",
    year: 2023,
    fileName: "saas-platform.jpg",
    imageUrl: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    description: "Software as a service interface",
    type: "case-study",
  },
  {
    id: "fintech-app-2023",
    title: "Fintech App",
    year: 2023,
    fileName: "fintech-app.jpg",
    imageUrl: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    description: "Financial application design",
    type: "case-study",
  },
  {
    id: "social-network-2023",
    title: "Social Network",
    year: 2023,
    fileName: "social-network.jpg",
    imageUrl: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    description: "Social platform exploration",
    type: "case-study",
  },
  {
    id: "ecommerce-2023",
    title: "E-commerce",
    year: 2023,
    fileName: "ecommerce-2023.jpg",
    imageUrl: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
    description: "Online shopping experience",
    type: "case-study",
  },

  // 2022
  {
    id: "knit-2022",
    title: "Knit",
    year: 2022,
    fileName: "knit-2022.jpg",
    imageUrl: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description: "Design tool exploration",
    type: "case-study",
  },
  {
    id: "collaboration-tool-2022",
    title: "Collaboration Tool",
    year: 2022,
    fileName: "collaboration-tool.jpg",
    imageUrl: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description: "Team workspace interface",
    type: "case-study",
  },
  {
    id: "music-app-2022",
    title: "Music App",
    year: 2022,
    fileName: "music-app.jpg",
    imageUrl: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    description: "Audio streaming application",
    type: "case-study",
  },
  {
    id: "health-tracker-2022",
    title: "Health Tracker",
    year: 2022,
    fileName: "health-tracker.jpg",
    imageUrl: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    description: "Fitness and wellness app",
    type: "case-study",
  },
];

export const YEARS = [2026, 2025, 2024, 2023, 2022];
