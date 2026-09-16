import { useState } from "react";
import IndustryOrbit from "./IndustryOrbit.jsx";
import { industries, partners, focusAreas } from "./home-content.js";
import { newsItems } from "./content.js";
import { SampleLabel } from "./News.jsx";

function FocusDrawing({ type }) {
  return (
    <svg
      className="focus-drawing"
      viewBox="0 0 260 220"
      fill="none"
      aria-hidden="true"
    >
      {type === "heat" ? (
        [0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${45 + i * 38} 205c-65-60 65-100 0-185`} />
        ))
      ) : type === "cycle" ? (
        <>
          <circle cx="130" cy="110" r="83" />
          <circle cx="130" cy="110" r="56" />
          <path d="M130 27h78v78M130 193H52v-78" />
          <path d="m188 85 20 20 20-20M32 135l20-20 20 20" />
        </>
      ) : (
        <>
          <path d="M12 110h70l35-78-3 156 39-78h95" />
          <circle cx="130" cy="110" r="95" />
        </>
      )}
    </svg>
  );
}

export function FocusStory() {
  return (
    <section className="focus-story" aria-labelledby="focus-title">
      <div className="shell focus-layout">
        <div className="focus-heading">
          <p className="section-title">Our perspective</p>
          <h2 id="focus-title">
            From an energy <br />
            source.
            <br />
            <em>
              To a useful <br />
              resource.
            </em>
          </h2>
          <p>
            A practical way to think about the journey from industrial heat to
            electricity.
          </p>
          <a className="text-link" href="#applications">
            Explore the possibilities <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="focus-stack">
          {focusAreas.map((item, i) => (
            <article className={`focus-card focus-card-${i}`} key={item.motif}>
              <div className="focus-card-heading">
                <p>{item.subtitle}</p>
                <span aria-hidden="true">↗</span>
              </div>
              <FocusDrawing type={item.motif} />
              <div className="focus-card-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustryExplorer() {
  const [active, setActive] = useState(industries[0].id);
  const [open, setOpen] = useState(true);
  return (
    <section
      className="industry-explorer"
      id="applications"
      aria-labelledby="applications-title"
    >
      <div className="shell">
        <div className="industry-heading" data-reveal>
          <p className="section-title">Industrial applications</p>
          <h2 id="applications-title">
            Different industries.
            <br />
            <span>A shared opportunity.</span>
          </h2>
          <p>
            We’re exploring where waste heat recovery could fit across
            energy-intensive industries.
          </p>
        </div>
        <div className="industry-layout">
          <IndustryOrbit
            active={active}
            onSelect={(id) => {
              setActive(id);
              setOpen(true);
            }}
          />
          <div className="industry-drawers">
            {industries.map((item) => {
              const expanded = active === item.id && open;
              return (
                <div
                  className={`industry-drawer ${expanded ? "is-active" : ""}`}
                  key={item.id}
                >
                  <h3>
                    <button
                      type="button"
                      id={`industry-button-${item.id}`}
                      aria-expanded={expanded}
                      aria-controls={`industry-panel-${item.id}`}
                      onClick={() => {
                        setActive(item.id);
                        setOpen(!expanded);
                      }}
                    >
                      {item.name}
                      <span className="drawer-symbol" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="industry-panel"
                    id={`industry-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`industry-button-${item.id}`}
                    inert={!expanded}
                    aria-hidden={!expanded}
                  >
                    <div className="industry-panel-inner">
                      <figure className="drawer-inline-visual">
                        <img
                          src={`/assets/${item.image}-640.webp`}
                          alt={item.alt}
                          loading="lazy"
                          width="640"
                          height="480"
                          style={{ objectPosition: item.position }}
                        />
                        <figcaption>{item.theme} · Industry imagery</figcaption>
                      </figure>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <a
                        href="mailto:info@cardinalvolta.com"
                        className="industry-enquiry"
                      >
                        Discuss an application <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnerNetwork() {
  return (
    <section className="partner-network shell" aria-labelledby="partners-title">
      <div className="partners-heading" data-reveal>
        <h2 id="partners-title">Our partners</h2>
      </div>
      <ul
        className="partner-field"
        aria-label="Partners and supporting organizations"
      >
        {partners.map((partner, i) => (
          <li
            className={`partner-slot${partner ? "" : " partner-slot-empty"}`}
            key={partner?.name || `reserved-${i}`}
            aria-hidden={!partner}
            data-reveal
          >
            {partner && (
              <img
                src={partner.src}
                alt={partner.name}
                loading="lazy"
                width="230"
                height="100"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeNews() {
  const [latest, ...rest] = newsItems.slice(0, 3);
  return (
    <section
      className="home-journal shell"
      id="news"
      aria-labelledby="news-title"
    >
      <div className="journal-heading" data-reveal>
        <div>
          <p className="section-title">News & perspectives</p>
          <h2 id="news-title">The next chapter.</h2>
        </div>
        <a className="text-link" href="/news/">
          All news <span aria-hidden="true">↗</span>
        </a>
      </div>
      {latest ? (
        <div className="journal-layout">
          <article className="journal-feature" data-reveal>
            {latest.image && (
              <a
                className="journal-cover"
                href={latest.url}
                aria-label={`Read: ${latest.title}`}
              >
                <img
                  src={latest.image.src}
                  alt={latest.image.alt}
                  loading="lazy"
                  width="900"
                  height="600"
                  style={{ objectPosition: latest.image.position }}
                />
                <span className="journal-cover-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
            <div className="journal-meta">
              <time dateTime={latest.date}>{latest.displayDate}</time>
              <SampleLabel item={latest} />
            </div>
            <h3>
              <a href={latest.url}>{latest.title}</a>
            </h3>
            <p>{latest.summary}</p>
          </article>
          <div className="journal-side">
            {rest.map((item) => (
              <article key={item.slug} className="journal-small" data-reveal>
                <div className="journal-meta">
                  <time dateTime={item.date}>{item.displayDate}</time>
                  <SampleLabel item={item} />
                </div>
                <h3>
                  <a href={item.url}>
                    {item.title}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </h3>
                <p>{item.summary}</p>
                {item.image && (
                  <a
                    className="journal-small-image"
                    href={item.url}
                    aria-label={`Read: ${item.title}`}
                  >
                    <img
                      src={item.image.thumbnail || item.image.src}
                      alt={item.image.alt}
                      loading="lazy"
                      width="240"
                      height="160"
                    />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p>Company updates will appear here.</p>
      )}
    </section>
  );
}
