import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Lightbulb, Sparkles, Code, Brain, Compass } from "lucide-react";
import { Link } from "react-router";
import { Container, Surface, Typography } from "@/shared/ui";
import { gradients } from "@/shared/lib/tokens";
import { ThreeBackground } from "../components/portfolio/ThreeBackground";
import { CursorHalo } from "../hooks/useCursorHalo";
import { SplitText } from "../components/shared/SplitText";
import { ReactLenis } from "lenis/react";

interface IdeaNote {
  id: string;
  title: string;
  content: string;
  category: "feature" | "layout" | "marketing" | "other";
  createdAt: string;
}

const EXPERIMENT_SUGGESTIONS = [
  {
    icon: <Code size={18} />,
    title: "Shader Art Gallery",
    desc: "Xây dựng phòng trưng bày các tác phẩm WebGL Shaders (Raymarching, SDF, Fluid).",
  },
  {
    icon: <Brain size={18} />,
    title: "Hệ Thống Trí Tuệ Nhân Tạo Cá Nhân",
    desc: "Tích hợp mô hình AI nhỏ chạy trực tiếp trên trình duyệt bằng WebGPU (như WebLLM) để làm trợ lý.",
  },
  {
    icon: <Compass size={18} />,
    title: "Hành Tinh 3D Tương Tác",
    desc: "Vẽ một quả địa cầu 3D (Three.js) hiển thị các dự án của bạn dưới dạng các trạm vũ trụ phát sáng.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Sound Visualizer",
    desc: "Kết nối micro hoặc nhạc của khách truy cập để làm biến đổi sóng nước 3D trên màn hình theo tần số âm thanh.",
  },
];

