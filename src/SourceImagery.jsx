import { useEffect } from "react";

export function useImageParallax() {
  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-parallax]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const element of elements) {
        if (reducedMotion.matches) {
          element.style.setProperty("--image-travel", "0px");
          continue;
        }
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        element.style.setProperty(
          "--image-travel",
          `${(progress - 0.5) * 48}px`,
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);
}

export function MaterialStory() {
  return (
    <figure className="material-story" data-reveal>
      <div className="material-surface" data-parallax>
        <img
          src="/assets/industry-chemical-1280.webp"
          srcSet="/assets/industry-chemical-640.webp 640w, /assets/industry-chemical-1280.webp 1280w"
          sizes="(max-width: 760px) 100vw, 90vw"
          width="1280"
          height="1920"
          alt="Industrial processing towers, pipes and walkways"
          loading="lazy"
        />
      </div>
      <figcaption>
        <span className="eyebrow">A NEW PERSPECTIVE ON INDUSTRIAL ENERGY</span>
        <p>
          The next source of power
          <br />
          is already here.
        </p>
        <span className="material-caption-detail">
          Recover heat. Unlock possibility.
        </span>
      </figcaption>
    </figure>
  );
}

export function ValueChain() {
  const parts = [
    ["Industrial processes", "Where valuable heat is released."],
    ["Heat recovery", "Capture a resource already there."],
    ["Power generation", "Convert thermal energy into electricity."],
    ["On-site use", "Put recovered energy back to work."],
  ];
  return (
    <div className="value-chain" data-reveal>
      <p className="eyebrow">THE OPPORTUNITY, FULL CIRCLE</p>
      <ol>
        {parts.map(([title, text], index) => (
          <li key={title}>
            <span className="value-chain-number">
              0{index + 1}
              <span aria-hidden="true">{index < 3 ? "↗" : "↺"}</span>
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const parts = [
  {
    name: "Evaporator",
    note: "Heat in",
    index: 0,
    className: "part-evaporator",
  },
  {
    name: "Expander + generator",
    note: "Electricity out",
    index: 1,
    className: "part-expander",
  },
  {
    name: "Pump",
    note: "Return to the evaporator",
    index: 3,
    className: "part-pump",
  },
  {
    name: "Condenser",
    note: "Cool to liquid",
    index: 2,
    className: "part-condenser",
  },
];

function PartIcon({ kind }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {kind === 0 && (
        <>
          <rect x="10" y="15" width="44" height="34" rx="5" />
          <path d="M20 40c-9-9 9-10 0-18m12 18c-9-9 9-10 0-18m12 18c-9-9 9-10 0-18M3 32h7m44 0h7" />
        </>
      )}
      {kind === 1 && (
        <>
          <circle cx="25" cy="32" r="19" />
          <circle cx="25" cy="32" r="5" />
          <path d="m25 13 6 14 13 5-14 6-5 13-6-14-13-5 14-6Zm20 19h8m0-10v20h8V22Z" />
        </>
      )}
      {kind === 2 && (
        <>
          <rect x="10" y="15" width="44" height="34" rx="5" />
          <path d="M15 24h31a4 4 0 0 1 0 8H19a4 4 0 0 0 0 8h30M3 32h7m44 0h7" />
        </>
      )}
      {kind === 3 && (
        <>
          <circle cx="28" cy="32" r="18" />
          <path d="m21 21 18 11-18 11Zm-11-5H3m43 16h15M15 49v5h27v-9" />
        </>
      )}
    </svg>
  );
}

export function CycleDiagram({ active, label, detail }) {
  return (
    <div
      className={`orc-visual orc-stage-${active}`}
      role="img"
      aria-label={`Organic Rankine Cycle: evaporator, expander and generator, condenser, pump. Highlighted: ${parts.find((part) => part.index === active).name}.`}
    >
      <div className="orc-heading">
        <span className="eyebrow">ORGANIC RANKINE CYCLE</span>
        <span aria-hidden="true">↻</span>
      </div>
      <div className="orc-circuit">
        <svg
          className="orc-pipes"
          viewBox="0 0 640 340"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="orc-pipe"
            d="M160 75H455Q480 75 480 100V230Q480 255 455 255H185Q160 255 160 230V75Z"
          />
          <path
            key={active}
            className="orc-flow"
            d="M160 75H455Q480 75 480 100V230Q480 255 455 255H185Q160 255 160 230V75Z"
          />
        </svg>
        {parts.map((part) => (
          <div
            key={part.name}
            className={`orc-part ${part.className} ${part.index === active ? "is-active" : ""}`}
          >
            <div className="orc-icon">
              <PartIcon kind={part.index} />
            </div>
            <span className="orc-part-name">{part.name}</span>
            <span className="orc-part-note">{part.note}</span>
          </div>
        ))}
        <span className="orc-center-label" aria-hidden="true">
          CLOSED LOOP
        </span>
      </div>
      <div className="orc-caption">
        <span>{label}</span>
        <p>{detail}</p>
      </div>
    </div>
  );
}
