import AmbientVideo from "./AmbientVideo.jsx";

export function Header({ page }) {
  return (
    <div className={page === "home" ? "shell header-overlay" : "shell"}>
      <header className="topbar" id="home">
        <a href="/" aria-label="Cardinal Volta home">
          <img
            className="logo"
            src={
              page === "home"
                ? "/assets/cardinal-volta-logo-on-dark.svg"
                : "/assets/cardinal-volta-logo.svg"
            }
            alt="Cardinal Volta"
            width="224"
            height="62"
          />
        </a>
        <nav className="nav" aria-label="Main navigation">
          <a href="/" aria-current={page === "home" ? "page" : undefined}>
            Home
          </a>
          <a href="/#technology">Technology</a>
          <a
            href="/news/"
            aria-current={
              page === "news" || page.startsWith("article:")
                ? "page"
                : undefined
            }
          >
            News
          </a>
          <a href="/#about">About</a>
          <a className="contact" href="#contact">
            Contact
          </a>
        </nav>
      </header>
    </div>
  );
}
// Placeholder destinations are intentionally unset; replace null with the real URL.
const footerSocials = [
  { label: "LinkedIn", href: null },
  { label: "Instagram", href: null },
  { label: "X / Twitter", href: null },
];
const footerLegal = [
  { label: "Privacy policy", href: null },
  { label: "Terms of use", href: null },
];

function FooterLink({ item, arrow = false }) {
  const content = (
    <>
      {item.label}
      {arrow && <span aria-hidden="true">↗</span>}
    </>
  );
  return item.href ? (
    <a href={item.href}>{content}</a>
  ) : (
    <span role="link" aria-disabled="true">
      {content}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="footer" aria-label="Contact and site information">
      <div className="shell">
        <div className="footer-directory">
          <div className="footer-identity">
            <a
              className="footer-brand"
              href="/"
              aria-label="Cardinal Volta home"
            >
              <img
                src="/assets/cardinal-volta-logo-footer.svg"
                alt="Cardinal Volta"
                width="280"
                height="67"
                loading="lazy"
              />
            </a>
            <p>
              More power.
              <br />
              <span>From waste heat.</span>
            </p>
          </div>
          <nav className="footer-column" aria-label="Footer navigation">
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/#technology">Technology</a>
              </li>
              <li>
                <a href="/#applications">Applications</a>
              </li>
              <li>
                <a href="/news/">News</a>
              </li>
              <li>
                <a href="/#about">About</a>
              </li>
            </ul>
          </nav>
          <div className="footer-column footer-contact-column">
            <h3>Get in touch</h3>
            <a className="footer-email" href="mailto:info@cardinalvolta.com">
              info@cardinalvolta.com
            </a>
            <p>+1 (000) 000-0000</p>
            <p className="footer-location">
              Toronto, Canada<span>Office address to follow</span>
            </p>
          </div>
          <div className="footer-column">
            <h3>Follow along</h3>
            <ul>
              {footerSocials.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} arrow />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <p>
            © {new Date().getFullYear()} Cardinal Volta. All rights reserved.
          </p>
          <div className="footer-legal" aria-label="Legal information">
            {footerLegal.map((item) => (
              <FooterLink key={item.label} item={item} />
            ))}
          </div>
          <a className="footer-return" href="#home">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export function ContactInvitation() {
  return (
    <section
      className="contact-invitation"
      id="contact"
      aria-labelledby="contact-title"
    >
      <AmbientVideo
        className="contact-film"
        src="/assets/pipe.mp4"
        poster="/assets/pipe-poster.webp"
        label="industrial pipe video"
      />
      <div className="shell contact-invitation-content">
        <h2 id="contact-title">Let’s talk.</h2>
        <div>
          <p>Have an industrial heat challenge or an idea for collaboration?</p>
          <a href="mailto:info@cardinalvolta.com">
            info@cardinalvolta.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
