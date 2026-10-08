"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Scroll-reveal wrapper: children rise + fade in the first time they enter
 * the viewport. The hidden state is applied via JS only (useLayoutEffect,
 * before paint), so no-JS users and crawlers always see the content.
 * Stagger siblings with the `delay` prop (ms).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("gx-reveal");
    const show = () => el.classList.add("is-visible");
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ "--gx-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
