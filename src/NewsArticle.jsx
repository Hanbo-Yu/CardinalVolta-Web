import { newsItems } from "./content.js";
import { SampleLabel } from "./News.jsx";

export default function NewsArticle({ slug }) {
  const item = newsItems.find((entry) => entry.slug === slug);
  if (!item)
    return (
      <section className="article-page shell">
        <h1>Article not found.</h1>
        <a className="text-link" href="/news/">
          Back to all news <span aria-hidden="true">↗</span>
        </a>
      </section>
    );
  const related = newsItems.filter((entry) => entry.slug !== slug).slice(0, 2);
  return (
    <article className="article-page shell">
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <a href="/news/">← All news</a>
        <span aria-hidden="true">/</span>
        <span>{item.category}</span>
      </nav>
      <header className="article-header">
        <div className="article-meta">
          <span>{item.category}</span>
          <time dateTime={item.date}>{item.displayDate}</time>
          <SampleLabel item={item} />
        </div>
        <h1>{item.title}</h1>
        <p className="article-deck">{item.summary}</p>
        {item.sample && (
          <p className="article-preview-note">
            Preview story · The text and publication date are illustrative.
          </p>
        )}
      </header>
      {item.image && (
        <figure className="article-cover">
          <img
            src={item.image.src}
            alt={item.image.alt}
            width="1200"
            height="520"
            style={{ objectPosition: item.image.position }}
            fetchPriority="high"
          />
          <figcaption>{item.image.caption}</figcaption>
        </figure>
      )}
      <div className="article-layout">
        <aside className="article-sidebar">
          <p>In this article</p>
          <nav aria-label="Article sections">
            {item.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="article-body">
          {item.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <h2 id={`${section.id}-heading`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <a className="text-link article-back" href="/news/">
            Back to all news <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      {related.length > 0 && (
        <section className="article-related" aria-labelledby="related-title">
          <div className="news-head">
            <h2 id="related-title">More from Cardinal Volta</h2>
            <a className="text-link" href="/news/">
              View all news <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="related-grid">
            {related.map((entry) => (
              <article key={entry.slug}>
                {entry.image && (
                  <a
                    href={entry.url}
                    className="related-image"
                    aria-label={`Read: ${entry.title}`}
                  >
                    <img
                      src={entry.image.thumbnail || entry.image.src}
                      alt={entry.image.alt}
                      width="560"
                      height="300"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: entry.image.position }}
                    />
                  </a>
                )}
                <div className="article-meta">
                  <time dateTime={entry.date}>{entry.displayDate}</time>
                  <SampleLabel item={entry} />
                </div>
                <h3>
                  <a href={entry.url}>
                    {entry.title} <span aria-hidden="true">↗</span>
                  </a>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
