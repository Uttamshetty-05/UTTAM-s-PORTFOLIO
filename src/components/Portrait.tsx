import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/uttam.png";

/**
 * Portrait that slightly rotates toward the cursor — as if looking at / thinking
 * about the code floating around it. Falls back to a slow idle "pondering" sway
 * when the pointer is idle or unavailable.
 */
export function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / Math.max(window.innerWidth / 2, 1);
        const dy = (e.clientY - cy) / Math.max(window.innerHeight / 2, 1);
        setActive(true);
        setTilt({
          x: Math.max(-1, Math.min(1, dy)) * -9,
          y: Math.max(-1, Math.min(1, dx)) * 14,
        });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm" style={{ perspective: "900px" }}>
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
      <div
        ref={ref}
        className={active ? "portrait-stage" : "portrait-stage portrait-idle"}
        style={{
          transform: active
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
        }}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow">
          <img
            src={portrait}
            alt="Uttam Shetty, computer science student, deep in thought"
            className="w-full object-cover"
            style={{ transform: "translateZ(40px) scale(1.02)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-70" />
          <div className="scanline pointer-events-none absolute inset-0" />
        </div>

        <ThoughtChip className="-left-8 top-6" delay="0s">
          {"while (learning) { build(); }"}
        </ThoughtChip>
        <ThoughtChip className="-right-6 top-1/3" delay="1.2s">
          {"O(n log n)?"}
        </ThoughtChip>
        <ThoughtChip className="-left-4 bottom-10" delay="2.1s">
          {"git commit -m \"fix: edge case\""}
        </ThoughtChip>
      </div>
    </div>
  );
}

function ThoughtChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <span
      className={`float-chip absolute hidden rounded-full border border-border/80 bg-card/90 px-3 py-1 font-mono text-[11px] text-accent shadow-lg backdrop-blur md:inline-block ${className ?? ""}`}
      style={{ animationDelay: delay, transform: "translateZ(70px)" }}
    >
      {children}
    </span>
  );
}
