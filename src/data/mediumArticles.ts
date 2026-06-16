export interface MediumArticle {
  id: string;
  title: string;
  subtitle: string;
  source: "Medium";
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  bodyPreview?: string[];
  url: string;
}

export const mediumArticles: MediumArticle[] = [
  {
    id: "taste-subjectivity",
    title: "The Subjectivity of Taste",
    subtitle: "What makes a design bad, good, or truly exceptional?",
    source: "Medium",
    date: "Jan 17, 2026",
    readTime: "3 min read",
    tags: ["UX Design", "Taste", "UI", "UX", "Design"],
    excerpt:
      "I often find myself returning to a deceptively simple question: what makes a design bad, good, or truly exceptional? Is it the quality of the decisions a designer makes? Is it the cultural background that shapes those decisions? Or is it collective validation, acceptance by a community, an industry, or even a perceived global standard?",
    bodyPreview: [
      "There is no single, definitive metric. And that is precisely the point.",
      "Taste, especially in design, is deeply subjective. What is celebrated in one context may feel misplaced or even uncomfortable in another. A design that resonates strongly within one community can fail entirely outside of it. Rather than treating this as a flaw, I believe it is something designers must consciously understand and work with.",
      "In practice, I believe taste tends to be shaped by three overlapping perspectives: culture, global standards, and general acceptance within creative communities.",
    ],
    url: "https://medium.com/@aiyegbusitope/the-subjectivity-of-taste-042245935382",
  },
  {
    id: "ai-design-workflow",
    title: "7 Things You Need to Know When Incorporating AI Into Your Design Workflow",
    subtitle: "Lessons from intentionally building AI into a design process",
    source: "Medium",
    date: "Feb 7, 2026",
    readTime: "6 min read",
    tags: ["AI", "Design", "UI Design"],
    excerpt:
      "In this evolving tech industry, one truth has become undeniable: those who refuse to integrate AI into their workflows risk becoming irrelevant in the very industries they occupy.",
    bodyPreview: [
      "The reality is, AI is not just a tool of convenience, it is becoming an essential force driving creativity, innovation, and efficiency. Recently, I have immersed myself in exploring how AI can enhance my design workflow, and I can confidently say it has been a transformative journey.",
      "At my workplace, we are constantly encouraged to utilize AI whenever possible, and I have seen firsthand how it can elevate my work. But integrating AI is not as simple as just using a tool, it requires a shift in how we think about creativity, productivity, and problem-solving.",
      "It starts with context. It is vital for the AI model to fully understand what you want it to accomplish from your perspective, so giving it the full context of your project is one of the most crucial steps in working with it.",
    ],
    url: "https://medium.com/design-bootcamp/7-things-you-need-to-know-when-incorporating-ai-into-your-design-workflow-dbe1c6a4d353",
  },
  {
    id: "develop-taste-ai",
    title: "How Designers Can Develop Good Taste Using Artificial Intelligence",
    subtitle: "In an era of abundant tools, taste is the differentiator",
    source: "Medium",
    date: "Jan 3, 2026",
    readTime: "4 min read",
    tags: ["UX Design", "UI Design", "AI", "Taste"],
    excerpt:
      "In today's design landscape, capability is no longer rare. Almost everyone has access to powerful tools. Almost everyone can ship something that looks decent. Almost everyone can follow trends, copy styles, and use AI to generate layouts in seconds. Yet somehow, only a few products truly feel right.",
    bodyPreview: [
      "They resonate emotionally. They feel intentional. They feel human. That difference is taste, and in a world where AI is everywhere, taste is what will set designers apart.",
      "We are entering an era where AI is embedded in nearly every product and workflow. But when technology becomes abundant, emotion becomes the differentiator. Taste is what allows designers to translate culture, context, and human emotion into digital experiences.",
      "Taste is often misunderstood as something mystical or elitist. It isn't. It is the ability to recognize, appreciate, and consistently make good design decisions, and it is developed through deliberate practice, not handed down like a checklist.",
    ],
    url: "https://medium.com/@aiyegbusitope/how-designers-can-develop-good-taste-using-artificial-intelligence-a733a57e2639",
  },
  {
    id: "design-handoff",
    title: "Design Hand-off From a Designer's POV",
    subtitle: "Treating the hand-off as a communication channel",
    source: "Medium",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    tags: ["Design", "Design Handoff", "Developer", "Designer", "UI"],
    excerpt:
      "Hi there! In this article, I'll walk you through my approach to handing off design projects to developers. While this process works for me at the moment, it's not set in stone. Like any good process, it's iterative and will continue to evolve as I refine it over time.",
    bodyPreview: [
      "Before diving into the specifics, it's important to understand the core principle of a design handoff: it is a communication channel. At its essence, handing off a design is about bridging the gap between design and development.",
      "Over time, I have come to understand that designers tend to think and solve problems emotionally, while developers approach problem solving logically. This difference in mindset underscores the importance of making our designs as clear and straightforward as possible for developers to interpret.",
      "These distinct backgrounds highlight the need for creating a common ground where design ideas can be communicated effectively. By fostering a shared understanding, we can ensure that our designs are implemented accurately and with the intended functionality.",
    ],
    url: "https://medium.com/@aiyegbusitope/design-hand-off-from-a-designers-pov-4b88dbb738e5",
  },
  {
    id: "design-chapter-2",
    title: "Design Chapter 2",
    subtitle: "Reflecting on two years in a design career",
    source: "Medium",
    date: "Oct 2, 2023",
    readTime: "3 min read",
    tags: ["Design", "Career", "Reflection"],
    excerpt:
      "Two years ago today, I officially started my design career. It has been an incredible journey, from being unsure of what to do after school to now leading design contributions across multiple projects. While it has not always been easy, I have enjoyed every step of the way.",
    bodyPreview: [
      "From watching countless YouTube videos to attending design school to working full-time at a design agency, I have learned so much along the way. Here are some of my most important lessons.",
      "Show desire to learn. Always be open to learning from anyone and anywhere, and be humble enough to seek out internships and volunteer opportunities. I got my first paid design job because I was open to learning from someone who saw my passion for design and decided to give me a chance.",
      "Be patient with yourself. Working in tech is rewarding, but it's not a get-rich-quick scheme. It takes time and dedication to build a successful design career, but if you're willing to put in the work, the rewards will be worth it.",
    ],
    url: "https://medium.com/@aiyegbusitope/design-chapter-2-117bb5c3c8b7",
  },
  {
    id: "gamification-ux",
    title: "Gamification in UX Design",
    subtitle: "Applying game mechanics to non-game experiences",
    source: "Medium",
    date: "Jun 15, 2023",
    readTime: "4 min read",
    tags: ["Gamification", "Gaming", "UX", "UI", "UX Design"],
    excerpt:
      "Gamification has a rich history that extends far into the past, and I personally have vivid memories of encountering game mechanics in various activities long before the concept gained widespread recognition.",
    bodyPreview: [
      "Cast your mind back to the era when personal computers were emerging as a phenomenon, and possessing the skill of computer typing was considered quite fashionable. There existed a notable software named Mavis Beacon, designed specifically to enhance typing proficiency through engaging game-like simulations.",
      "Gamification entails the strategic application of game mechanics in contexts that extend beyond traditional games, leveraging game-based elements and aesthetics to captivate individuals, foster motivation, facilitate learning, and address challenges in non-game environments.",
      "When implemented with careful consideration, gamification has the potential to heighten user engagement and enhance overall user experience, through mechanics like badges, points and rewards, progress bars, leaderboards, and avatars.",
    ],
    url: "https://medium.com/@aiyegbusitope/gamification-in-ux-design-8e9127555e71",
  },
  {
    id: "heuristic-evaluation",
    title: "Heuristic Evaluation in UX Design",
    subtitle: "Using general rules to uncover usability issues",
    source: "Medium",
    date: "May 26, 2023",
    readTime: "5 min read",
    tags: ["User Experience", "Heuristic Evaluation", "Heuristics", "UI Design", "UX Design"],
    excerpt:
      "Heuristic evaluation is a valuable method in user experience design that involves the application of general rules, known as heuristics, to identify potential usability issues within a user interface. It is a process where experts meticulously inspect the interface to uncover any problems that users might encounter.",
    bodyPreview: [
      "The origins of heuristic evaluation can be traced back to the influential publication Improving a human-computer dialogue by Rolf Molich and Jakob Nielsen in 1990, building on the earlier contributions of researchers such as David Cheriton, Donald Norman, and Ben Schneiderman.",
      "Among the many concepts in heuristic evaluation, one noteworthy framework is Jakob Nielsen's. It provides a structured approach to identify and assess usability issues within a user interface, consisting of a set of heuristics that serve as evaluative criteria.",
      "These include keeping users informed about system status, showing information in ways users understand, offering control and an easy way to undo errors, maintaining consistency, and creating minimalistic, aesthetic designs.",
    ],
    url: "https://medium.com/@aiyegbusitope/heuristic-evaluation-in-ux-design-b4e08bf2f737",
  },
];
