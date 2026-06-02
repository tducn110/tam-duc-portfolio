import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./app/App.tsx";
import "./styles/index.css";

gsap.registerPlugin(ScrollTrigger);

// Mock server only runs in dev — stripped from production bundle by Vite tree-shaking
if (import.meta.env.DEV) {
  const { setupMockServer } = await import("./server/mock.server");
  setupMockServer();
}

createRoot(document.getElementById("root")!).render(<App />);