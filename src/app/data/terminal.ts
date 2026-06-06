export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "ascii" | "header";
}

export const terminalContent = {
  initialHistory: [
    { text: "System initialisation completed. Connecting to tdu._cn node...", type: "header" as const },
    { text: "Welcome to Tam Duc's Linux Terminal (OS: Ubuntu 24.04 LTS, Kernel: 6.8.0-generic)", type: "header" as const },
    { text: "Type 'help' or 'neofetch' to explore capabilities & stats.", type: "header" as const },
  ],
  restartHistory: [
    { text: "Session restarted.", type: "header" as const },
    { text: "Type 'help' to begin.", type: "header" as const },
  ],
  promptPrefix: "tdu_cn@da-nang:~$",
  headerLabel: "tdu_cn@linux-desktop: ~",
  titleClose: "Restart session",
  titleMaximize: "Toggle size",
  titleMinimize: "Minimize focus",
  titleClear: "Clear History",
  cmdNotFoundPrefix: "bash: command not found: ",
  cmdNotFoundSuffix: "Type 'help' to view the catalog of valid command operations.",
  commands: {
    help: [
      { text: "Available Commands:", type: "output" as const },
      { text: "  neofetch     - Displays system information and profile stats", type: "output" as const },
      { text: "  capabilities - Showcases developer capabilities (no bragging, just data)", type: "output" as const },
      { text: "  projects     - Lists current major shipped repositories", type: "output" as const },
      { text: "  clear        - Clears the terminal screen history", type: "output" as const },
      { text: "  contact      - Prints email and network links to connect", type: "output" as const },
      { text: "  sudo rm -rf  - DO NOT RUN THIS COMMAND", type: "error" as const },
    ],
    neofetch: [
      {
        text: `
      .--.          tdu_cn@da-nang
     |o_o |         --------------
     |:_/ |         OS: Ubuntu 24.04 LTS x86_64
     |/   \\ \\        Host: Tam Duc's Brain v2.0
    (|     | )       Kernel: 6.8.0-31-generic
   /'\\_   _/ '\\      Uptime: 20 years (still booting)
   \\___)=(___/       Shell: zsh 5.9
                    Resolution: 3840x2160 (4K ultra gamer)
                    GPA: 3.8 / 4.0 (CSE Student)
                    TFT Rank: Master Tier (Tactician brain)
                    Main Tech: React, Next.js, GSAP, Supabase, Python, AI
            `,
        type: "ascii" as const,
      },
    ],
    capabilities: [
      { text: "■ CORE CAPABILITIES & TECH ENGINE ■", type: "header" as const },
      { text: "-------------------------------------", type: "output" as const },
      { text: "[1] AI-native Engineering:", type: "header" as const },
      { text: "    - Architecting AI agent logic systems and orchestrations.", type: "output" as const },
      { text: "    - Building semantic web integrations using vector stores and LLM inference engines.", type: "output" as const },
      { text: "[2] Gamified Logic & System Performance:", type: "header" as const },
      { text: "    - Master TFT thinking — system patterns, complex resource allocation, game logic.", type: "output" as const },
      { text: "    - Highly skilled in state management and frame-rate stable frontend UI flows.", type: "output" as const },
      { text: "[3] Rapid Modular Shipping:", type: "header" as const },
      { text: "    - Moving from Figma to production code instantly.", type: "output" as const },
      { text: "    - Setting up scalable backend structures using PostgreSQL, Supabase, and OAuth engines.", type: "output" as const },
    ],
    projects: [
      { text: "■ SHIPPED ACTIVE REPOSITORIES ■", type: "header" as const },
      { text: "------------------------------", type: "output" as const },
      { text: "• Finance Tracker V3 (NextJS + PostgreSQL): Active tracking & budget forecasts.", type: "output" as const },
      { text: "• Event Platform (RadixUI + Supabase): Realtime ticket checkout, 10k users capacity.", type: "output" as const },
      { text: "• Mood Journal App (React Native): Emotional feedback loops & local encrypted storage.", type: "output" as const },
      { text: "• Retro Chess AI (WebAssembly): Alpha-Beta pruning algorithm running in-browser.", type: "output" as const },
      { text: "Type 'contact' to request source access tokens.", type: "output" as const },
    ],
    contact: [
      { text: "■ CONNECT WITH THE CORE MODULE ■", type: "header" as const },
      { text: "Email   : tducn110@gmail.com", type: "output" as const },
      { text: "GitHub  : github.com/tducn110", type: "output" as const },
      { text: "Address : Da Nang, Vietnam", type: "output" as const },
      { text: "Status  : Open to internship & innovative builds", type: "output" as const },
    ],
    sudo: [
      { text: "Access Denied.", type: "error" as const },
      { text: "Nice try, hacker. You do not have root permission to delete Tam Duc's workspace.", type: "error" as const },
    ]
  }
};
