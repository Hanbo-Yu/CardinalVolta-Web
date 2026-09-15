import {
  Opportunity,
  FocusStory,
  IndustryExplorer,
  PartnerNetwork,
  HomeNews,
} from "./HomeSections.jsx";
import usePageMotion from "./usePageMotion.js";
import { Header, Footer } from "./SiteLayout.jsx";
import { NewsPage } from "./News.jsx";
import NewsArticle from "./NewsArticle.jsx";
import AmbientVideo from "./AmbientVideo.jsx";

export default function App({ page = "home" }) {
  usePageMotion(page);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main" tabIndex={-1}>
        {page.startsWith("article:") ? (
          <NewsArticle slug={page.slice(8)} />
        ) : page === "news" ? (
          <NewsPage />
        ) : (
          <>
            <section
              className="hero hero-integrated"
              aria-labelledby="hero-title"
            >
              <AmbientVideo
                className="hero-film"
                src="/assets/factory.mp4"
                poster="/assets/factory-poster.webp"
                label="industrial aerial video"
                start={38}
                end={50}
                priority
              />
              <div className="shell hero-content">
                <h1 id="hero-title">
                  More power.<span>From waste heat.</span>
                </h1>
                <div className="hero-bottom">
                  <p>
                    We’re developing technology to turn industrial waste heat
                    into electricity. Putting more of industry’s energy to work.
                  </p>
                  <a className="text-link" href="#technology">
                    Explore our technology <span aria-hidden="true">↘</span>
                  </a>
                </div>
              </div>
            </section>
            <div className="energy-story">
              <Opportunity />
              <section
                className="technology"
                id="technology"
                aria-labelledby="tech-title"
              >
                <div className="shell">
                  <div className="technology-opening" data-reveal>
                    <p className="section-title">Technology</p>
                    <h2 id="tech-title">
                      A useful next chapter
                      <br />
                      for industrial heat.
                    </h2>
                  </div>
                  <div className="mechanism-layout">
                    <div className="mechanism-copy" data-reveal>
                      <p className="tech-intro">
                        Our approach uses the Organic Rankine Cycle to convert
                        recovered heat into electricity.
                      </p>
                      <div className="stages">
                        <div className="stage">
                          <h3>
                            Recover heat <span aria-hidden="true">→</span>
                          </h3>
                          <p>
                            Transfer heat from an industrial process to a
                            working fluid.
                          </p>
                        </div>
                        <div className="stage">
                          <h3>
                            Generate power <span aria-hidden="true">→</span>
                          </h3>
                          <p>
                            Expand the heated working fluid to drive a generator
                            and produce electricity.
                          </p>
                        </div>
                        <div className="stage">
                          <h3>
                            Continue the cycle <span aria-hidden="true">↻</span>
                          </h3>
                          <p>
                            Condense and pump the working fluid back through the
                            closed loop.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mechanism-visual" data-reveal>
                      <AmbientVideo
                        className="mechanism-film"
                        src="/assets/pipe.mp4"
                        poster="/assets/pipe-poster.webp"
                        label="industrial pipe video"
                        caption="Industrial context"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <FocusStory />
            <IndustryExplorer />
            <section
              className="team shell"
              id="about"
              aria-labelledby="about-title"
            >
              <p className="section-title">About Cardinal Volta</p>
              <div className="team-intro" data-reveal>
                <h2 id="about-title">
                  Research.
                  <br />
                  With a purpose.
                </h2>
                <p>
                  Founded by Nan Ge and Aimy Bazylak, Cardinal Volta brings
                  energy research and engineering together in Toronto.
                </p>
              </div>
              <div className="people" data-reveal>
                <article className="person">
                  <img
                    src="/assets/nan-ge-original-450.webp"
                    alt="Nan Ge"
                    loading="lazy"
                    decoding="async"
                    width="190"
                    height="210"
                  />
                  <div>
                    <h3>Nan Ge</h3>
                    <p>Co-Founder &amp; CEO</p>
                    <p className="degree">PhD</p>
                  </div>
                </article>
                <article className="person">
                  <img
                    src="/assets/aimy-bazylak-original-405.webp"
                    alt="Aimy Bazylak"
                    loading="lazy"
                    decoding="async"
                    width="190"
                    height="210"
                  />
                  <div>
                    <h3>Aimy Bazylak</h3>
                    <p>
                      Co-Founder &amp;
                      <br />
                      Chief Science Officer
                    </p>
                    <p className="degree">PhD, PEng</p>
                  </div>
                </article>
              </div>
            </section>
            <PartnerNetwork />
            <HomeNews />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
