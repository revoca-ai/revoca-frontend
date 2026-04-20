"use client";

import { useEffect, useRef } from "react";

/**
 * Intercepts wheel and touch events and drives full-page navigation.
 * Any scroll attempt — no matter how small — jumps to the next/previous section.
 * The lock prevents multiple rapid transitions while the animation plays.
 */
export default function FullPageScroll() {
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Only activate on laptop/desktop screens (≥1024px)
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll("main > section"));

    // Keep currentIndex in sync even when nav anchor links are used
    const sections = getSections();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) currentIndex.current = idx;
          }
        }
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));

    const goTo = (index: number) => {
      const all = getSections();
      if (index < 0 || index >= all.length || isScrolling.current) return;
      isScrolling.current = true;
      currentIndex.current = index;
      all[index].scrollIntoView({ behavior: "smooth" });
      // Release lock after animation — 1 s covers the smooth-scroll duration
      // and the trackpad's initial momentum burst before deltas shrink below 15.
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    // --- Wheel (desktop) ---
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      // Ignore tiny deltas — these are trackpad momentum tail-end events that
      // arrive after the lock expires and would cause an unintended second jump.
      if (Math.abs(e.deltaY) < 15) return;
      goTo(currentIndex.current + (e.deltaY > 0 ? 1 : -1));
    };

    // --- Touch (mobile) ---
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      // Prevent rubber-band / native scroll on iOS
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return; // ignore accidental taps
      goTo(currentIndex.current + (delta > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
