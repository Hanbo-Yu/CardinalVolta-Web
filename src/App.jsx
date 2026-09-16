import {
  FocusStory,
  IndustryExplorer,
  PartnerNetwork,
  HomeNews,
} from "./HomeSections.jsx";
import Opportunity from "./Opportunity.jsx";
import TechnologySection from "./TechnologySection.jsx";
import usePageMotion from "./usePageMotion.js";
import { Header, Footer, ContactInvitation } from "./SiteLayout.jsx";
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
              <TechnologySection />
            </div>
            <FocusStory />
            <IndustryExplorer />
            <section
              className="team shell"
              id="about"
              aria-labelledby="about-title"
            >
              <div className="team-intro" data-reveal>
                <h2 id="about-title">About us</h2>
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
      <ContactInvitation />
      <Footer />
    </>
  );
}
