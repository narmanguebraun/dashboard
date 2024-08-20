"use client";

import { useState, useEffect } from "react";

// RESOURCES
// https://github.com/vercel/next.js/discussions/14810#discussioncomment-8884615

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches) {
      setMatches(true);
    }

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
