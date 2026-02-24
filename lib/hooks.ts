"use client";

import { useState, useEffect, useEffectEvent } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);
  const update = useEffectEvent((val: boolean) => {
    setMatches(val);
  });
  useEffect(() => {
    if (typeof window === "undefined") return; // Guard for SSR

    const mediaQuery = window.matchMedia(query);

    // Set initial
    update(mediaQuery.matches);

    // Listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      update(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
