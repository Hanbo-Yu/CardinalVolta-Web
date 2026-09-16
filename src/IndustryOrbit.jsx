import { useEffect, useRef, useState } from "react";
import { industries } from "./home-content.js";

const TURN = Math.PI * 2;
const STEP = TURN / industries.length;

// Position each image on an ellipse, with a shallow perspective and depth.
function paintOrbit(nodes, phase) {
  nodes.forEach((node, index) => {
    if (!node) return;
    const angle = phase + index * STEP;
    const depth = (Math.cos(angle) + 1) / 2;
    node.style.left = `${50 + Math.sin(angle) * 31}%`;
    node.style.top = `${45 + Math.cos(angle) * 25}%`;
    node.style.transform = `translate(-50%, -50%) scale(${0.66 + depth * 0.34}) rotateY(${-Math.sin(angle) * 13}deg)`;
    node.style.opacity = `${0.53 + depth * 0.47}`;
    node.style.zIndex = `${10 + Math.round(depth * 90)}`;
    node.style.setProperty("--image-saturation", `${0.35 + depth * 0.65}`);
  });
}

export default function IndustryOrbit({ active, onSelect, focusRequest = 0 }) {
  const scene = useRef(null);
  const nodes = useRef([]);
  const phase = useRef(0);
  const previous = useRef(`${active}:${focusRequest}`);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [focused, setFocused] = useState(false);
  const [preview, setPreview] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const request = `${active}:${focusRequest}`;
    if (previous.current !== request) {
      previous.current = request;
      setPaused(true);
      setDestination(industries.findIndex((item) => item.id === active));
    }
  }, [active, focusRequest]);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      setReduced(preference.matches);
      setAvailable(visible && !document.hidden);
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

  useEffect(() => {
    let frame = 0;
    let lastTime;
    let startTime;
    const from = phase.current;
    const desired = destination === null ? from : -destination * STEP;
    const distance = Math.atan2(
      Math.sin(desired - from),
      Math.cos(desired - from),
    );
    paintOrbit(nodes.current, phase.current);
    if (reduced && destination !== null) {
      phase.current = from + distance;
      paintOrbit(nodes.current, phase.current);
      setDestination(null);
      return;
    }
    const running = available && !reduced && !paused && !engaged && !focused;
    if (!available || (destination === null && !running)) return;
    const tick = (time) => {
      if (startTime === undefined) startTime = time;
      if (destination !== null) {
        const progress = Math.min(1, (time - startTime) / 1100);
        // Smooth acceleration and deceleration; always take the shorter arc.
        const eased = progress * progress * (3 - 2 * progress);
        phase.current = from + distance * eased;
        paintOrbit(nodes.current, phase.current);
        if (progress === 1) {
          setDestination(null);
          return;
        }
      } else {
        const delta =
          lastTime === undefined ? 0 : Math.min(time - lastTime, 50);
        phase.current = (phase.current + delta * 0.000075) % TURN;
        paintOrbit(nodes.current, phase.current);
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [available, reduced, paused, engaged, focused, destination]);

  const selected = industries.find((item) => item.id === (preview || active));
  return (
    <div className="industry-gallery" ref={scene}>
      <div
        className="industry-gallery-stage"
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setEngaged(true);
        }}
        onPointerLeave={() => {
          setEngaged(false);
          setPreview(null);
        }}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false);
            setPreview(null);
          }
        }}
        role="group"
        aria-label="Explore an industry"
      >
        <svg
          className="gallery-arc"
          viewBox="0 0 600 440"
          fill="none"
          aria-hidden="true"
        >
          <path d="M65 233C65 150 535 150 535 233" />
          <path d="M65 233C65 332 535 332 535 233" />
        </svg>
        <div className="gallery-center" aria-hidden="true">
          <span>Waste heat</span>
          <span className="gallery-center-line" />
          <strong>
            Electricity <span>↗</span>
          </strong>
        </div>
        {industries.map((item, index) => {
          const depth = (Math.cos(index * STEP) + 1) / 2;
          return (
            <button
              key={item.id}
              ref={(element) => {
                nodes.current[index] = element;
              }}
              className={`gallery-image ${active === item.id ? "is-selected" : ""}`}
              style={{
                left: `${50 + Math.sin(index * STEP) * 31}%`,
                top: `${45 + Math.cos(index * STEP) * 25}%`,
                transform: `translate(-50%, -50%) scale(${0.66 + depth * 0.34})`,
                zIndex: 10 + Math.round(depth * 90),
              }}
              type="button"
              aria-label={`Explore ${item.name}`}
              aria-pressed={active === item.id}
              aria-controls={`industry-panel-${item.id}`}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setPreview(item.id);
              }}
              onPointerLeave={() => setPreview(null)}
              onFocus={() => setPreview(item.id)}
              onClick={() => {
                setPaused(true);
                setPreview(null);
                setDestination(index);
                onSelect(item.id);
              }}
            >
              <img
                src={`/assets/${item.image}-640.webp`}
                alt=""
                width="640"
                height="480"
                loading="lazy"
                style={{ objectPosition: item.position }}
              />
              <span className="gallery-image-index" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="gallery-image-corner" aria-hidden="true">
                ↗
              </span>
            </button>
          );
        })}
      </div>
      <div className="gallery-footer">
        <div className="gallery-current">
          <span className="gallery-count">
            0{industries.indexOf(selected) + 1} / 04
          </span>
          <span>{selected.name}</span>
        </div>
        {!reduced && (
          <button
            className="gallery-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => {
              setDestination(null);
              setPaused(!paused);
            }}
          >
            {paused ? "Resume motion" : "Pause motion"}
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
