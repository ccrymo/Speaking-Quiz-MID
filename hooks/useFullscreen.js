"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

const getIsFullscreen = () => Boolean(document.fullscreenElement);
const getIsSupported = () => Boolean(document.fullscreenEnabled);
const getServerSnapshot = () => false;

/** Fullscreen state for the whole page, so the cue card can fill a projector screen. */
export function useFullscreen() {
  const isFullscreen = useSyncExternalStore(
    subscribe,
    getIsFullscreen,
    getServerSnapshot
  );
  const isSupported = useSyncExternalStore(
    subscribe,
    getIsSupported,
    getServerSnapshot
  );

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  return { isFullscreen, isSupported, toggle };
}
