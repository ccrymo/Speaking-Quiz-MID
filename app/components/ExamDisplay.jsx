"use client";

import { useCallback, useEffect, useState } from "react";
import exam from "../questions/questions.json";
import { useChime } from "@/hooks/useChime";
import { useCountdown } from "@/hooks/useCountdown";
import { useFullscreen } from "@/hooks/useFullscreen";
import CueCard from "./CueCard";
import TopBar from "./TopBar";

const { cards } = exam;
const DURATION_MS = exam.timeLimitSeconds * 1000;
const ALL_CARDS = cards.map((_, i) => i);
// The "You should say" prompts and useful words start hidden on every new topic.
const DROPDOWNS_CLOSED = { points: false, words: false };

// Picks a random topic that is not on screen and has not been shown yet in
// this round. Once every topic has been used, a new round begins.
function drawNextCard(current, seen) {
  let pool = ALL_CARDS.filter((i) => i !== current && !seen.includes(i));
  let nextSeen = seen;
  if (pool.length === 0) {
    pool = ALL_CARDS.filter((i) => i !== current);
    nextSeen = [current];
  }
  if (pool.length === 0) return { index: current, seen };
  const index = pool[Math.floor(Math.random() * pool.length)];
  return { index, seen: [...nextSeen, index] };
}

export default function ExamDisplay() {
  const [deck, setDeck] = useState({ index: 0, seen: [0] });
  const [reveal, setReveal] = useState(DROPDOWNS_CLOSED);
  const [soundOn, setSoundOn] = useState(true);
  const { prime: primeChime, play: playChime } = useChime();
  const fullscreen = useFullscreen();
  const { status, remaining, toggle, reset } = useCountdown(DURATION_MS, () => {
    if (soundOn) playChime();
  });

  const card = cards[deck.index];

  const toggleTimer = useCallback(() => {
    // Starting the timer is a user gesture, which lets the browser play the chime later.
    primeChime();
    toggle();
  }, [primeChime, toggle]);

  const changeTopic = useCallback(() => {
    setDeck(drawNextCard(deck.index, deck.seen));
    setReveal(DROPDOWNS_CLOSED);
    reset();
  }, [deck, reset]);

  const toggleReveal = useCallback(
    (section) => setReveal((open) => ({ ...open, [section]: !open[section] })),
    []
  );

  const toggleSound = useCallback(() => setSoundOn((on) => !on), []);

  // Keyboard shortcuts for the examiner: Space start/pause, N or → change topic,
  // R reset, P show/hide prompts, W show/hide useful words.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.defaultPrevented || event.repeat) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      switch (event.key) {
        case " ":
          // A focused button handles Space itself.
          if (target?.closest("button, a[href]")) return;
          event.preventDefault();
          toggleTimer();
          break;
        case "n":
        case "N":
        case "ArrowRight":
          event.preventDefault();
          changeTopic();
          break;
        case "r":
        case "R":
          event.preventDefault();
          reset();
          break;
        case "p":
        case "P":
          event.preventDefault();
          toggleReveal("points");
          break;
        case "w":
        case "W":
          event.preventDefault();
          toggleReveal("words");
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTimer, changeTopic, reset, toggleReveal]);

  const timer = { status, remaining, toggle: toggleTimer, reset };
  const announcement =
    status === "finished" ? "Time's up." : `Topic: ${card.topic}`;

  return (
    <div className="exam-backdrop flex min-h-dvh flex-col lg:h-dvh">
      <TopBar
        course={exam.course}
        exam={exam.exam}
        fullscreen={fullscreen}
        soundOn={soundOn}
        onToggleSound={toggleSound}
      />

      {/* Phones and tablets scroll; from lg up, the card fits on one screen. */}
      <main className="mx-auto flex w-full max-w-[1720px] flex-1 flex-col px-3 py-4 sm:px-6 sm:py-6 lg:min-h-0 lg:px-8 lg:py-[clamp(0.75rem,2.5vh,1.5rem)]">
        <CueCard
          card={card}
          timer={timer}
          duration={DURATION_MS}
          onChangeTopic={changeTopic}
          reveal={reveal}
          onToggleReveal={toggleReveal}
        />
      </main>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
