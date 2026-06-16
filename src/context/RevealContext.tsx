import { createContext, useContext } from "react";

/**
 * Signals whether the preloader has finished and the desktop is now visible.
 * The Desktop uses this to delay mounting its windows/dock/topnav until the
 * overlay has exited, so their entrance animations play visibly on cue
 * instead of being spent behind the loader.
 */
export const RevealContext = createContext<boolean>(false);

export function useRevealed(): boolean {
  return useContext(RevealContext);
}
