import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal, Maximize2, Minimize2, X, RefreshCw, Activity, Code } from "lucide-react";
import { terminalContent, type TerminalLine } from "../../data/terminal";
import { Typography } from "@/shared/ui";

export function LinuxTerminal() {
  const [activeTab, setActiveTab] = useState<"terminal" | "monitor" | "matrix">("terminal");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>(terminalContent.initialHistory);
  const [isMaximized, setIsMaximized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Monitor systems simulation state
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(30).fill(20));
  const [memHistory, setMemHistory] = useState<number[]>(Array(30).fill(55));
  const [sysInfo, setSysInfo] = useState({ cpu: 22, mem: 56, uptime: "00:00:00" });

  // Matrix rain canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll to bottom whenever history updates (only if activeTab is terminal)
  useEffect(() => {
    if (activeTab === "terminal" && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  // Focus input when clicking anywhere on the terminal content
  const handleTerminalClick = () => {
    if (activeTab === "terminal") {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `${terminalContent.promptPrefix} ${input}`, type: "input" as const }];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const commandMap = terminalContent.commands;
    const normalizedCmd = cmd === "sudo rm -rf" || cmd === "sudo rm -rf /" ? "sudo" : cmd;
    const response: TerminalLine[] =
      commandMap[normalizedCmd as keyof typeof commandMap] ?? [
        { text: `${terminalContent.cmdNotFoundPrefix}${cmd}`, type: "error" },
        { text: terminalContent.cmdNotFoundSuffix, type: "output" },
      ];

    setHistory([...newHistory, ...response]);
    setInput("");
  };

  // Systems monitor update interval
  useEffect(() => {
    if (activeTab !== "monitor") return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const nextCpu = Math.min(100, Math.max(5, Math.round(
        Math.sin(Date.now() / 4000) * 25 + 40 + (Math.random() - 0.5) * 12
      )));
      const nextMem = Math.min(100, Math.max(5, Math.round(
        62 + Math.sin(Date.now() / 12000) * 3 + (Math.random() - 0.5) * 2
      )));

      setCpuHistory((prev) => [...prev.slice(1), nextCpu]);
      setMemHistory((prev) => [...prev.slice(1), nextMem]);

      const diffSec = Math.floor((Date.now() - startTime) / 1000);
      const hrs = String(Math.floor(diffSec / 3600)).padStart(2, "0");
      const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, "0");
      const secs = String(diffSec % 60).padStart(2, "0");

      setSysInfo({
        cpu: nextCpu,
        mem: nextMem,
        uptime: `${hrs}:${mins}:${secs}`,
      });
    }, 850);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Matrix Rain drawing logic
  useEffect(() => {
    if (activeTab !== "matrix" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 400);

    const columns = Math.floor(width / 14);
    const yPositions = Array(columns).fill(0);

    const resizeHandler = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resizeHandler);

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 9, 0.08)";
      ctx.fillRect(0, 0, width, height);

      const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/\\*@#%&";
      ctx.font = "12px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = yPositions[i];

        if (Math.random() > 0.5) {
          ctx.fillStyle = "#af50ff"; // Violet
        } else {
          ctx.fillStyle = "#0d9488"; // Teal
        }

        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 14;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [activeTab]);

  useGSAP(() => {
    gsap.to(".terminal-cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

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

  const cpuPoints = cpuHistory
    .map((val, idx) => {
      const x = (idx / (cpuHistory.length - 1)) * 300;
      const y = 100 - val;
      return `${x},${y}`;
    })
    .join(" ");

  const memPoints = memHistory
    .map((val, idx) => {
      const x = (idx / (memHistory.length - 1)) * 300;
      const y = 100 - val;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full transition-all duration-500 ease-out z-20 ${
        isMaximized ? "max-w-full h-[80vh] px-2" : "max-w-[850px] h-[480px]"
      }`}
    >
      <div
        className="w-full h-full flex flex-col overflow-hidden bg-[#090909]/90 border border-whisper/10 backdrop-blur-2xl shadow-2xl rounded-2xl"
        onClick={handleTerminalClick}
        style={{
          fontFamily: "var(--font-mono)",
          boxShadow: "0 24px 64px -16px rgba(175,80,255,0.15), 0 1px 0 rgba(247,249,250,0.06) inset",
        }}
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#141414]/95 px-4 py-3 flex items-center justify-between border-b border-whisper/5 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHistory(terminalContent.restartHistory);
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center hover:opacity-80 transition-opacity"
              title={terminalContent.titleClose}
            >
              <X size={8} className="text-[#801814] font-bold opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center hover:opacity-80 transition-opacity"
              title={terminalContent.titleMaximize}
            >
              <Maximize2 size={8} className="text-[#8a5d00] font-bold opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.blur();
              }}
              className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center hover:opacity-80 transition-opacity"
              title={terminalContent.titleMinimize}
            >
              <Minimize2 size={8} className="text-[#0e5218] font-bold opacity-0 hover:opacity-100" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate font-medium tracking-wide">
            <Terminal size={12} className="text-violet" />
            <span>{terminalContent.headerLabel}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory(terminalContent.initialHistory);
              setInput("");
            }}
            className="text-slate hover:text-violet transition-colors"
            title={terminalContent.titleClear}
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-whisper/5 bg-[#0f0f0f]/80 select-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("terminal");
            }}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono transition-colors ${
              activeTab === "terminal"
                ? "border-b border-violet text-violet bg-[#141414]/30"
                : "text-slate hover:text-ghost hover:bg-[#141414]/10"
            }`}
          >
            <Terminal size={12} />
            <span>terminal.sh</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("monitor");
            }}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono transition-colors ${
              activeTab === "monitor"
                ? "border-b border-teal-500 text-teal-400 bg-[#141414]/30"
                : "text-slate hover:text-ghost hover:bg-[#141414]/10"
            }`}
          >
            <Activity size={12} />
            <span>sys_monitor.bin</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("matrix");
            }}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono transition-colors ${
              activeTab === "matrix"
                ? "border-b border-violet text-violet bg-[#141414]/30"
                : "text-slate hover:text-ghost hover:bg-[#141414]/10"
            }`}
          >
            <Code size={12} />
            <span>matrix_rain.exe</span>
          </button>
        </div>

        {/* Tab Content Areas */}
        {activeTab === "terminal" && (
          <div
            ref={scrollAreaRef}
            className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin text-left"
            style={{ fontSize: "13px", lineHeight: "1.6" }}
          >
            {history.map((line, idx) => {
              if (line.type === "header") {
                return (
                  <div key={idx} className="text-slate">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "input") {
                return (
                  <div key={idx} className="text-whisper">
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
                    className="text-violet leading-tight select-none overflow-x-auto whitespace-pre font-mono"
                    style={{ color: "var(--color-violet)" }}
                  >
                    {line.text}
                  </pre>
                );
              }
              return (
                <div key={idx} className="text-ghost/95 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            })}

            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
              <span className="text-violet shrink-0 font-medium">{terminalContent.promptPrefix}</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  aria-label="Terminal Input"
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent text-whisper border-none outline-none p-0 focus:ring-0 select-text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                {input === "" && (
                  <span className="terminal-cursor absolute left-0 w-2 h-4 bg-violet pointer-events-none" />
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === "monitor" && (
          <div className="flex-1 p-6 overflow-y-auto grid md:grid-cols-2 gap-6 text-ghost/90">
            {/* CPU Chart */}
            <div className="p-4 rounded-xl border border-whisper/5 bg-whisper/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate tracking-wider font-mono">CPU UTILIZATION</span>
                <span className="text-sm text-violet font-mono font-bold">{sysInfo.cpu}%</span>
              </div>
              <div className="w-full h-32 relative bg-black/40 rounded-lg overflow-hidden border border-whisper/5">
                <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#af50ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#af50ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <path d={`M 0 100 L ${cpuPoints} L 300 100 Z`} fill="url(#cpuGrad)" />
                  <polyline fill="none" stroke="#af50ff" strokeWidth="1.5" points={cpuPoints} />
                </svg>
              </div>
            </div>

            {/* MEMORY Chart */}
            <div className="p-4 rounded-xl border border-whisper/5 bg-whisper/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate tracking-wider font-mono">MEMORY USAGE</span>
                <span className="text-sm text-teal-400 font-mono font-bold">{sysInfo.mem}%</span>
              </div>
              <div className="w-full h-32 relative bg-black/40 rounded-lg overflow-hidden border border-whisper/5">
                <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <path d={`M 0 100 L ${memPoints} L 300 100 Z`} fill="url(#memGrad)" />
                  <polyline fill="none" stroke="#0d9488" strokeWidth="1.5" points={memPoints} />
                </svg>
              </div>
            </div>

            {/* System Info Stats */}
            <div className="md:col-span-2 grid grid-cols-3 gap-4 font-mono text-center">
              <div className="p-3 border border-whisper/5 bg-black/30 rounded-xl">
                <div className="text-[10px] text-slate mb-1">UPTIME</div>
                <div className="text-sm font-bold text-whisper">{sysInfo.uptime}</div>
              </div>
              <div className="p-3 border border-whisper/5 bg-black/30 rounded-xl">
                <div className="text-[10px] text-slate mb-1">OS CORE</div>
                <div className="text-sm font-bold text-whisper">tduc-os v6.3</div>
              </div>
              <div className="p-3 border border-whisper/5 bg-black/30 rounded-xl">
                <div className="text-[10px] text-slate mb-1">NETWORK</div>
                <div className="text-sm font-bold text-teal-400">ONLINE (10G)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "matrix" && (
          <div className="flex-1 w-full h-full relative overflow-hidden bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
            <div className="absolute top-4 left-4 font-mono text-[10px] text-violet bg-black/60 px-2 py-1 rounded border border-violet/20 pointer-events-none">
              MATRIX_STREAM_INITIALIZED (COLOR_VIOLET_TEAL)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
