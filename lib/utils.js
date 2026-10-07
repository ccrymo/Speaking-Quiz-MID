import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// After a mouse click, move focus off the clicked control. Otherwise pressing
// Space (the start/pause shortcut) would click the same control again.
export function releaseFocus(event) {
  if (event.detail > 0) event.currentTarget.blur();
}
