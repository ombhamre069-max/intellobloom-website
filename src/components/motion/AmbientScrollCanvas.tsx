"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollMotion } from "@/hooks/useScrollMotion";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
};

type Pulse = {
  from: number;
  to: number;
  t: number;
  speed: number;
};

export function AmbientScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY, progress, velocity } = useScrollMotion();
  const scrollRef = useRef({ scrollY, progress, velocity });
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    scrollRef.current = { scrollY, progress, velocity };
  }, [scrollY, progress, velocity]);

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let rafId = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 42 : 72;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    };

    const drawHexGrid = (parallax: number, p: number) => {
      const size = 42;
      const offsetX = (scrollRef.current.scrollY * 0.02) % size;
      const offsetY = parallax * 0.15;
      ctx.strokeStyle = `rgba(112, 119, 128, ${0.06 + p * 0.05})`;
      ctx.lineWidth = 0.5;
      for (let x = -size; x < w + size; x += size) {
        for (let y = -size; y < h + size; y += size * 0.866) {
          const cx = x + offsetX + ((y / (size * 0.866)) % 2) * (size / 2);
          const cy = y + offsetY;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const ang = (Math.PI / 3) * i + Math.PI / 6;
            const px = cx + Math.cos(ang) * size * 0.35;
            const py = cy + Math.sin(ang) * size * 0.35;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      const { scrollY: sy, progress: p, velocity: vel } = scrollRef.current;
      const speedBoost = 1 + Math.min(vel * 0.02, 2);
      t += 0.012 * speedBoost;
      const parallax = sy * 0.1;

      ctx.clearRect(0, 0, w, h);

      drawHexGrid(parallax, p);

      const gradient = ctx.createRadialGradient(
        w * 0.5,
        h * 0.35 + parallax * 0.15,
        0,
        w * 0.5,
        h * 0.35,
        Math.max(w, h) * 0.75,
      );
      gradient.addColorStop(0, `rgba(242, 140, 40, ${0.07 + p * 0.06})`);
      gradient.addColorStop(0.45, `rgba(112, 119, 128, ${0.05 + p * 0.04})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;
      for (const node of nodes) {
        const flowX = Math.sin(t + node.phase + node.y * 0.008) * 0.35;
        const flowY = Math.cos(t * 0.9 + node.phase + node.x * 0.008) * 0.35;
        node.x += (node.vx + flowX) * speedBoost;
        node.y += (node.vy + flowY - parallax * 0.003) * speedBoost;

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            node.x += (dx / dist) * force * 0.6;
            node.y += (dy / dist) * force * 0.6;
          }
        }

        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      }

      const linkDist = w < 768 ? 110 : 145;
      const edges: { i: number; j: number; dist: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          edges.push({ i, j, dist });
          const alpha = (1 - dist / linkDist) * (0.18 + p * 0.12);
          ctx.strokeStyle = `rgba(242, 140, 40, ${alpha})`;
          ctx.lineWidth = 0.7 + (1 - dist / linkDist) * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pulses.length < 24 && edges.length > 0 && Math.random() < 0.08 * speedBoost) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({
          from: e.i,
          to: e.j,
          t: 0,
          speed: 0.008 + Math.random() * 0.012,
        });
      }

      for (const pulse of pulses) {
        pulse.t += pulse.speed * speedBoost;
        if (pulse.t > 1) continue;
        const a = nodes[pulse.from];
        const b = nodes[pulse.to];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;
        ctx.fillStyle = `rgba(242, 140, 40, ${0.9 - pulse.t * 0.5})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      pulses = pulses.filter((pl) => pl.t <= 1);

      for (const node of nodes) {
        const glow = 0.25 + Math.sin(t + node.phase) * 0.08 + p * 0.15;
        ctx.fillStyle = `rgba(112, 119, 128, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(242, 140, 40, ${0.35 + p * 0.2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="scroll-ambient-canvas pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}
