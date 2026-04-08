"use client";

import { useEffect, useRef, useState } from "react";

function parse(val: string): { num: number; suffix: string } {
  const m = val.match(/^([\d,]+)(\+|%)?(.*)$/);
  if (!m) return { num: 0, suffix: val };
  return { num: parseInt(m[1].replace(/,/g, "")), suffix: (m[2] ?? "") + (m[3] ?? "") };
}

export function CountUp({ value }: { value: string }) {
  const { num, suffix } = parse(value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(ease * num));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
