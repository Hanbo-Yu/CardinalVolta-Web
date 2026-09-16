import { useEffect, useState } from "react";
import DynamicCycle from "./DynamicCycle.jsx";
import useSceneMotion from "./useSceneMotion.js";

const steps = [
  {
    title: "Recover heat",
    part: "Evaporator",
    text: "Heat from an industrial process vaporizes a working fluid in the evaporator.",
  },
  {
    title: "Generate electricity",
    part: "Expander + generator",
    text: "The vapor expands through an expander connected to a generator, producing electricity.",
  },
  {
    title: "Condense the fluid",
    part: "Condenser",
    text: "The working fluid releases heat to a cooling system and returns to its liquid state.",
  },
  {
    title: "Repeat the cycle",
    part: "Pump",
    text: "A pump raises the fluid pressure and returns it to the evaporator, completing the closed loop.",
  },
];

export default function TechnologySection() {
  const [active, setActive] = useState(0);
  const motion = useSceneMotion();
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 1000px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      if (!query.matches) return;
      const box = motion.ref.current.getBoundingClientRect();
      if (box.top > 40 || box.bottom < innerHeight) return;
      const progress = Math.max(
        0,
        Math.min(0.999, (40 - box.top) / Math.max(1, box.height - innerHeight)),
      );
      const next = Math.floor(progress * 4);
      if (next !== last) {
        last = next;
        setActive(next);
      }
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    query.addEventListener("change", queue);
    update();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      query.removeEventListener("change", queue);
    };
  }, [motion.ref]);
  return (
    <section
      ref={motion.ref}
      className={`technology technology-interactive technology-motion motion-scene ${motion.running ? "scene-running" : ""}`}
      id="technology"
      aria-labelledby="tech-title"
    >
      <div className="shell technology-stage">
        <div className="technology-opening" data-reveal>
          <div>
            <p className="section-title">Technology</p>
            <h2 id="tech-title">How it works.</h2>
          </div>
          <p>
            Our approach uses the Organic Rankine Cycle to turn recovered
            industrial heat into electricity.
          </p>
        </div>
        <div className="cycle-layout">
          <div
            className="cycle-steps"
            role="group"
            aria-label="Explore the four cycle stages"
          >
            {steps.map((step, index) => (
              <button
                key={step.part}
                className={`cycle-step ${active === index ? "is-active" : ""}`}
                type="button"
                aria-pressed={active === index}
                aria-controls="cycle-explanation"
                onClick={() => setActive(index)}
              >
                <span className="cycle-step-number">0{index + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  <span>{step.part}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div id="cycle-explanation" aria-live="polite" aria-atomic="true">
            <DynamicCycle
              active={active}
              label={`0${active + 1} / ${steps[active].title}`}
              detail={steps[active].text}
            />
          </div>
        </div>
        <div className="cycle-scene-footer">
          <p>
            <span className="scroll-cycle-hint">
              Scroll to follow the cycle ·{" "}
            </span>
            Select a stage to explore
          </p>
          <button
            type="button"
            className="scene-toggle"
            aria-pressed={motion.paused}
            onClick={motion.toggle}
          >
            {motion.paused ? "Resume cycle animation" : "Pause cycle animation"}
          </button>
          <span>Simplified working principle</span>
        </div>
      </div>
    </section>
  );
}
