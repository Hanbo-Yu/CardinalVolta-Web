import { useEffect, useRef, useState } from "react";

// Scene animations run only while visible; explicit pause survives scrolling.
export default function useSceneMotion() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () =>
      setAvailable(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return {
    ref,
    running: available && !paused,
    paused,
    toggle: () => setPaused((value) => !value),
  };
}
