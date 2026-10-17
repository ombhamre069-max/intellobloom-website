"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollMotion = {
  scrollY: number;
  progress: number;
  direction: 1 | -1;
  velocity: number;
};

const ScrollMotionContext = createContext<ScrollMotion>({
  scrollY: 0,
  progress: 0,
  direction: 1,
  velocity: 0,
});

export function useScrollMotion(): ScrollMotion {
  return useContext(ScrollMotionContext);
}

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [motion, setMotion] = useState<ScrollMotion>({
    scrollY: 0,
    progress: 0,
    direction: 1,
    velocity: 0,
  });
  const lastY = useRef(0);
  const raf = useRef<number | null>(null);

  const tick = useCallback(() => {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
    const direction = y >= lastY.current ? 1 : -1;
    const velocity = Math.abs(y - lastY.current);
    lastY.current = y;

    document.documentElement.style.setProperty("--scroll-y", String(y));
    document.documentElement.style.setProperty("--scroll-progress", String(progress));
    document.documentElement.style.setProperty(
      "--scroll-shift",
      String(y * 0.35),
    );
    document.documentElement.style.setProperty("--scroll-velocity", String(velocity));
    document.documentElement.style.setProperty(
      "--scroll-rotate",
      String(progress * 360),
    );

    setMotion({ scrollY: y, progress, direction, velocity });
    raf.current = null;
  }, []);

  useEffect(() => {
    if (reduced) {
      document.documentElement.style.setProperty("--scroll-y", "0");
      document.documentElement.style.setProperty("--scroll-progress", "0");
      document.documentElement.style.setProperty("--scroll-shift", "0");
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

  const value = useMemo(() => motion, [motion]);

  return (
    <ScrollMotionContext.Provider value={value}>
      {children}
    </ScrollMotionContext.Provider>
  );
}
