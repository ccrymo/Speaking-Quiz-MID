"use client";

import { memo, useRef } from "react";
import { ChevronDown, Lightbulb, ListChecks, Shuffle } from "lucide-react";
import { useFitToHeight } from "@/hooks/useFitToHeight";
import { cn, releaseFocus } from "@/lib/utils";
import { HeaderTimer, TimerProgress } from "./HeaderTimer";

// Three slanted bands that echo the ribbons in the university logo.
function Ribbons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-[55%] max-w-[520px]"
    >
      <span className="absolute right-[-6%] top-[14%] h-[20%] w-[56%] rotate-[-4deg] skew-x-[-24deg] bg-brand-cyan/25" />
      <span className="absolute right-[-10%] top-[40%] h-[22%] w-[84%] rotate-[-4deg] skew-x-[-24deg] bg-brand-purple/50" />
      <span className="absolute right-[-4%] top-[68%] h-[17%] w-[44%] rotate-[-4deg] skew-x-[-24deg] bg-brand-gray/20" />
    </div>
  );
}

// A pill that shows or hides one of the optional parts of the card.
function DropdownToggle({ panelId, icon: Icon, label, count, countLabel, shortcut, open, onToggle }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={(event) => {
        onToggle();
        releaseFocus(event);
      }}
      title={`${open ? "Hide" : "Show"} (${shortcut})`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-3 text-sm font-semibold ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base",
        open
          ? "bg-navy text-white shadow-md shadow-navy/25 ring-navy"
          : "bg-white text-navy shadow-sm ring-navy/20 hover:-translate-y-0.5 hover:bg-navy-50"
      )}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0 sm:size-5" />
      {label}
      <span
        className={cn(
          "grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold",
          open ? "bg-white/20 text-white" : "bg-navy/10 text-navy"
        )}
      >
        {count}
        <span className="sr-only"> {countLabel}</span>
      </span>
      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 shrink-0 transition-transform duration-300", open && "rotate-180")}
      />
    </button>
  );
}

// The question and its optional prompts. Remounted for each new topic so the
// entrance animation replays and the text is re-fitted to the screen.
const CardBody = memo(function CardBody({ card, reveal, onToggleReveal }) {
  const bodyRef = useRef(null);
  const contentRef = useRef(null);
  useFitToHeight(bodyRef, contentRef);

  return (
    <div
      ref={bodyRef}
      className="cue-body flex min-h-0 flex-1 flex-col overflow-hidden px-5 sm:px-10"
    >
      <div
        ref={contentRef}
        className="cue-stack mx-auto my-auto flex w-full max-w-7xl flex-col items-center text-center"
      >
        <p
          className="cue-task animate-rise-in text-balance font-bold text-navy-900"
          style={{ animationDelay: "80ms" }}
        >
          {card.task}
        </p>

        <div
          className="flex animate-rise-in flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "180ms" }}
        >
          <DropdownToggle
            panelId="cue-card-points"
            icon={ListChecks}
            label="You should say"
            count={card.youShouldSay.length}
            countLabel="prompts"
            shortcut="P"
            open={reveal.points}
            onToggle={() => onToggleReveal("points")}
          />
          <DropdownToggle
            panelId="cue-card-words"
            icon={Lightbulb}
            label="Useful words and expressions"
            count={card.usefulWords.length}
            countLabel="words and expressions"
            shortcut="W"
            open={reveal.words}
            onToggle={() => onToggleReveal("words")}
          />
        </div>

        <div id="cue-card-points" hidden={!reveal.points} className="w-full">
          <div className="cue-point animate-rise-in rounded-2xl bg-navy-50/60 px-[1.2em] py-[0.9em] ring-1 ring-navy/10">
            <ol className="mx-auto w-fit max-w-full space-y-[0.55em] text-left text-slate-700">
              {card.youShouldSay.map((point, i) => (
                <li
                  key={point}
                  className="flex animate-rise-in items-start gap-[0.7em]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-[1.9em] shrink-0 place-items-center rounded-full bg-white text-[0.72em] font-semibold text-navy ring-1 ring-navy/15"
                  >
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div id="cue-card-words" hidden={!reveal.words} className="w-full">
          <ul className="cue-chip flex animate-rise-in flex-wrap justify-center gap-[0.5em] rounded-2xl border border-dashed border-navy/20 bg-navy-50/40 px-[1em] py-[0.8em]">
            {card.usefulWords.map((word, i) => (
              <li
                key={word}
                className="animate-rise-in rounded-full bg-white px-[0.85em] py-[0.35em] font-medium text-navy shadow-sm ring-1 ring-navy/15"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default function CueCard({
  card,
  timer,
  duration,
  onChangeTopic,
  reveal,
  onToggleReveal,
}) {
  return (
    <article
      aria-labelledby="cue-card-topic"
      className="flex flex-1 animate-card-in flex-col overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-navy/10 lg:min-h-0"
    >
      <header className="relative isolate shrink-0 overflow-hidden bg-navy px-4 pb-5 pt-4 text-white sm:px-8 sm:pb-6 sm:pt-5 lg:pb-[clamp(0.9rem,2.4vh,1.6rem)] lg:pt-[clamp(0.75rem,2.2vh,1.5rem)]">
        <Ribbons />
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-6">
          <button
            type="button"
            onClick={(event) => {
              onChangeTopic();
              releaseFocus(event);
            }}
            aria-label="Change topic"
            title="Change topic (N)"
            className={cn(
              "group grid size-12 shrink-0 place-items-center justify-self-start rounded-2xl bg-white text-navy shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:translate-y-0 active:scale-95 sm:size-14 lg:size-[clamp(3rem,7.4vh,4.25rem)]",
              timer.status === "finished" && "animate-attention"
            )}
          >
            <Shuffle
              aria-hidden="true"
              className="size-[44%] transition-transform duration-500 group-hover:rotate-180"
            />
          </button>

          <h2
            key={card.id}
            id="cue-card-topic"
            className="cue-topic animate-rise-in text-balance font-semibold sm:text-center"
          >
            {card.topic}
          </h2>

          <HeaderTimer
            status={timer.status}
            remaining={timer.remaining}
            onToggle={timer.toggle}
            onReset={timer.reset}
            className="col-span-2 sm:col-span-1 sm:justify-self-end"
          />
        </div>
        <TimerProgress
          status={timer.status}
          remaining={timer.remaining}
          duration={duration}
        />
      </header>

      <CardBody
        key={card.id}
        card={card}
        reveal={reveal}
        onToggleReveal={onToggleReveal}
      />
    </article>
  );
}
