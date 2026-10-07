"use client";

import { useLayoutEffect } from "react";

const MIN_SCALE = 0.6;
const SEARCH_STEPS = 8;

/**
 * Shrinks the text inside `boxRef` (through the `--fit` CSS variable, a
 * multiplier from 0.6 to 1) until `contentRef` fits without scrolling.
 * Only applies while `query` matches (laptop and projector screens, where the
 * card fills exactly one screen); smaller screens simply scroll. If the text
 * still does not fit at the smallest size, the box becomes scrollable instead.
 */
export function useFitToHeight(boxRef, contentRef, query = "(min-width: 1024px)") {
  useLayoutEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return undefined;
    const media = window.matchMedia(query);
    let frame = 0;
    let active = true;

    const fitsAt = (scale) => {
      box.style.setProperty("--fit", String(scale));
      const style = getComputedStyle(box);
      const available =
        box.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom);
      // offsetHeight ignores transforms, so entrance animations don't skew this.
      return content.offsetHeight <= available + 0.5;
    };

    const fit = () => {
      box.style.overflowY = "";
      if (!media.matches) {
        box.style.removeProperty("--fit");
        return;
      }
      if (fitsAt(1)) return;
      if (!fitsAt(MIN_SCALE)) {
        box.style.overflowY = "auto";
        return;
      }
      let low = MIN_SCALE;
      let high = 1;
      for (let i = 0; i < SEARCH_STEPS; i++) {
        const mid = (low + high) / 2;
        if (fitsAt(mid)) low = mid;
        else high = mid;
      }
      fitsAt(low);
    };

    const scheduleFit = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    // Refit when the screen size changes or the content grows (a dropdown opens).
    const observer = new ResizeObserver(scheduleFit);
    observer.observe(box);
    observer.observe(content);
    // Re-measure once the web font has loaded and changed the text metrics.
    document.fonts?.ready.then(scheduleFit);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [boxRef, contentRef, query]);
}
