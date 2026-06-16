export const DRIBBBLE_YEARS = [2026, 2025, 2024, 2023, 2022] as const;

export interface DesignItem {
  id: string;
  title: string;
  year: number;
  imageUrl?: string;
}

/**
 * Dribbble exploration items, shared between the desktop gallery window and the
 * mobile grid so the archive stays single-sourced. Image paths are verbatim.
 */
export const designItems: DesignItem[] = [
  // 2026 - Original
  { id: "1", title: "Account Settings", year: 2026, imageUrl: "/images/dribbble/ACCOUNT SETTINGS.png" },
  { id: "2", title: "Messages", year: 2026, imageUrl: "/images/dribbble/Messages.png" },
  { id: "3", title: "Suggestion History", year: 2026, imageUrl: "/images/dribbble/Suggestion History.png" },
  { id: "4", title: "View Event", year: 2026, imageUrl: "/images/dribbble/VIew Event.png" },

  // 2026 - New
  { id: "50", title: "Design 1", year: 2026, imageUrl: "/images/dribbble/1.png" },
  { id: "51", title: "Design 6", year: 2026, imageUrl: "/images/dribbble/6.png" },
  { id: "52", title: "Design 8", year: 2026, imageUrl: "/images/dribbble/8.png" },
  { id: "53", title: "Design 9", year: 2026, imageUrl: "/images/dribbble/9.png" },
  { id: "54", title: "Design 10", year: 2026, imageUrl: "/images/dribbble/10.png" },
  { id: "55", title: "Design 11", year: 2026, imageUrl: "/images/dribbble/11.png" },
  { id: "56", title: "Design 12", year: 2026, imageUrl: "/images/dribbble/12.png" },
  { id: "57", title: "Design 13", year: 2026, imageUrl: "/images/dribbble/13.png" },
  { id: "58", title: "Design 14", year: 2026, imageUrl: "/images/dribbble/14.png" },
  { id: "59", title: "Design 15", year: 2026, imageUrl: "/images/dribbble/15.png" },
  { id: "60", title: "Design 16", year: 2026, imageUrl: "/images/dribbble/16.png" },
  { id: "61", title: "Design 19", year: 2026, imageUrl: "/images/dribbble/19.png" },
  { id: "62", title: "Design 20", year: 2026, imageUrl: "/images/dribbble/20.png" },
  { id: "63", title: "Design 24", year: 2026, imageUrl: "/images/dribbble/24.png" },
  { id: "64", title: "Design 25", year: 2026, imageUrl: "/images/dribbble/25.png" },
  { id: "65", title: "Design 27", year: 2026, imageUrl: "/images/dribbble/27.png" },
  { id: "66", title: "Add Emails", year: 2026, imageUrl: "/images/dribbble/Add Emails.png" },
  { id: "67", title: "Additional Information 001", year: 2026, imageUrl: "/images/dribbble/Additional Information 001.png" },
  { id: "68", title: "Additional Information 003", year: 2026, imageUrl: "/images/dribbble/Additional Information 003.png" },
  { id: "69", title: "Additional Information 004", year: 2026, imageUrl: "/images/dribbble/Additional Information 004.png" },
  { id: "70", title: "Additional Information 4", year: 2026, imageUrl: "/images/dribbble/Additional Information 4.png" },
  { id: "71", title: "Additional Information 40", year: 2026, imageUrl: "/images/dribbble/Additional Information 40.jpg" },
  { id: "72", title: "Event Page", year: 2026, imageUrl: "/images/dribbble/Event Page.png" },
  { id: "73", title: "Notifications 99", year: 2026, imageUrl: "/images/dribbble/Notifications 99.png" },

  // 2025 - Original
  { id: "5", title: "Campaigns", year: 2025, imageUrl: "/images/dribbble/Campaigns.png" },
  { id: "6", title: "Classic Italian Carbonara", year: 2025, imageUrl: "/images/dribbble/Classic Italian Carbonara_ The Authentic Recipe.png" },
  { id: "7", title: "Complete Your Account", year: 2025, imageUrl: "/images/dribbble/Complete your account now.png" },
  { id: "8", title: "Confirm Identity", year: 2025, imageUrl: "/images/dribbble/Confirm your identity.png" },
  { id: "9", title: "Core AI", year: 2025, imageUrl: "/images/dribbble/Core Ai.png" },
  { id: "10", title: "Manual Journal Entry", year: 2025, imageUrl: "/images/dribbble/Create  Manual Journal Entry.png" },
  { id: "11", title: "Documents", year: 2025, imageUrl: "/images/dribbble/Documents.png" },
  { id: "12", title: "Journal Entries", year: 2025, imageUrl: "/images/dribbble/Journal  Entries.png" },
  { id: "13", title: "Messages", year: 2025, imageUrl: "/images/dribbble/Messages.png" },
  { id: "14", title: "More Options", year: 2025, imageUrl: "/images/dribbble/More dropdown 1.png" },
  { id: "15", title: "Publication Selection", year: 2025, imageUrl: "/images/dribbble/Publication selection.png" },

  // 2025 - New
  { id: "74", title: "Mock Up Designs", year: 2025, imageUrl: "/images/dribbble/Mock up designs .jpg" },
  { id: "75", title: "Notifications", year: 2025, imageUrl: "/images/dribbble/Notifications.jpg" },
  { id: "76", title: "Meet", year: 2025, imageUrl: "/images/dribbble/Meet.jpg" },
  { id: "77", title: "Personal Information 2", year: 2025, imageUrl: "/images/dribbble/Personal Infom 2.jpg" },
  { id: "78", title: "Portfolio V1", year: 2025, imageUrl: "/images/dribbble/Portfolio V1.png" },
  { id: "79", title: "Portfolio V1 Dark Mode", year: 2025, imageUrl: "/images/dribbble/Portfolio V1 - Dark Mode.png" },
  { id: "80", title: "Personal Information 3", year: 2025, imageUrl: "/images/dribbble/Personal Infom 3.jpg" },
  { id: "81", title: "Notifications Modal", year: 2025, imageUrl: "/images/dribbble/Notifications Modal.jpg" },
  { id: "82", title: "Poll Builder 2", year: 2025, imageUrl: "/images/dribbble/Poll Builder 2.jpg" },
  { id: "83", title: "Notifications 22", year: 2025, imageUrl: "/images/dribbble/Notifications 22.jpg" },
  { id: "84", title: "Onboarding Spaceet", year: 2025, imageUrl: "/images/dribbble/Onboarding - Spaceet.jpg" },
  { id: "85", title: "Set Up Deposit 2", year: 2025, imageUrl: "/images/dribbble/Set up an Automated Deposit 2.jpg" },
  { id: "86", title: "Player Profile", year: 2025, imageUrl: "/images/dribbble/Player Profile.jpg" },
  { id: "87", title: "Personal Information 1", year: 2025, imageUrl: "/images/dribbble/Personal Infom 1.jpg" },
  { id: "88", title: "MFB", year: 2025, imageUrl: "/images/dribbble/mfb.jpg" },
  { id: "89", title: "Personal Information", year: 2025, imageUrl: "/images/dribbble/Personal Information.jpg" },
  { id: "90", title: "Notifications 33", year: 2025, imageUrl: "/images/dribbble/Notifications 33.jpg" },
  { id: "91", title: "Web Nav 1", year: 2025, imageUrl: "/images/dribbble/Web Nav 1.jpg" },
  { id: "92", title: "Poll Builder 00", year: 2025, imageUrl: "/images/dribbble/Poll Builder 00.jpg" },

  // 2024
  { id: "16", title: "Chaincore Landing Page", year: 2024, imageUrl: "/images/dribbble/Chaincore - Landing Page.jpg" },
  { id: "17", title: "Dashboard & Analytics", year: 2024, imageUrl: "/images/dribbble/Dashboard & Analytics.jpg" },
  { id: "18", title: "Enter Amount", year: 2024, imageUrl: "/images/dribbble/Enter AMount.jpg" },
  { id: "19", title: "Home 1", year: 2024, imageUrl: "/images/dribbble/Home-1.jpg" },
  { id: "20", title: "Home", year: 2024, imageUrl: "/images/dribbble/Home.jpg" },
  { id: "21", title: "Design 1", year: 2024, imageUrl: "/images/dribbble/Image-1.png" },
  { id: "22", title: "Design 2", year: 2024, imageUrl: "/images/dribbble/Image-2.png" },
  { id: "23", title: "Design 3", year: 2024, imageUrl: "/images/dribbble/Image-3.png" },
  { id: "24", title: "Design 4", year: 2024, imageUrl: "/images/dribbble/Image-4.png" },
  { id: "25", title: "Design 5", year: 2024, imageUrl: "/images/dribbble/Image-5.png" },
  { id: "26", title: "Design 6", year: 2024, imageUrl: "/images/dribbble/Image-6.png" },
  { id: "27", title: "Design 7", year: 2024, imageUrl: "/images/dribbble/Image-7.png" },
  { id: "28", title: "Design", year: 2024, imageUrl: "/images/dribbble/Image.png" },
  { id: "29", title: "Individual Clients", year: 2024, imageUrl: "/images/dribbble/Individual Clients.jpg" },
  { id: "30", title: "Input Amount", year: 2024, imageUrl: "/images/dribbble/Input Amount.jpg" },
  { id: "31", title: "My Profile", year: 2024, imageUrl: "/images/dribbble/My Profile.jpg" },
  { id: "32", title: "Refer and Earn", year: 2024, imageUrl: "/images/dribbble/Refer and Earn.jpg" },
  { id: "33", title: "Send Money", year: 2024, imageUrl: "/images/dribbble/Send Money.png" },

  // 2023
  { id: "34", title: "About Us", year: 2023, imageUrl: "/images/dribbble/About us.jpg" },
  { id: "35", title: "Features", year: 2023, imageUrl: "/images/dribbble/Features.jpg" },
  { id: "36", title: "Hero Section", year: 2023, imageUrl: "/images/dribbble/Hero section.jpg" },
  { id: "37", title: "Home Page", year: 2023, imageUrl: "/images/dribbble/Home Page.jpg" },
  { id: "38", title: "Join The Community", year: 2023, imageUrl: "/images/dribbble/JOIN THE COMMUNITY.jpg" },
  { id: "39", title: "Peniel Day Hero", year: 2023, imageUrl: "/images/dribbble/Peniel Day Hero section.jpg" },
  { id: "40", title: "Rebank Hero", year: 2023, imageUrl: "/images/dribbble/Rebank Hero section.jpg" },
  { id: "41", title: "Superrare Hero", year: 2023, imageUrl: "/images/dribbble/Superrare Hero section.jpg" },

  // 2022 placeholders
  { id: "42", title: "Knit", year: 2022 },
  { id: "43", title: "Collaboration Tool", year: 2022 },
  { id: "44", title: "Music App", year: 2022 },
  { id: "45", title: "Health Tracker", year: 2022 },
];
