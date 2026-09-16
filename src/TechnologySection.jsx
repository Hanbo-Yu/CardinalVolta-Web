import { useState } from "react";
import { CycleDiagram } from "./SourceImagery.jsx";

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
  return (
    <section
      className="technology technology-interactive"
      id="technology"
      aria-labelledby="tech-title"
    >
      <div className="shell">
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
        <div className="cycle-layout" data-reveal>
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
            <CycleDiagram
              active={active}
              label={`0${active + 1} / ${steps[active].title}`}
              detail={steps[active].text}
            />
          </div>
        </div>
        <p className="cycle-note">
          Organic Rankine Cycle · Simplified working principle
        </p>
      </div>
    </section>
  );
}
