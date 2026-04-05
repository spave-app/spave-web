"use client";
import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 2500, delay = 300) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Piecewise: first 50% of time covers 80% of numbers (fast),
    // last 50% of time crawls through the final 20% (very noticeable slowdown).
    const fastEnd = Math.round(target * 0.8);
    const timeSplit = 0.5;

    const start = performance.now();
    const timer = setTimeout(() => {
      function step(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        let value: number;
        if (progress < timeSplit) {
          value = (progress / timeSplit) * fastEnd;
        } else {
          const slowProgress = (progress - timeSplit) / (1 - timeSplit);
          value = fastEnd + slowProgress * (target - fastEnd);
        }
        setCount(Math.round(value));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return count;
}
