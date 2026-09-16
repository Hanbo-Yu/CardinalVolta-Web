import { useEffect, useRef, useState } from "react";
import { industries } from "./home-content.js";

export default function IndustryOrbit({ active, onSelect }) {
  const scene = useRef(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      setReduced(preference.matches);
      setAvailable(visible && !document.hidden && !preference.matches);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(scene.current);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div
      ref={scene}
      className={`industry-orbit ${available && !paused ? "is-running" : ""}`}
    >
      <div className="orbit-scene">
        <div className="orbit-ring" aria-hidden="true" />
        <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />
        <div className="orbit-center">
          <span>Waste heat</span>
          <span className="orbit-conversion" aria-hidden="true">
            ↓
          </span>
          <strong>Electricity</strong>
        </div>
        <div
          className="orbital-track"
          role="group"
          aria-label="Explore an industry"
        >
          {industries.map((item, i) => (
            <div className={`orbit-position orbit-position-${i}`} key={item.id}>
              <div className="orbit-counterweight">
                <button
                  className={`orbit-node ${active === item.id ? "is-active" : ""}`}
                  type="button"
                  aria-label={`Explore ${item.name}`}
                  aria-pressed={active === item.id}
                  aria-controls={`industry-panel-${item.id}`}
                  onClick={() => onSelect(item.id)}
                >
                  <img
                    src={`/assets/${item.image}-640.webp`}
                    alt=""
                    width="160"
                    height="120"
                    loading="lazy"
                    style={{ objectPosition: item.position }}
                  />
                  <span>
                    {item.name}
                    <span aria-hidden="true">↗</span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="orbit-caption">
        <span>Different processes. Shared potential.</span>
        {!reduced && (
          <button
            className="orbit-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume motion" : "Pause motion"}
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
