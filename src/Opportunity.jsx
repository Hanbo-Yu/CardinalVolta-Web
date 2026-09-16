import { useState } from "react";

export default function Opportunity() {
  const [recovery, setRecovery] = useState(true);
  return (
    <section
      className="opportunity opportunity-pathway"
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
        <div
          className={`heat-pathway ${recovery ? "has-recovery" : ""}`}
          role="img"
          aria-label={
            recovery
              ? "Industrial process releases waste heat. Some is recovered and converted into electricity; remaining heat is released."
              : "Industrial process releases waste heat, which is released without electricity recovery."
          }
        >
          <svg
            className="pathway-lines"
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="pathway-base"
              d="M130 64H430Q450 64 450 90V180H850"
            />
            <path
              className="pathway-base pathway-recovery-base"
              d="M450 64H1080"
            />
            <path
              className="pathway-live"
              key={String(recovery)}
              pathLength="1"
              d="M130 64H1080"
            />
          </svg>
          <div className="pathway-node pathway-process">
            <span>01 / Source</span>
            <strong>Industrial process</strong>
          </div>
          <div className="pathway-node pathway-heat">
            <span>02 / Resource</span>
            <strong>Waste heat</strong>
          </div>
          <div className="pathway-node pathway-recovery">
            <span>03 / Conversion</span>
            <strong>Heat recovery</strong>
          </div>
          <div className="pathway-node pathway-power">
            <span>04 / Output</span>
            <strong>
              Electricity <span aria-hidden="true">↗</span>
            </strong>
          </div>
          <span className="pathway-release">
            {recovery ? "Remaining heat released" : "Heat released"}{" "}
            <span aria-hidden="true">↘</span>
          </span>
        </div>
        <div className="pathway-footnote">
          <p aria-live="polite">
            {recovery
              ? "Recovery creates another route for part of the heat leaving an industrial process."
              : "Without recovery, this heat leaves the process without generating electricity."}
          </p>
          <span>Illustrative energy pathway</span>
        </div>
      </div>
    </section>
  );
}
