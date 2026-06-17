export interface ProjectSection {
  id: string;
  label: string;
  title: string;
  /** paragraphs of body copy */
  content: string[];
  image?: string;
}

export interface ProjectCaseStudy {
  id: string;
  /** must match the sidebar page name so a click can resolve the right project */
  pageName: string;
  /** shown in the modal title bar */
  windowTitle: string;
  title: string;
  category: string;
  platforms: string[];
  year: string;
  heroImage?: string;
  heroTone: string;
  sections: ProjectSection[];
}

export const PROJECTS_BY_PAGE: Record<string, ProjectCaseStudy> = {
  Reeple: {
    id: "reeple",
    pageName: "Reeple",
    windowTitle: "Reeple",
    title: "Transforming Remittances & Payments for Nigerians and African Freelancers",
    category: "Product Design",
    platforms: ["Mobile App", "Web App", "Website"],
    year: "2024",
    heroImage: "/images/projects/reeple-canvas.jpg",
    heroTone: "linear-gradient(135deg, #f0628f 0%, #c177e8 30%, #a86df0 55%, #6f8af2 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Reeple is a remittance and payments platform built for Nigerians abroad and African freelancers who need a faster, more transparent way to move money home.",
          "I led product design end to end, from early research through the shipped mobile and web experience, working closely with engineering to keep the scope realistic for a small team.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction - More Than Just a Money Transfer",
        content: [
          "For millions of Nigerians abroad, sending money home is not just a financial necessity, it is a connection to family, culture, and responsibility. Remittances help pay for essentials like school fees, healthcare, and household expenses.",
          "In 2022 alone, Nigeria received over $20 billion in remittances, yet the process remains expensive, slow, and often unclear, leaving users frustrated. Many existing platforms lack transparency, charge high fees, and delay transactions, creating uncertainty for both senders and recipients.",
        ],
      },
      {
        id: "hidden-struggle",
        label: "Hidden Struggle",
        title: "The Hidden Struggle of African Freelancers",
        content: [
          "Alongside remittance senders, African freelancers working with international clients face a parallel problem. Payments arrive late, get stuck in compliance checks, or lose significant value to conversion fees before they ever reach a local bank account.",
          "We heard the same complaint from almost every freelancer we spoke to: they could not predict how much money they would actually receive, or when. That unpredictability made it hard to plan around rent, savings, or reinvesting in their work.",
        ],
      },
      {
        id: "research",
        label: "Research",
        title: "Research",
        content: [
          "I ran structured interviews with twenty two participants split across three groups: diaspora senders, local recipients, and freelancers being paid from abroad. The goal was to map the emotional and practical friction at each step of a transfer.",
          "Three patterns came up consistently: people wanted to see fees before committing to a transfer, they wanted a clear status they could trust, and they wanted the option to move between fiat and stable-value balances without leaving the app.",
        ],
      },
      {
        id: "mobile-app",
        label: "Mobile App",
        title: "Mobile App",
        content: [
          "The mobile app became the primary surface for everyday use. The home screen surfaces account balances, credit details, and a send-money panel without requiring the user to dig through menus.",
          "Sending money was reduced to three steps: pick a recipient, confirm the amount and fee, and authorize. Every fee is shown up front in the currency the user actually understands, before any commitment is made.",
        ],
      },
      {
        id: "design-system",
        label: "Design System",
        title: "Design System",
        content: [
          "I built a lightweight component library so the team could ship new flows quickly without redesigning primitives every time. Typography, spacing, and color tokens were documented in Figma with usage notes for engineering.",
          "Color was used deliberately: a warm gradient identity for marketing and onboarding moments, paired with a calmer, more neutral palette for anything involving money so the numbers always read as trustworthy rather than playful.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "The redesigned flow cut the average time to complete a transfer significantly compared to the original prototype, and qualitative feedback from the beta group consistently mentioned the upfront fee display as the most reassuring change.",
          "Reeple is still evolving, but the core bet, that transparency builds trust faster than speed alone, held up well across every round of testing.",
        ],
      },
    ],
  },
  Turbopay: {
    id: "turbopay",
    pageName: "Turbopay",
    windowTitle: "Turbopay",
    title: "The Fastest Way to Receive Money and Pay for Bills",
    category: "Product Design",
    platforms: ["Mobile App"],
    year: "2024",
    heroImage: "/images/projects/turbopay-canvas.jpg",
    heroTone: "linear-gradient(135deg, #2b2b2b 0%, #404040 35%, #4d4d4d 65%, #5a5a5a 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "TurboPay is a mobile payments app designed for everyday transactions in Nigeria, built to work for people with reliable internet and people without it.",
          "My role covered product strategy and UI design, with a strong focus on making the experience feel instant even on inconsistent networks.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "In Nigeria, where inconsistent internet access and complex digital platforms exclude many, TurboPay offers an inclusive solution. It combines USSD functionality for offline users with an app-based experience for those with internet access, ensuring seamless and secure transactions.",
          "TurboPay empowers individuals and merchants, simplifying payments and bridging the gap between accessibility and convenience in the digital payment landscape.",
        ],
      },
      {
        id: "mobile-app-1",
        label: "Mobile App",
        title: "Designing for Two Realities",
        content: [
          "Rather than treating USSD as a fallback, I designed the app and USSD flows side by side from the start, so neither felt like an afterthought. The same mental model, the same order of steps, carries across both.",
          "On the app side, the home screen leads with the balance and two clear actions, add cash and send cash, so the most common tasks never require more than one tap to start.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "TurboPay is a cutting-edge payment solution developed to simplify and revolutionize how people manage their finances. It enables users to send and receive money instantly using just a phone number, with no need to memorize account details.",
          "Bill payments, airtime, and data top ups live one tap away from the home screen, recognizing that those are the transactions people repeat most often and the ones where friction is felt the most.",
        ],
      },
      {
        id: "mobile-app-2",
        label: "Mobile App",
        title: "Transaction History & Trust",
        content: [
          "Every transaction is timestamped and tagged with a clear status, so users never have to wonder whether a payment went through. This mattered enormously in interviews, where unclear transaction states were the single biggest source of anxiety.",
          "We kept the activity feed dense but scannable, prioritizing recency and status color over decorative detail.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Early users reported that the offline USSD flow felt just as fast as the app, which was the outcome we were optimizing for. Trust in the product grew once people realized it worked the same way regardless of their connection.",
          "TurboPay continues to expand into new bill categories, with the original two-reality design principle still guiding every addition.",
        ],
      },
    ],
  },
  Knit: {
    id: "knit",
    pageName: "Knit",
    windowTitle: "Knit",
    title: "A Lightweight Design Tool Built for Fast-Moving Teams",
    category: "Product Design",
    platforms: ["Web App"],
    year: "2023",
    heroTone: "linear-gradient(135deg, #dfe7ff 0%, #f4eaff 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Knit is a concept for a lightweight design tool aimed at small product teams who find full-scale design software heavier than they need for quick wireframes and shared file structure.",
          "I explored the core file and page model, then designed the primary editing surface and the sidebar navigation that organizes a project's files and pages.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Most design tools optimize for power, which is right for large teams but creates a steep ramp for smaller ones. Knit starts from the opposite end: what is the smallest set of concepts a team actually needs to organize their work and move fast.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "Smaller teams kept describing the same frustration: their actual design files were simple, but the software around them was not. Finding the right page, understanding who changed what, and onboarding a new teammate all took longer than the design work itself.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "Knit organizes everything around two ideas: a file, and the pages inside it. The sidebar keeps both visible at once, with a search action that surfaces any page in two keystrokes rather than several clicks through nested folders.",
          "The canvas itself stays close to familiar conventions, frames, layers, simple components, but trims anything that exists mainly to support enterprise-scale teams.",
        ],
      },
      {
        id: "design-system",
        label: "Design System",
        title: "Design System",
        content: [
          "Because Knit is meant to feel calm rather than dense, the interface uses a restrained palette, soft borders, and a single accent color reserved for active states. Every panel was designed to recede so the user's own work stays the visual focus.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Knit remains an exploration rather than a shipped product, but it sharpened my thinking about how much complexity a tool actually needs to earn its place in someone's daily workflow.",
        ],
      },
    ],
  },
  icametoo: {
    id: "icametoo",
    pageName: "icametoo",
    windowTitle: "icametoo",
    title: "Helping People Find Out What's Actually Happening Nearby",
    category: "Product Design",
    platforms: ["Mobile App"],
    year: "2023",
    heroTone: "linear-gradient(135deg, #0a0d14 0%, #181c26 35%, #232834 65%, #2a2f3a 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "icametoo is an event discovery app concept built around a simple question: what is actually happening near me right now, and is it worth showing up for.",
          "I designed the core discovery feed, event detail screens, and the social proof patterns that help people decide whether to attend.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Event listings exist everywhere, but most of them are static and impersonal. icametoo started from the idea that what makes someone actually go to an event is seeing that people they recognize, or people like them, are going too.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "Most discovery apps show a flat list of events with little signal about quality or relevance. Users told us they ignored most listings entirely and relied on word of mouth instead, which meant great events with weak marketing got skipped.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "The feed leads with social signal, who is going, who has been to similar events before, rather than raw event metadata. Event cards are deliberately compact so browsing feels closer to scrolling a feed than searching a directory.",
          "Saving an event surfaces it again as the date approaches, with a lightweight reminder that respects notification fatigue instead of escalating it.",
        ],
      },
      {
        id: "mobile-app",
        label: "Mobile App",
        title: "Mobile App",
        content: [
          "The bottom navigation keeps discovery, saved events, and profile one tap apart. Dark surfaces were chosen deliberately, most usage happens in the evening when people are deciding what to do that night.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "icametoo remains a personal exploration, but it shaped how I think about designing for spontaneous decisions, where the right signal at the right moment matters more than completeness of information.",
        ],
      },
    ],
  },
  "Football booth": {
    id: "football-booth",
    pageName: "Football booth",
    windowTitle: "Football Booth",
    title: "A Social Hub for Football Fans Built Around Live Match Moments",
    category: "Product Design",
    platforms: ["Mobile App", "Web App"],
    year: "2024",
    heroTone: "linear-gradient(135deg, #0e2a14 0%, #15351c 35%, #1a4023 65%, #1d4a28 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Football Booth is a social networking concept for football fans, designed around the moments that actually happen during a live match rather than generic post-match discussion.",
          "I designed the live match hub, the reaction and commentary patterns, and the layout system used across the mobile and web surfaces.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Football fans already react to matches in real time, just scattered across group chats, Twitter, and forums. Football Booth asks what a purpose-built home for that reaction would look like if it were designed from scratch.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "General social platforms bury football conversation in noise, and dedicated football apps tend to feel like static scoreboards with comments bolted on. Neither captures the energy of watching a match with friends.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "The match hub keeps score, time, and a live reaction stream in one view, so the emotional pulse of the match is always visible alongside the facts. Reactions are lightweight by design, quick taps and short bursts rather than long-form posts, to match how people actually behave while watching.",
        ],
      },
      {
        id: "mobile-app",
        label: "Mobile App",
        title: "Mobile App",
        content: [
          "On mobile, the live hub is the default landing screen during an active match, with a deep green palette chosen to evoke the pitch without competing with broadcast footage if the user is watching alongside the app.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Football Booth is an ongoing concept. The live-moment-first structure became the throughline for every later decision, from notification timing to how stats are surfaced during, rather than after, a match.",
        ],
      },
    ],
  },
  "Chain Core": {
    id: "chain-core",
    pageName: "Chain Core",
    windowTitle: "Chain Core",
    title: "Making Web3 Portfolio Tracking Feel Like a Normal Dashboard",
    category: "Product Design",
    platforms: ["Web App"],
    year: "2023",
    heroTone: "linear-gradient(135deg, #b6dfeb 0%, #3099de 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Chain Core is a web3 dashboard concept built to make wallet and portfolio tracking feel as approachable as a traditional finance dashboard, without hiding the parts that make crypto different.",
          "I designed the dashboard layout, the asset breakdown views, and the data visualization patterns used throughout.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Most web3 dashboards either over-explain blockchain mechanics or assume deep familiarity and offer no onboarding at all. Chain Core aimed for a middle ground: familiar dashboard conventions, with just enough context where it actually helps.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "Tracking assets across multiple wallets and chains usually means juggling several tools, each with its own visual language and level of trust. Users wanted one place to see everything without re-learning an interface for every chain.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "The dashboard groups holdings by value and by chain, with a simple bar visualization that prioritizes relative scale over precise numbers at a glance. Anything that requires a decision, like approving a transaction, gets pulled into a clearly separated panel rather than blended into the browsing experience.",
        ],
      },
      {
        id: "design-system",
        label: "Design System",
        title: "Design System",
        content: [
          "Color was used functionally rather than decoratively, a consistent blue family for primary data, with status colors reserved strictly for confirmations, warnings, and pending states so they never compete with the data itself.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Chain Core remains a design exploration, but it clarified a personal point of view: web3 interfaces do not need a new visual language, they need the same clarity bar as any serious financial product, applied honestly.",
        ],
      },
    ],
  },
  Wiremoney: {
    id: "wiremoney",
    pageName: "Wiremoney",
    windowTitle: "Wiremoney",
    title: "A Calmer Way to Hold and Move Money Across Currencies",
    category: "Product Design",
    platforms: ["Mobile App", "Web App", "Website"],
    year: "2024",
    heroImage: "/images/projects/wiremoney-canvas.jpg",
    heroTone: "linear-gradient(135deg, #0a4d52 0%, #0e6b73 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Wiremoney is a multi-currency account platform built for people who hold, receive, or move money across borders regularly, freelancers, remote workers, and small businesses with international clients.",
          "I designed the account dashboard, the currency breakdown view, and the onboarding flow that gets a new user verified without feeling like a compliance form.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Holding multiple currencies usually means juggling multiple apps, each with its own login, its own fees, and its own idea of what a clear balance looks like. Wiremoney starts from a simpler premise: one account, every currency you actually use, one consistent view.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "Users told us the hardest part was not converting money, it was knowing what they actually had at any given moment. Balances were scattered, exchange rates were buried, and account verification felt like a wall before they could do anything useful.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "The dashboard leads with a row of currency cards, each showing its balance in its own currency rather than a converted estimate, so nothing gets lost in translation. Verification is framed as unlocking privileges rather than a gate, with a visible progress indicator that turns a chore into a small sense of momentum.",
          "Quick links for the most common next actions, converting currency, paying a bill, requesting a cash pickup, sit directly below the accounts so the dashboard doubles as a launchpad rather than just a balance screen.",
        ],
      },
      {
        id: "design-system",
        label: "Design System",
        title: "Design System",
        content: [
          "A deep teal anchors the brand without tipping into the generic blue most fintech products default to. Status and availability badges, like the recurring \"Coming Soon\" tags, were designed to be honest about what is and isn't ready rather than hiding incomplete features.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Early testers consistently mentioned the per-currency balance view as the detail that made the product feel trustworthy, a small decision that ended up carrying a lot of the product's credibility.",
        ],
      },
    ],
  },
  Myrentease: {
    id: "myrentease",
    pageName: "Myrentease",
    windowTitle: "Rentease",
    title: "Making Rent Payments and Property Management Feel Organized",
    category: "Product Design",
    platforms: ["Web App"],
    year: "2024",
    heroImage: "/images/projects/myrentease-canvas.jpg",
    heroTone: "linear-gradient(135deg, #2b3a8f 0%, #4d5fd1 100%)",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Overview",
        content: [
          "Rentease is a property and rent management dashboard built for landlords and agents juggling multiple properties, tenants, and payment schedules, often still tracked across spreadsheets and group chats.",
          "I designed the dashboard, the payment schedule view, and the verification flow that gets an account fully active.",
        ],
      },
      {
        id: "introduction",
        label: "Introduction",
        title: "Introduction",
        content: [
          "Rent collection in much of the market still runs informally, cash handovers, bank transfer screenshots, and memory. Rentease asks what that process looks like once it has a real system behind it without losing the relationships landlords have with their tenants.",
        ],
      },
      {
        id: "problem",
        label: "Problem Statement",
        title: "Problem Statement",
        content: [
          "Landlords and agents described the same recurring problem: knowing who had paid, who hadn't, and what was coming due required mentally reconstructing a timeline from scattered messages and paper records, every single month.",
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Solution",
        content: [
          "The dashboard opens with the current rent status front and center, paid or pending, amount, and expiry date, so the most urgent question is answered before any scrolling. A payment schedule table below it lays out every property, tenant, and due date in one consistent format instead of a dozen different ones.",
          "Verification follows the same honest-progress pattern as the rest of the product: a visible percentage and a single clear action, rather than a long form with no sense of how close you are to done.",
        ],
      },
      {
        id: "design-system",
        label: "Design System",
        title: "Design System",
        content: [
          "An indigo-blue identity was chosen to feel institutional and trustworthy without reading as cold, appropriate for a product handling other people's rent money. Status pills (active, pending, overdue) use color sparingly and consistently so they're scannable at a glance across a long list of properties.",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        title: "Outcome",
        content: [
          "Rentease remains a design exploration, but it reinforced a pattern I keep coming back to: when a product replaces an informal, trust-based process, the interface's first job is to earn that same trust before it earns anything else.",
        ],
      },
    ],
  },
};

export const PROJECT_PAGE_NAMES = Object.keys(PROJECTS_BY_PAGE);
