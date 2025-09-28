"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface FallingImagesProps {
  images: string[]; // filenames in public folder
  trigger?: "auto" | "scroll" | "click" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  imageWidth?: number; // px
  height?: number | string; // container height (e.g., 400 or '50vh')
  className?: string; // extra classes for the outer container
}

const FallingImages: React.FC<FallingImagesProps> = ({
  images = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  imageWidth = 80,
  height = 400,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  // Handle trigger
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  // Physics setup
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;
    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const heightPx = containerRect.height;
    if (width <= 0 || heightPx <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height: heightPx,
        background: backgroundColor,
        wireframes
      }
    });

    // Boundaries
    const boundaryOptions = { isStatic: true, render: { fillStyle: "transparent" } };
    const floor = Bodies.rectangle(width / 2, heightPx + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, heightPx / 2, 50, heightPx, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, heightPx / 2, 50, heightPx, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Create image elements
    images.forEach(src => {
      const img = document.createElement("img");
      img.src = `/${src}`;
      img.style.position = "absolute";
      img.style.width = `${imageWidth}px`;
      img.style.height = "auto";
      imagesRef.current?.appendChild(img);
    });

    const imgElems = imagesRef.current?.querySelectorAll("img") || [];
    const imgBodies = [...imgElems].map(elem => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
        render: { sprite: { texture: elem.src, xScale: 1, yScale: 1 } }
      });

      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    // Set initial CSS positions
    imgBodies.forEach(({ elem, body }) => {
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
    });

    // Mouse interaction
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...imgBodies.map(wb => wb.body)
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Animation loop
    const updateLoop = () => {
      imgBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      imgElems.forEach(elem => elem.remove());
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, images, imageWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className} ${trigger === "click" || trigger === "hover" ? "cursor-pointer" : ""}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={imagesRef} className="absolute top-0 left-0 z-10" />
      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingImages;
