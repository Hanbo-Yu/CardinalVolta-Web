import { useState } from "react";
import { industries } from "./home-content.js";

export default function IndustryGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="industry-strip shell">
      <div
        className="industry-strip-panels"
        role="group"
        aria-label="Explore industrial applications"
      >
        {industries.map((industry, index) => (
          <button
            type="button"
            key={industry.id}
            className={`industry-strip-panel ${active === index ? "is-expanded" : ""}`}
            aria-expanded={active === index}
            aria-label={industry.name}
            aria-controls={`strip-details-${industry.id}`}
            aria-describedby={
              active === index ? `strip-details-${industry.id}` : undefined
            }
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? industries.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        industries.length) %
                      industries.length;
              event.currentTarget.parentElement.children[next].focus();
            }}
          >
            <img
              src={`/assets/${industry.image}-1280.webp`}
              alt=""
              width="1280"
              height="960"
              loading="lazy"
              draggable={false}
              style={{ objectPosition: industry.position }}
            />
            <span className="industry-strip-number" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="industry-strip-copy">
              <span className="industry-strip-title">{industry.name}</span>
              <span
                className="industry-strip-description"
                id={`strip-details-${industry.id}`}
                aria-hidden={active !== index}
              >
                {industry.description}
              </span>
            </span>
            <span className="industry-strip-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="gallery-bottom">
        <span>Industry imagery · Areas we’re exploring</span>
        <a href="mailto:info@cardinalvolta.com">
          Discuss an application <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
