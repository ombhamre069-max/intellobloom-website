"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
};

function linkNeighbors(nodes: Node[], linkDist: number): [number, number][] {
  const cell = linkDist;
  const grid = new Map<string, number[]>();
  const pairs: [number, number][] = [];

  for (let i = 0; i < nodes.length; i++) {
    const cx = Math.floor(nodes[i].x / cell);
    const cy = Math.floor(nodes[i].y / cell);
    const key = `${cx},${cy}`;
    const bucket = grid.get(key);
    if (bucket) bucket.push(i);
    else grid.set(key, [i]);
  }

  const seen = new Set<string>();
  for (const [key, indices] of grid) {
    const [cx, cy] = key.split(",").map(Number);
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const neighbor = grid.get(`${cx + ox},${cy + oy}`);
        if (!neighbor) continue;
        for (const i of indices) {
          for (const j of neighbor) {
            if (i >= j) continue;
            const id = `${i}-${j}`;
            if (seen.has(id)) continue;
            const a = nodes[i];
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist <= linkDist) {
              seen.add(id);
              pairs.push([i, j]);
            }
          }
        }
      }
    }
  }
  return pairs;
}

export function AmbientScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const scrollRef = useRef({ progress: 0, scrollY: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pairs: [number, number][] = [];
    let rafId = 0;
    let t = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 18 : 32;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
      const linkDist = w < 768 ? 95 : 120;
      pairs = linkNeighbors(nodes, linkDist);
    };

    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible) rafId = window.requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const draw = () => {
      if (!visible) return;

      frame += 1;
      readScrollFromDom();
      const { progress: p, scrollY: sy } = scrollRef.current;
      const parallax = sy * 0.06;
      t += 0.008;

      ctx.clearRect(0, 0, w, h);

      if (frame % 2 === 0) {
        const gradient = ctx.createRadialGradient(
          w * 0.5,
          h * 0.32 + parallax * 0.1,
          0,
          w * 0.5,
          h * 0.32,
          Math.max(w, h) * 0.65,
        );
        gradient.addColorStop(0, `rgba(37, 99, 235, ${0.045 + p * 0.035})`);
        gradient.addColorStop(0.5, `rgba(100, 116, 139, ${0.04 + p * 0.03})`);
        gradient.addColorStop(1, "rgba(248, 250, 252, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      const mouse = mouseRef.current;
      for (const node of nodes) {
        node.x += node.vx + Math.sin(t + node.phase) * 0.12;
        node.y += node.vy + Math.cos(t * 0.85 + node.phase) * 0.12 - parallax * 0.002;

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            node.x += (dx / dist) * force * 0.35;
            node.y += (dy / dist) * force * 0.35;
          }
        }

        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      }

      for (const [i, j] of pairs) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const linkDist = w < 768 ? 95 : 120;
        const alpha = (1 - dist / linkDist) * (0.1 + p * 0.08);
        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const node of nodes) {
        ctx.fillStyle = `rgba(100, 116, 139, ${0.2 + p * 0.1})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    function readScrollFromDom() {
      const y = Number(document.documentElement.style.getPropertyValue("--scroll-y")) || window.scrollY;
      const p =
        Number(document.documentElement.style.getPropertyValue("--scroll-progress")) || 0;
      scrollRef.current = { scrollY: y, progress: p };
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = window.requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
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
