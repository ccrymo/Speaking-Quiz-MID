"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

const TICK_MS = 200;

function initialState(duration) {
  return { status: "idle", remaining: duration, endsAt: 0 };
}

// The countdown is driven by an absolute end time rather than by counting
// ticks, so it stays accurate even when the browser throttles timers
// (for example in a background tab).
function reducer(state, action) {
  switch (action.type) {
    case "toggle": {
      if (state.status === "running") {
        return {
          status: "paused",
          remaining: Math.max(0, state.endsAt - action.now),
          endsAt: 0,
        };
      }
      const remaining =
        state.status === "finished" ? action.duration : state.remaining;
      return { status: "running", remaining, endsAt: action.now + remaining };
    }
    case "tick": {
      if (state.status !== "running") return state;
      const remaining = Math.max(0, state.endsAt - action.now);
      if (remaining === 0) return { status: "finished", remaining: 0, endsAt: 0 };
      return { ...state, remaining };
    }
    case "reset":
      return initialState(action.duration);
    default:
      return state;
  }
}

/**
 * A pausable countdown.
 * status is "idle" | "running" | "paused" | "finished".
 * onFinish is called once each time the countdown reaches zero.
 */
export function useCountdown(duration, onFinish) {
  const [state, dispatch] = useReducer(reducer, duration, initialState);

  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    if (state.status !== "running") return undefined;
    const id = setInterval(
      () => dispatch({ type: "tick", now: Date.now() }),
      TICK_MS
    );
    return () => clearInterval(id);
  }, [state.status]);

  useEffect(() => {
    if (state.status === "finished") onFinishRef.current?.();
  }, [state.status]);

  // Start, pause, resume, or (once finished) start again from the top.
  const toggle = useCallback(
    () => dispatch({ type: "toggle", now: Date.now(), duration }),
    [duration]
  );
  const reset = useCallback(
    () => dispatch({ type: "reset", duration }),
    [duration]
  );

  return { status: state.status, remaining: state.remaining, toggle, reset };
}

/** Formats milliseconds as m:ss, rounding up so the clock shows 0:00 only at the end. */
export function formatClock(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
