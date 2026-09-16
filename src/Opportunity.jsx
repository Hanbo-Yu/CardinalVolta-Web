import { useState } from "react";
import EnergyScene from "./EnergyScene.jsx";
import useSceneMotion from "./useSceneMotion.js";

export default function Opportunity() {
  const [recovery, setRecovery] = useState(true);
  const motion = useSceneMotion();
  return (
    <section
      ref={motion.ref}
      className={`opportunity opportunity-pathway motion-scene ${motion.running ? "scene-running" : ""}`}
      aria-labelledby="opportunity-title"
    >
      <div className="shell">
        <div className="opportunity-opening" data-reveal>
          <div>
            <p className="section-title">The opportunity</p>
            <h2 id="opportunity-title">
              A second use
              <br />
              for industrial heat.
            </h2>
          </div>
          <p>
            Heat leaves industrial processes through exhaust and cooling
            systems. Recovering some of that energy creates an opportunity to
            generate electricity from a resource already there.
          </p>
        </div>
        <div className="pathway-toolbar">
          <p>Follow the energy</p>
          <div role="group" aria-label="Compare energy pathways">
            <button
              type="button"
              aria-pressed={!recovery}
              onClick={() => setRecovery(false)}
            >
              Without recovery
            </button>
            <button
              type="button"
              aria-pressed={recovery}
              onClick={() => setRecovery(true)}
            >
              With recovery
            </button>
          </div>
        </div>
        <EnergyScene recovery={recovery} />
        <div className="pathway-footnote">
          <p aria-live="polite">
            {recovery
              ? "Recovery creates another route for part of the heat leaving an industrial process."
              : "Without recovery, this heat leaves the process without generating electricity."}
          </p>
          <div className="scene-controls">
            <span>Illustrative · Not to scale</span>
            <button
              className="scene-toggle"
              type="button"
              aria-pressed={motion.paused}
              onClick={motion.toggle}
            >
              {motion.paused ? "Resume animation" : "Pause animation"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
