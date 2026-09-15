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
export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell">
        <p className="contact-invitation">
          Working with industrial heat? We’d like to hear about your process,
          your questions and the possibilities you see.
        </p>
        <div className="footer-top">
          <h2>
            Put your heat
            <br />
            to work.
          </h2>
          <a className="text-link" href="mailto:info@cardinalvolta.com">
            info@cardinalvolta.com <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>Cardinal Volta</span>
          <span>Toronto, Canada</span>
        </div>
      </div>
    </footer>
  );
}
