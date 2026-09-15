import { useEffect } from "react";

export default function usePageMotion(page) {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    const stories = [...document.querySelectorAll("[data-scroll-story]")];
    let scrollFrame = 0;
    function updateStories() {
      scrollFrame = 0;
      for (const story of stories) {
        const rect = story.getBoundingClientRect();
        const progress = preference.matches
          ? 1
          : Math.max(
              0,
              Math.min(
                1,
                (window.innerHeight * 0.85 - rect.top) / (rect.height * 0.85),
              ),
            );
        story.style.setProperty("--story-progress", progress.toFixed(3));
      }
    }
    function queueStories() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateStories);
    }
    if (stories.length) {
      window.addEventListener("scroll", queueStories, { passive: true });
      window.addEventListener("resize", queueStories);
      preference.addEventListener("change", queueStories);
      updateStories();
    }
    const showAll = () => {
      if (preference.matches) {
        elements.forEach((element) =>
          element.classList.remove("reveal-pending"),
        );
        observer.disconnect();
      }
    };
    if (!preference.matches) {
      for (const element of elements) {
        // The server-rendered page stays readable without JavaScript.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          observer.observe(element);
        }
      }
    }
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queueStories);
      window.removeEventListener("resize", queueStories);
      preference.removeEventListener("change", queueStories);
      preference.removeEventListener("change", showAll);
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [page]);
}
