import Image from "next/image";
import { Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { releaseFocus } from "@/lib/utils";
import logo from "../logo.png";

const iconButton =
  "size-10 shrink-0 rounded-full text-navy/70 hover:bg-navy-50 hover:text-navy focus-visible:ring-2";

export default function TopBar({ course, exam, fullscreen, soundOn, onToggleSound }) {
  const FullscreenIcon = fullscreen.isFullscreen ? Minimize2 : Maximize2;
  const fullscreenLabel = fullscreen.isFullscreen ? "Exit full screen" : "Full screen";
  const SoundIcon = soundOn ? Volume2 : VolumeX;

  return (
    <header className="border-b border-navy/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1720px] items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        <Image
          src={logo}
          alt="Sulaiman Alrajhi University"
          priority
          unoptimized
          className="h-7 w-auto min-[400px]:h-8 sm:h-10"
        />
        <div className="ml-auto text-right leading-tight">
          <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-navy/70 sm:block">
            {course}
          </p>
          <h1 className="text-sm font-bold text-navy sm:text-lg">{exam}</h1>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              onToggleSound();
              releaseFocus(event);
            }}
            aria-pressed={soundOn}
            aria-label="Chime when time is up"
            title={soundOn ? "Chime is on" : "Chime is off"}
            className={iconButton}
          >
            <SoundIcon aria-hidden="true" className="size-5" />
          </Button>
          {fullscreen.isSupported && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(event) => {
                fullscreen.toggle();
                releaseFocus(event);
              }}
              aria-label={fullscreenLabel}
              title={fullscreenLabel}
              className={`hidden sm:inline-flex ${iconButton}`}
            >
              <FullscreenIcon aria-hidden="true" className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
