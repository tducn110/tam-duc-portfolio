import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { techChips } from "@/features/portfolio/data/portfolio.data";
import { colorMap, type ColorKey } from "@/shared/lib/tokens";

export function TechPhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  
  // Create refs for DOM elements to sync with physics bodies
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Matter.js Engine & World
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const width = containerRef.current.clientWidth;
    const height = 350;

    // Create a hidden canvas just for mouse interaction and debug (optional)
    const render = Matter.Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });
    
    // We hide the default canvas because we use DOM elements
    render.canvas.style.opacity = "0";
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "10";
    render.canvas.style.pointerEvents = "auto"; // Needed for mouse
    renderRef.current = render;

    // 2. Add Boundaries & Compartments
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);
    
    // Compartment dividers (3 vertical walls for 4 bins)
    const divider1 = Matter.Bodies.rectangle(width / 4, height / 2 + 50, 10, height - 100, wallOptions);
    const divider2 = Matter.Bodies.rectangle((width / 4) * 2, height / 2 + 50, 10, height - 100, wallOptions);
    const divider3 = Matter.Bodies.rectangle((width / 4) * 3, height / 2 + 50, 10, height - 100, wallOptions);

    Matter.World.add(world, [ground, leftWall, rightWall, divider1, divider2, divider3]);

    // 3. Add DOM-synced Bodies mapped to 4 categories
    const bodies: Matter.Body[] = [];
    
    // Define 4 categories manually based on portfolio data
    const categories = {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      backend: ["Hono API", "Node.js", "PostgreSQL", "Drizzle ORM", "Firebase Auth"],
      tools: ["Turborepo", "Vercel", "GitHub", "Figma"],
      gameAi: ["AI Prompting", "Unity", "C#"]
    };

    techChips.forEach((chip, i) => {
      const chipWidth = chip.length * 8 + 32;
      const chipHeight = 32;
      
      let binIndex = 0; 
      if (categories.frontend.includes(chip)) binIndex = 0;
      else if (categories.backend.includes(chip)) binIndex = 1;
      else if (categories.tools.includes(chip)) binIndex = 2;
      else if (categories.gameAi.includes(chip)) binIndex = 3;

      // Drop x within the specific bin's boundaries
      const binWidth = width / 4;
      const minX = binIndex * binWidth + 40;
      const maxX = (binIndex + 1) * binWidth - 40;
      
      const x = Math.max(minX, Math.min(maxX, Math.random() * (maxX - minX) + minX));
      const y = -Math.random() * 500 - 100;
      
      const body = Matter.Bodies.rectangle(x, y, chipWidth, chipHeight, {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        density: 0.001,
        render: { visible: false },
      });
      
      bodies.push(body);
    });
    
    Matter.World.add(world, bodies);

    // 4. Add Mouse Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Allow scrolling through the canvas when not dragging a body
    const matterMouse = mouseConstraint.mouse as Matter.Mouse & { mousewheel: EventListener };
    matterMouse.element.removeEventListener("mousewheel", matterMouse.mousewheel);
    matterMouse.element.removeEventListener("DOMMouseScroll", matterMouse.mousewheel);

    // 5. Sync Loop
    const syncDOM = () => {
      bodies.forEach((body, i) => {
        const el = chipRefs.current[i];
        if (el) {
          const { x, y } = body.position;
          // Transform from center
          el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
      requestAnimationFrame(syncDOM);
    };

    // Run engine
    Matter.Runner.run(Matter.Runner.create(), engine);
    syncDOM();

    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        render.canvas.width = newWidth;
        Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 25 });
        Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: height / 2 });
        // Update dividers position
        Matter.Body.setPosition(divider1, { x: newWidth / 4, y: height / 2 + 50 });
        Matter.Body.setPosition(divider2, { x: (newWidth / 4) * 2, y: height / 2 + 50 });
        Matter.Body.setPosition(divider3, { x: (newWidth / 4) * 3, y: height / 2 + 50 });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] overflow-hidden rounded-xl border border-whisper/10"
      style={{
        background: "radial-gradient(circle at center, rgba(175,80,255,0.05), transparent 70%)"
      }}
    >
      {/* Compartment Labels */}
      <div className="absolute inset-0 flex items-end pb-8 pointer-events-none opacity-20">
        <div className="flex-1 flex justify-center border-r border-whisper/20">
          <span className="text-[12px] font-display uppercase tracking-[0.2em] text-whisper transform -rotate-90 origin-bottom translate-y-10 whitespace-nowrap">Frontend</span>
        </div>
        <div className="flex-1 flex justify-center border-r border-whisper/20">
          <span className="text-[12px] font-display uppercase tracking-[0.2em] text-violet transform -rotate-90 origin-bottom translate-y-10 whitespace-nowrap">Backend</span>
        </div>
        <div className="flex-1 flex justify-center border-r border-whisper/20">
          <span className="text-[12px] font-display uppercase tracking-[0.2em] text-cosmic-a transform -rotate-90 origin-bottom translate-y-10 whitespace-nowrap">Tools</span>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[12px] font-display uppercase tracking-[0.2em] text-amber transform -rotate-90 origin-bottom translate-y-10 whitespace-nowrap">Game/AI</span>
        </div>
      </div>

      {/* DOM Elements for Tech Chips */}
      {techChips.map((chip, i) => {
        const colors: ColorKey[] = ["violet", "cosmic", "mauve", "steel", "slate", "indigo", "teal", "amber"];
        const color = colors[i % colors.length];
        const c = colorMap[color];
        
        return (
          <div
            key={chip}
            ref={(el) => (chipRefs.current[i] = el)}
            className={`absolute top-0 left-0 px-4 py-1.5 rounded-full text-[12px] border ${c.border} ${c.bg} ${c.text} backdrop-blur-md font-mono font-medium shadow-lg pointer-events-none whitespace-nowrap select-none`}
            style={{ 
              willChange: "transform",
            }}
          >
            {chip}
          </div>
        );
      })}
      
      {/* Overlay to inform users they can interact */}
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none z-0">
        <span className="text-[10px] text-slate font-mono uppercase tracking-widest opacity-40">
          DRAG AND TOSS CHIPS
        </span>
      </div>
    </div>
  );
}