export default function SandboxPage() {
  const [notes, setNotes] = useState<IdeaNote[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<IdeaNote["category"]>("feature");

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sandbox_ideas");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial data
      const seed: IdeaNote[] = [
        {
          id: "1",
          title: "Thiết kế một mini-game 3D WebGL",
          content: "Làm game bắn bóng phi hành gia phong cách retro trên không gian 3D. Sử dụng ThreeJS và thiết lập điểm số cao nhất lưu vào Supabase.",
          category: "feature",
          createdAt: new Date().toLocaleDateString("vi-VN"),
        },
        {
          id: "2",
          title: "Ý tưởng cấu trúc Landing Page kiểu Cyberpunk",
          content: "Sử dụng tông màu Neon xanh lục / hồng cánh sen cực mạnh, các đường dẫn nhấp nháy chạy theo đường viền và âm thanh retro clicky khi hover.",
          category: "layout",
          createdAt: new Date().toLocaleDateString("vi-VN"),
        }
      ];
      setNotes(seed);
      localStorage.setItem("sandbox_ideas", JSON.stringify(seed));
    }
  }, []);

  const saveNotes = (updated: IdeaNote[]) => {
    setNotes(updated);
    localStorage.setItem("sandbox_ideas", JSON.stringify(updated));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const note: IdeaNote = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const updated = [note, ...notes];
    saveNotes(updated);
    setNewTitle("");
    setNewContent("");
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <main className="min-h-screen bg-[#090909] text-whisper overflow-hidden relative pb-24">
        {/* Dynamic Holographic Shader background */}
        <ThreeBackground />
        <CursorHalo />

        {/* Floating Top Bar */}
        <div className="absolute top-6 left-0 right-0 z-50">
          <Container className="flex items-center justify-between">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[12px] font-medium text-ghost/65 hover:text-violet transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Quay lại Portfolio</span>
            </Link>

            <Typography variant="monoEyebrow" className="!text-[10px] text-slate !tracking-[0.2em]">
              CREATIVE LAB & IDEAS / V0.1
            </Typography>
          </Container>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 border-b border-whisper/[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(175,80,255,0.15),transparent_42%)] pointer-events-none" />
          <Container className="relative">
            <div className="max-w-[800px]">
              <Typography variant="monoEyebrow" className="mb-4 !text-[10px] text-violet !tracking-[0.24em] font-bold">
                IDEAS INCUBATOR
              </Typography>
              <h1 className="leading-[0.88] tracking-[-0.05em] overflow-hidden py-1 mb-6">
                <SplitText
                  className="italic font-normal tracking-[-0.05em] !text-[clamp(2.8rem,7vw,6rem)] leading-none text-whisper"
                  variant="reveal-up"
                >
                  Không gian ấp ủ dự án.
                </SplitText>
              </h1>
              <Typography variant="body" className="opacity-70 !text-[1.02rem] !leading-[1.7] max-w-[62ch]">
                Nơi bạn có thể phác thảo, ghi chú ý tưởng và khám phá các đề xuất thực nghiệm công nghệ tiếp theo. Dữ liệu ghi chú được lưu trực tiếp trên trình duyệt của bạn.
              </Typography>
            </div>
          </Container>
        </section>

        {/* Sandbox Content Grid */}
        <section className="relative py-16">
          <Container className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] items-start relative z-10">
            
            {/* Left Column: Idea Notebook */}
            <div className="space-y-8">
              <Surface variant="frost" className="p-6 md:p-8 rounded-[24px]">
                <div className="flex items-center gap-2 mb-6 text-violet">
                  <Lightbulb size={18} />
                  <Typography variant="monoEyebrow" className="!text-[11px] !tracking-[0.2em] font-bold">Ghi Chú Ý Tưởng Mới</Typography>
                </div>

                <form onSubmit={handleAddNote} className="space-y-4">
                  <div className="grid sm:grid-cols-[1.2fr_0.8fr] gap-4">
                    <input
                      type="text"
                      placeholder="Tiêu đề ý tưởng..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet/60 transition-colors"
                      required
                    />
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as IdeaNote["category"])}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-400 focus:outline-none focus:border-violet/60 transition-colors"
                    >
                      <option value="feature">Tính năng độc đáo</option>
                      <option value="layout">Giao diện / Bố cục</option>
                      <option value="marketing">Tiếp thị / Nhận diện</option>
                      <option value="other">Ý tưởng khác</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Mô tả cụ thể ý tưởng của bạn, công nghệ dự định sử dụng và mục tiêu cần đạt..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet/60 transition-colors resize-none"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet hover:bg-violet-600 transition-colors text-white text-xs font-bold shadow-lg shadow-violet-900/20"
                    >
                      <Plus size={14} /> Lưu vào danh sách
                    </button>
                  </div>
                </form>
              </Surface>

              {/* Saved Notes display */}
              <div className="space-y-4">
                <Typography variant="monoEyebrow" className="!text-[10px] text-slate !tracking-[0.2em] font-bold px-1">Ý TƯỞNG ĐANG LƯU HỮU ({notes.length})</Typography>
                
                {notes.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-zinc-500 text-xs">
                    Không có ý tưởng nào đang được lưu trữ. Hãy bắt đầu viết ghi chú đầu tiên!
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {notes.map((note) => (
                      <Surface
                        key={note.id}
                        variant="frost"
                        className="p-5 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-colors relative group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2.5">
                          <div>
                            <span className="inline-block text-[8px] font-mono tracking-widest text-violet bg-violet/10 border border-violet/20 px-2 py-0.5 rounded-full uppercase font-bold mr-2.5">
                              {note.category}
                            </span>
                            <span className="text-[9px] text-zinc-600 font-mono">{note.createdAt}</span>
                            <h3 className="text-base font-bold text-white tracking-tight mt-1.5">{note.title}</h3>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-zinc-600 hover:text-rose-500 transition-colors p-1"
                            title="Xóa ý tưởng"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-ghost/75 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                      </Surface>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Labs Experiment Suggestions */}
            <div className="space-y-6">
              <Surface
                variant="glow"
                className="p-6 md:p-8 rounded-[24px] border-violet/20"
                style={{
                  background: gradients.cosmicB,
                  boxShadow: "0 24px 64px -16px rgba(64,24,96,0.6)",
                }}
              >
                <div className="flex items-center gap-2 mb-5 text-violet">
                  <Sparkles size={18} />
                  <Typography variant="monoEyebrow" className="!text-[11px] !tracking-[0.2em] font-bold">Ý TƯỞNG THỰC NGHIỆM HOT</Typography>
                </div>
                <Typography variant="body" className="opacity-80 !text-[13px] !leading-[1.65] mb-6">
                  Dành cho bước tiếp theo của portfolio: tích hợp các công nghệ Web mới nhất để biến website của bạn thành một tác phẩm nghệ thuật kỹ thuật số thực sự thu hút nhà tuyển dụng.
                </Typography>

                <div className="flex flex-col gap-5">
                  {EXPERIMENT_SUGGESTIONS.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-t border-white/10 pt-4.5 first:border-0 first:pt-0">
                      <div className="w-9 h-9 rounded-xl bg-violet/15 border border-violet/30 text-violet flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-tight mb-1">{item.title}</h4>
                        <p className="text-[11.5px] text-zinc-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Surface>
            </div>

          </Container>
        </section>
      </main>
    </ReactLenis>
  );
}
