import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal, Maximize2, Minimize2, X, RefreshCw } from "lucide-react";
import { fonts } from "../../lib/tokens";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "ascii" | "header";
  isRawHtml?: boolean;
}

export function LinuxTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "System initialisation completed. Connecting to tdu._cn node...", type: "header" },
    { text: "Welcome to Tam Duc's Linux Terminal (OS: Ubuntu 24.04 LTS, Kernel: 6.8.0-generic)", type: "header" },
    { text: "Type 'help' or 'neofetch' to explore capabilities & stats.", type: "header" },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking anywhere on the terminal content
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `tdu_cn@da-nang:~$ ${input}`, type: "input" as const }];

    let response: TerminalLine[] = [];

    switch (cmd) {
      case "help":
        response = [
          { text: "Available Commands:", type: "output" },
          { text: "  neofetch     - Displays system information and profile stats", type: "output" },
          { text: "  capabilities - Showcases developer capabilities (no bragging, just data)", type: "output" },
          { text: "  projects     - Lists current major shipped repositories", type: "output" },
          { text: "  clear        - Clears the terminal screen history", type: "output" },
          { text: "  contact      - Prints email and network links to connect", type: "output" },
          { text: "  sudo rm -rf  - DO NOT RUN THIS COMMAND", type: "error" },
        ];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "neofetch":
        response = [
          {
            text: `
      .--.          tdu_cn@da-nang
     |o_o |         --------------
     |:_/ |         OS: Ubuntu 24.04 LTS x86_64
    //   \\ \\        Host: Tam Duc's Brain v2.0
   (|     | )       Kernel: 6.8.0-31-generic
  /'\\_   _/ '\\      Uptime: 20 years (still booting)
  \\___)=(___/       Shell: zsh 5.9
                    Resolution: 3840x2160 (4K ultra gamer)
                    GPA: 3.8 / 4.0 (CSE Student)
                    TFT Rank: Master Tier (Tactician brain)
                    Main Tech: React, Next.js, GSAP, Supabase, Python, AI
            `,
            type: "ascii",
          },
        ];
        break;
      case "capabilities":
        response = [
          { text: "■ CORE CAPABILITIES & TECH ENGINE ■", type: "header" },
          { text: "-------------------------------------", type: "output" },
          { text: "[1] AI-native Engineering:", type: "header" },
          { text: "    - Architecting AI agent logic systems and orchestrations.", type: "output" },
          { text: "    - Building semantic web integrations using vector stores and LLM inference engines.", type: "output" },
          { text: "[2] Gamified Logic & System Performance:", type: "header" },
          { text: "    - Master TFT thinking — system patterns, complex resource allocation, game logic.", type: "output" },
          { text: "    - Highly skilled in state management and frame-rate stable frontend UI flows.", type: "output" },
          { text: "[3] Rapid Modular Shipping:", type: "header" },
          { text: "    - Moving from Figma to production code instantly.", type: "output" },
          { text: "    - Setting up scalable backend structures using PostgreSQL, Supabase, and OAuth engines.", type: "output" },
        ];
        break;
      case "projects":
        response = [
          { text: "■ SHIPPED ACTIVE REPOSITORIES ■", type: "header" },
          { text: "------------------------------", type: "output" },
          { text: "• Finance Tracker V3 (NextJS + PostgreSQL): Active tracking & budget forecasts.", type: "output" },
          { text: "• Event Platform (RadixUI + Supabase): Realtime ticket checkout, 10k users capacity.", type: "output" },
          { text: "• Mood Journal App (React Native): Emotional feedback loops & local encrypted storage.", type: "output" },
          { text: "• Retro Chess AI (WebAssembly): Alpha-Beta pruning algorithm running in-browser.", type: "output" },
          { text: "Type 'contact' to request source access tokens.", type: "output" },
        ];
        break;
      case "contact":
        response = [
          { text: "■ CONNECT WITH THE CORE MODULE ■", type: "header" },
          { text: "Email   : tducn110@gmail.com", type: "output" },
          { text: "GitHub  : github.com/tducn110", type: "output" },
          { text: "Address : Da Nang, Vietnam", type: "output" },
          { text: "Status  : Open to internship & innovative builds", type: "output" },
        ];
        break;
      case "sudo rm -rf":
      case "sudo rm -rf /":
        response = [
          { text: "Access Denied.", type: "error" },
          { text: "Nice try, hacker. You do not have root permission to delete Tam Duc's workspace.", type: "error" },
        ];
        break;
      default:
        response = [
          { text: `bash: command not found: ${cmd}`, type: "error" },
          { text: "Type 'help' to view the catalog of valid command operations.", type: "output" },
        ];
    }

    setHistory([...newHistory, ...response]);
    setInput("");
  };

  useGSAP(() => {
    // Pulse animation for terminal blinking cursor
    gsap.to(".terminal-cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

    // Stagger render on window initialization
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.96, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full transition-all duration-500 ease-out z-20 ${
        isMaximized ? "max-w-full h-[80vh] px-2" : "max-w-[850px] h-[480px]"
      }`}
    >
      <div
        className="w-full h-full flex flex-col overflow-hidden bg-[#090909]/90 border border-white/10 backdrop-blur-2xl shadow-2xl rounded-2xl"
        onClick={handleTerminalClick}
        style={{
          fontFamily: fonts.mono,
          boxShadow: "0 24px 64px -16px rgba(175,80,255,0.15), 0 1px 0 rgba(247,249,250,0.06) inset",
        }}
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#141414]/95 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHistory([
                  { text: "Session restarted.", type: "header" },
                  { text: "Type 'help' to begin.", type: "header" },
                ]);
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Restart session"
            >
              <X size={8} className="text-[#801814] font-bold opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Toggle size"
            >
              <Maximize2 size={8} className="text-[#8a5d00] font-bold opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.blur();
              }}
              className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Minimize focus"
            >
              <Minimize2 size={8} className="text-[#0e5218] font-bold opacity-0 hover:opacity-100" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#6b6b6b] font-medium tracking-wide">
            <Terminal size={12} className="text-[#af50ff]" />
            <span>tdu_cn@linux-desktop: ~</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([
                { text: "System initialisation completed. Connecting to tdu._cn node...", type: "header" },
                { text: "Welcome to Tam Duc's Linux Terminal (OS: Ubuntu 24.04 LTS, Kernel: 6.8.0-generic)", type: "header" },
                { text: "Type 'help' or 'neofetch' to explore capabilities & stats.", type: "header" },
              ]);
              setInput("");
            }}
            className="text-[#6b6b6b] hover:text-[#af50ff] transition-colors"
            title="Clear History"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Scrollable Command Line Area */}
        <div
          ref={scrollAreaRef}
          className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin text-left"
          style={{ fontSize: "13px", lineHeight: "1.6" }}
        >
          {history.map((line, idx) => {
            if (line.type === "header") {
              return (
                <div key={idx} className="text-[#8b8b8b]">
                  {line.text}
                </div>
              );
            }
            if (line.type === "input") {
              return (
                <div key={idx} className="text-[#f7f9fa]">
                  {line.text}
                </div>
              );
            }
            if (line.type === "error") {
              return (
                <div key={idx} className="text-[#ff5f56] font-medium">
                  {line.text}
                </div>
              );
            }
            if (line.type === "ascii") {
              return (
                <pre
                  key={idx}
                  className="text-[#a78bfa] leading-tight select-none overflow-x-auto whitespace-pre font-mono"
                  style={{ color: "#a78bfa" }}
                >
                  {line.text}
                </pre>
              );
            }
            // Standard capabilities/output lines
            return (
              <div key={idx} className="text-[#f0f0f0]/95 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}

          {/* Prompt input field */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
            <span className="text-[#af50ff] shrink-0 font-medium">tdu_cn@da-nang:~$</span>
            <div className="flex-1 flex items-center relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-[#f7f9fa] border-none outline-none p-0 focus:ring-0 select-text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {/* Pulsing cursor overlay if input is empty */}
              {input === "" && (
                <span className="terminal-cursor absolute left-0 w-2 h-4 bg-[#af50ff] pointer-events-none" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
