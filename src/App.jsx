import { useEffect, useRef, useState } from "react";

const Arrow = ({ diagonal = false, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    {...props}
  >
    {diagonal ? (
      <path d="M5 19 19 5M5 5h14v14" />
    ) : (
      <path d="M4 12h16m-6-6 6 6-6 6" />
    )}
  </svg>
);
const steps = [
  {
    title: "Recover the heat.",
    short: "Capture",
    text: "Industrial processes release heat. A heat exchanger transfers some of that energy into a working fluid, giving it another purpose.",
    label: "01 / THERMAL ENERGY",
    detail: "An overlooked resource.",
    unit: "HEAT IN",
  },
  {
    title: "Set energy in motion.",
    short: "Convert",
    text: "In an Organic Rankine Cycle, the heated working fluid vaporizes and drives an expander connected to a generator.",
    label: "02 / ORGANIC RANKINE CYCLE",
    detail: "A cycle with a purpose.",
    unit: "ORC SYSTEM",
  },
  {
    title: "Generate new power.",
    short: "Power",
    text: "The generator produces electricity. The working fluid is then cooled, condensed and recirculated, ready to pick up heat again.",
    label: "03 / ELECTRICAL ENERGY",
    detail: "More from the same heat.",
    unit: "POWER OUT",
  },
];
const industries = [
  {
    name: "Iron & steel",
    category: "METALS",
    text: "Explore the electricity potential of heat released by energy-intensive metal production.",
  },
  {
    name: "Cement & lime",
    category: "MATERIALS",
    text: "Give heat from high-temperature materials production a second life.",
  },
  {
    name: "Chemical & petrochemical",
    category: "PROCESS INDUSTRIES",
    text: "Identify opportunities to recover thermal energy across industrial processes.",
  },
  {
    name: "Pulp & paper",
    category: "MANUFACTURING",
    text: "Explore how process heat can become an additional source of electricity.",
  },
];

function Wordmark({ footer = false }) {
  return (
    <a
      href="#top"
      className={`wordmark ${footer ? "wordmark-footer" : ""}`}
      aria-label="Cardinal Volta home"
    >
      <span className="brand-symbol" aria-hidden="true">
        c<span>v</span>
      </span>
      <span>
        cardinal<span className="wordmark-light">volta</span>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function CycleDiagram({ active }) {
  return (
    <div
      className={`cycle-diagram stage-${active}`}
      role="img"
      aria-label={`Simplified heat-to-power process. ${steps[active].unit} highlighted.`}
    >
      <div className="diagram-top">
        <span className="eyebrow">HEAT → ELECTRICITY</span>
        <span className="diagram-live">
          <i /> CONTINUOUS CYCLE
        </span>
      </div>
      <svg
        className="diagram-lines"
        viewBox="0 0 640 330"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="diagram-route"
          d="M100 130H250Q280 130 280 160V200Q280 225 310 225H410Q440 225 440 195V160Q440 130 470 130H540"
        />
        <path className="return-route" d="M440 225V270H280V225" />
        <path
          className="flow-route"
          d="M100 130H250Q280 130 280 160V200Q280 225 310 225H410Q440 225 440 195V160Q440 130 470 130H540"
        />
      </svg>
      <div className={`diagram-node node-heat ${active === 0 ? "active" : ""}`}>
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M23 62c-15-16 15-22 0-42m17 42c-15-16 15-22 0-42m17 42c-15-16 15-22 0-42" />
        </svg>
        <span>Waste heat</span>
      </div>
      <div
        className={`diagram-node node-cycle ${active === 1 ? "active" : ""}`}
      >
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <circle cx="40" cy="40" r="24" />
          <path d="m40 16 8 24-8 24-8-24Zm-24 24 24-8 24 8-24 8Z" />
        </svg>
        <span>ORC system</span>
      </div>
      <div
        className={`diagram-node node-power ${active === 2 ? "active" : ""}`}
      >
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M44 14 22 44h17l-3 22 23-32H42l2-20Z" />
        </svg>
        <span>Electricity</span>
      </div>
      <span className="cycle-return">CONDENSE & RECIRCULATE</span>
      <div className="diagram-caption">
        <span>{steps[active].label}</span>
        <span>{steps[active].detail}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState(0);
  const menuButton = useRef(null);
  const tabs = useRef([]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function selectTab(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % steps.length;
    if (event.key === "ArrowLeft")
      next = (index + steps.length - 1) % steps.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = steps.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setStep(next);
      tabs.current[next]?.focus();
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <Wordmark />
          <button
            ref={menuButton}
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            <a href="#technology" onClick={() => setMenuOpen(false)}>
              Technology
            </a>
            <a href="#applications" onClick={() => setMenuOpen(false)}>
              Applications
            </a>
            <a href="#company" onClick={() => setMenuOpen(false)}>
              Company
            </a>
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="red-square" /> A SECOND LIFE FOR HEAT
            </p>
            <h1 id="hero-title">
              Waste heat.
              <br />
              <span>New power.</span>
            </h1>
            <p className="hero-description">
              We turn industrial waste heat into electricity.
              <br className="desktop-break" /> More possibility. From energy
              already there.
            </p>
            <a className="button button-red" href="#technology">
              Discover the technology <Arrow diagonal />
            </a>
          </div>
          <div className="hero-art">
            <img
              src="/assets/thermal-sculpture.webp"
              width="1536"
              height="1024"
              alt="Sculptural red metal ribbon, symbolizing a second life for heat"
              fetchPriority="high"
            />
            <span className="art-annotation">
              <i /> ENERGY, REIMAGINED.
            </span>
          </div>
          <div className="hero-bottom">
            <span className="eyebrow">
              BUILT FOR INDUSTRY. POWERED BY POSSIBILITY.
            </span>
            <a href="#opportunity" aria-label="Scroll to the opportunity">
              <span>Scroll to explore</span>
              <Arrow />
            </a>
          </div>
        </section>

        <section className="partners" aria-label="Our partners">
          <div className="container partner-inner">
            <p className="eyebrow">
              IN GOOD <br />
              COMPANY
            </p>
            <div className="partner-logos">
              <img
                className="foresight"
                src="/assets/foresight.png"
                alt="Foresight Canada"
                width="170"
                height="70"
              />
              <img
                className="mars"
                src="/assets/mars.png"
                alt="MaRS"
                width="72"
                height="72"
              />
              <img
                className="uoft"
                src="/assets/uoft.avif"
                alt="University of Toronto Entrepreneurship"
                width="120"
                height="80"
              />
              <img
                className="nett"
                src="/assets/nett.jpg"
                alt="NETT Technologies"
                width="170"
                height="45"
              />
            </div>
          </div>
        </section>

        <section
          className="opportunity container section-space"
          id="opportunity"
        >
          <div className="section-label" data-reveal>
            <span className="eyebrow">01 / THE OPPORTUNITY</span>
            <span className="small-cross" aria-hidden="true">
              +
            </span>
          </div>
          <div className="opportunity-grid" data-reveal>
            <h2>
              Good energy
              <br />
              shouldn’t go
              <br />
              <span className="muted">to waste.</span>
            </h2>
            <div className="opportunity-copy">
              <p className="lead">
                Industry makes heat.
                <br />
                We see untapped potential.
              </p>
              <p>
                From making steel to producing cement, essential industries
                release valuable thermal energy. We’re developing a way to put
                that heat back to work—as electricity.
              </p>
              <div className="power-range">
                <span>
                  100 <small>kW</small> <span className="range-dash">—</span> 10{" "}
                  <small>MW</small>
                </span>
                <p className="eyebrow">OUR SYSTEM POWER RANGE</p>
              </div>
            </div>
          </div>
        </section>

        <section className="technology section-space" id="technology">
          <div className="container">
            <div className="section-label" data-reveal>
              <span className="eyebrow">02 / THE TECHNOLOGY</span>
              <span className="eyebrow">A SMARTER USE OF HEAT</span>
            </div>
            <div className="technology-heading" data-reveal>
              <h2>
                Heat. Motion.
                <br />
                <span>Electricity.</span>
              </h2>
              <p>
                A second life for heat, through <br />
                Organic Rankine Cycle technology.
              </p>
            </div>
            <div className="technology-grid" data-reveal>
              <div className="process-controls">
                <div
                  className="process-tabs"
                  role="tablist"
                  aria-label="Heat to electricity steps"
                >
                  {steps.map((item, index) => (
                    <button
                      key={item.short}
                      ref={(el) => {
                        tabs.current[index] = el;
                      }}
                      id={`step-tab-${index}`}
                      role="tab"
                      aria-selected={step === index}
                      aria-controls={`step-panel-${index}`}
                      tabIndex={step === index ? 0 : -1}
                      onClick={() => setStep(index)}
                      onKeyDown={(event) => selectTab(event, index)}
                    >
                      <span className="eyebrow">0{index + 1}</span>
                      {item.short}
                      <Arrow />
                    </button>
                  ))}
                </div>
                {steps.map((item, index) => (
                  <div
                    key={item.short}
                    className="process-description"
                    id={`step-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`step-tab-${index}`}
                    hidden={step !== index}
                    tabIndex="0"
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
              <CycleDiagram active={step} />
            </div>
          </div>
        </section>

        <section
          className="applications container section-space"
          id="applications"
        >
          <div className="section-label" data-reveal>
            <span className="eyebrow">03 / APPLICATIONS</span>
            <span className="small-cross" aria-hidden="true">
              +
            </span>
          </div>
          <div className="applications-heading" data-reveal>
            <h2>
              Heavy industry.
              <br />
              <span className="muted">Fresh potential.</span>
            </h2>
            <p>
              Different processes. A shared opportunity.
              <br />
              Let’s find the power in your waste heat.
            </p>
          </div>
          <div className="applications-grid" data-reveal>
            <div className="industry-photo">
              <img
                src="/assets/industry.jpg"
                alt="Glowing metal being processed in a steelworks"
                loading="lazy"
                width="960"
                height="720"
              />
              <span className="eyebrow">ENERGY IS ALREADY HERE.</span>
            </div>
            <div className="industry-list">
              {industries.map((item, index) => (
                <div
                  className={`industry-item ${industry === index ? "selected" : ""}`}
                  key={item.name}
                >
                  <h3>
                    <button
                      aria-expanded={industry === index}
                      aria-controls={`industry-${index}`}
                      onClick={() =>
                        setIndustry(industry === index ? -1 : index)
                      }
                    >
                      <span className="industry-number">0{index + 1}</span>
                      <span>{item.name}</span>
                      <span className="industry-plus" aria-hidden="true">
                        {industry === index ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div id={`industry-${index}`} hidden={industry !== index}>
                    <p>{item.text}</p>
                    <span className="eyebrow">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="company section-space" id="company">
          <div className="container">
            <div className="section-label" data-reveal>
              <span className="eyebrow">04 / OUR COMPANY</span>
              <span className="eyebrow">TORONTO, CANADA</span>
            </div>
            <div className="company-grid">
              <div className="company-copy" data-reveal>
                <h2>
                  Engineering
                  <br />
                  what’s next.
                </h2>
                <p className="lead">
                  A practical ambition.
                  <br />A second life for industrial heat.
                </p>
                <p>
                  Cardinal Volta brings together expertise in energy research
                  and engineering to develop waste heat recovery systems for
                  industry.
                </p>
                <a className="text-link" href="mailto:info@cardinalvolta.com">
                  Get to know us <Arrow diagonal />
                </a>
              </div>
              <div className="team" data-reveal>
                <article className="team-member">
                  <div className="portrait">
                    <img
                      src="/assets/nan-ge.avif"
                      alt="Nan Ge, Co-Founder and CEO"
                      loading="lazy"
                      width="456"
                      height="516"
                    />
                  </div>
                  <h3>
                    Nan Ge <span>Ph.D.</span>
                  </h3>
                  <p>Co-Founder & CEO</p>
                </article>
                <article className="team-member">
                  <div className="portrait">
                    <img
                      src="/assets/aimy-bazylak.avif"
                      alt="Aimy Bazylak, Co-Founder and Chief Science Officer"
                      loading="lazy"
                      width="456"
                      height="516"
                    />
                  </div>
                  <h3>Aimy Bazylak</h3>
                  <p className="team-credentials">Ph.D., P.Eng.</p>
                  <p>Co-Founder & Chief Science Officer</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-space" id="contact">
          <div className="container" data-reveal>
            <div className="section-label">
              <span className="eyebrow">THE NEXT CHAPTER STARTS HERE.</span>
              <span className="eyebrow">LET’S BUILD IT TOGETHER</span>
            </div>
            <div className="contact-grid">
              <h2>
                Put your heat
                <br />
                to <span>work.</span>
              </h2>
              <div>
                <p>
                  Have a waste heat source?
                  <br />
                  Let’s explore what it could become.
                </p>
                <p className="contact-detail">
                  We welcome conversations with industrial partners about
                  demonstration projects and waste heat recovery opportunities.
                </p>
                <a
                  className="button button-cream"
                  href="mailto:info@cardinalvolta.com?subject=Let%E2%80%99s%20talk%20waste%20heat"
                >
                  Start a conversation <Arrow diagonal />
                </a>
                <a
                  className="contact-email"
                  href="mailto:info@cardinalvolta.com"
                >
                  info@cardinalvolta.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Wordmark footer />
            <p>A second life for heat.</p>
            <a className="back-top" href="#top" aria-label="Back to top">
              <Arrow />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Cardinal Volta. All rights reserved.</span>
            <address>5 King’s College Rd · Toronto, ON · Canada</address>
            <a href="mailto:info@cardinalvolta.com">
              Get in touch <Arrow diagonal />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
