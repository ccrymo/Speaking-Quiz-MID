"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { formatClock } from "@/hooks/useCountdown";
import { cn, releaseFocus } from "@/lib/utils";

const STATUS_LABEL = {
  idle: "Ready",
  running: "Speaking",
  paused: "Paused",
  finished: "Time's up!",
};

const TOGGLE = {
  idle: { label: "Start timer", Icon: Play, filled: true },
  running: { label: "Pause timer", Icon: Pause, filled: true },
  paused: { label: "Resume timer", Icon: Play, filled: true },
  finished: { label: "Restart timer", Icon: RotateCcw, filled: false },
};

// Colour cues: amber for the last 30 seconds, red for the last 10.
function getPhase(status, remaining) {
  if (status === "finished") return "done";
  if (remaining <= 10_000) return "danger";
  if (remaining <= 30_000) return "warning";
  return "normal";
}

const DIGIT_COLOR = {
  normal: "text-white",
  warning: "text-amber-300",
  danger: "text-rose-300",
  done: "text-white",
};

const BAR_COLOR = {
  normal: "from-sky-300 to-brand-cyan",
  warning: "from-amber-200 to-amber-400",
  danger: "from-rose-300 to-rose-500",
  done: "from-rose-300 to-rose-500",
};

/** Countdown with play/pause, shown on the right of the topic banner. */
export function HeaderTimer({ status, remaining, onToggle, onReset, className }) {
  const phase = getPhase(status, remaining);
  const { label, Icon, filled } = TOGGLE[status];
  const finished = status === "finished";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl py-2 pl-4 pr-2 ring-1 backdrop-blur-sm transition-colors",
        finished ? "bg-rose-500/90 ring-rose-200/60" : "bg-white/10 ring-white/15",
        className
      )}
    >
      <div className="mr-auto sm:mr-0 sm:text-right">
        <div
          role="timer"
          className={cn(
            "font-mono text-[clamp(1.75rem,4.4vh,2.75rem)] font-bold leading-none tabular-nums",
            DIGIT_COLOR[phase],
            finished && "animate-blink"
          )}
        >
          {formatClock(remaining)}
        </div>
        <div
          className={cn(
            "mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em]",
            finished ? "text-white" : "text-sky-200"
          )}
        >
          {STATUS_LABEL[status]}
        </div>
      </div>

      {(status === "running" || status === "paused") && (
        <button
          type="button"
          onClick={(event) => {
            onReset();
            releaseFocus(event);
          }}
          aria-label="Reset timer"
          title="Reset timer (R)"
          className="grid size-10 shrink-0 place-items-center rounded-full text-white/85 ring-1 ring-white/30 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          <RotateCcw aria-hidden="true" className="size-[18px]" />
        </button>
      )}

      <button
        type="button"
        onClick={(event) => {
          onToggle();
          releaseFocus(event);
        }}
        aria-label={label}
        title={`${label} (Space)`}
        className="grid size-[clamp(2.75rem,6.4vh,3.5rem)] shrink-0 place-items-center rounded-full bg-white text-navy shadow-lg shadow-black/25 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:scale-95"
      >
        <Icon
          aria-hidden="true"
          className={cn("size-[45%]", Icon === Play && "translate-x-[6%]")}
          fill={filled ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}

/** Thin bar along the bottom of the banner that drains as time runs out. */
export function TimerProgress({ status, remaining, duration }) {
  const phase = getPhase(status, remaining);
  const progress = duration > 0 ? remaining / duration : 0;

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-white/10">
      <div
        className={cn("h-full bg-gradient-to-r", BAR_COLOR[phase])}
        style={{
          width: `${progress * 100}%`,
          transition:
            status === "running"
              ? "width 200ms linear"
              : "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
