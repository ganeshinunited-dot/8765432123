"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";

export interface CategoryPill {
  label: string;
  href: string;
  active: boolean;
}

/**
 * Horizontally scrollable category pill row — one shared row for Jobs,
 * News, Tech and Explore. The pills are plain links, so each filtered view
 * is a real URL (?category= / ?country= / ?topic=) that Google can crawl,
 * and Next.js moves between them without a full page reload.
 *
 * One row, no wrap: touch-scroll on mobile, drag + wheel on PC. A subtle
 * white fade at the right edge signals that the row slides; it hides once
 * the row is scrolled to the end. The active pill scrolls into view.
 * Pill colours match the existing filter row (signal-red active, neutral
 * inactive) — emerald-* utilities are remapped to Signal Red in globals.css.
 */
export function CategoryPills({ pills, ariaLabel = "Filter by category" }: { pills: CategoryPill[]; ariaLabel?: string }) {
  const rowRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [showFade, setShowFade] = useState(false);
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const activeHref = pills.find((p) => p.active)?.href;

  // Fade visibility, recomputed on scroll / resize.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setShowFade(row.scrollWidth > row.clientWidth + 4 && row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Keep the active pill visible whenever the filter changes.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
  }, [activeHref]);

  // PC: a vertical wheel over the row scrolls it sideways instead of the
  // page — except at either end, where the page scrolls as normal.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (row.scrollWidth <= row.clientWidth) return;
      const atStart = row.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      row.scrollLeft += e.deltaY;
    };
    row.addEventListener("wheel", onWheel, { passive: false });
    return () => row.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: ReactPointerEvent) => {
    const row = rowRef.current;
    if (!row || e.button !== 0) return;
    dragRef.current = { down: true, startX: e.clientX, startScroll: row.scrollLeft, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    const row = rowRef.current;
    const d = dragRef.current;
    if (!row || !d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    if (d.moved) row.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    dragRef.current.down = false;
  };
  // A drag that ends on a pill must not follow the link.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <div className="relative mt-6" onClickCapture={onClickCapture}>
      <nav
        ref={rowRef}
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="gx-no-scrollbar flex cursor-grab flex-nowrap gap-2 overflow-x-auto py-1 active:cursor-grabbing"
      >
        {pills.map((p) => (
          <Link
            key={p.label}
            ref={
              p.active
                ? (el) => {
                    activeRef.current = el;
                  }
                : undefined
            }
            href={p.href}
            aria-current={p.active ? "true" : undefined}
            draggable={false}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              p.active ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
            }`}
          >
            {p.label}
          </Link>
        ))}
      </nav>
      {showFade && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white" />
      )}
    </div>
  );
}
