"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollMotion = {
  scrollY: number;
  progress: number;
  direction: 1 | -1;
  velocity: number;
};

const defaultMotion: ScrollMotion = {
  scrollY: 0,
  progress: 0,
  direction: 1,
  velocity: 0,
};

const motionRef: { current: ScrollMotion } = { current: defaultMotion };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return motionRef.current;
}

export function useScrollMotion(): ScrollMotion {
  return useSyncExternalStore(subscribe, getSnapshot, () => defaultMotion);
}

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lastY = useRef(0);
  const raf = useRef<number | null>(null);
  const lastEmit = useRef(0);

  const tick = useCallback(() => {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
    const direction = y >= lastY.current ? 1 : -1;
    const velocity = Math.abs(y - lastY.current);
    lastY.current = y;

    document.documentElement.style.setProperty("--scroll-y", String(y));
    document.documentElement.style.setProperty("--scroll-progress", String(progress));
    document.documentElement.style.setProperty("--scroll-shift", String(y * 0.35));
    document.documentElement.style.setProperty("--scroll-velocity", String(velocity));
    document.documentElement.style.setProperty("--scroll-rotate", String(progress * 360));

    motionRef.current = { scrollY: y, progress, direction, velocity };

    const now = performance.now();
    if (now - lastEmit.current > 120) {
      lastEmit.current = now;
      emit();
    }

    raf.current = null;
  }, []);

  useEffect(() => {
    if (reduced) {
      document.documentElement.style.setProperty("--scroll-y", "0");
      document.documentElement.style.setProperty("--scroll-progress", "0");
      document.documentElement.style.setProperty("--scroll-shift", "0");
      motionRef.current = defaultMotion;
      emit();
      return;
    }

    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
    };
  }, [reduced, tick]);

  return children;
}
