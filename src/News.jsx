import { newsItems } from "./content.js";

export function SampleLabel({ item }) {
  return item.sample ? (
    <span className="sample-label">Sample article</span>
  ) : null;
}

function NewsList({ items }) {
  return (
    <ul className="news-list">
      {items.map((item) => (
        <li
          key={item.url}
          className={`news-item${item.image ? " news-item--image" : ""}`}
        >
          <div className="news-row-meta">
            <time dateTime={item.date}>{item.displayDate}</time>
            <SampleLabel item={item} />
          </div>
          <div className="news-row-copy">
            <h3>
              <a href={item.url}>
                {item.title}
                <span aria-hidden="true"> ↗</span>
              </a>
            </h3>
            {item.summary && <p>{item.summary}</p>}
          </div>
          {item.image && (
            <a
              className="news-thumb"
              href={item.url}
              aria-label={`Read: ${item.title}`}
            >
              <img
                src={item.image.thumbnail || item.image.src}
                alt={item.image.alt}
                width="240"
                height="160"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: item.image.position }}
              />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function NewsSummary() {
  return (
    <section className="news shell" id="news" aria-labelledby="news-title">
      <div className="news-head">
        <h2 id="news-title">Latest news</h2>
        <a className="text-link" href="/news/">
          View all news <span aria-hidden="true">↗</span>
        </a>
      </div>
      {newsItems.length ? (
        <NewsList items={newsItems.slice(0, 3)} />
      ) : (
        <div className="news-empty">
          <p>Company updates will appear here.</p>
        </div>
      )}
    </section>
  );
}

export function NewsPage() {
  const [latest, ...earlier] = newsItems;
  return (
    <div className="news-page shell">
      <section className="news-hero" aria-labelledby="news-page-title">
        <h1 id="news-page-title">
          News &amp; <span>updates.</span>
        </h1>
        <p>
          Company announcements, research and the next steps for Cardinal Volta.
        </p>
      </section>
      {latest ? (
        <>
          <article
            className={`news-feature${latest.image ? " news-feature--illustrated" : ""}`}
            aria-labelledby="latest-headline"
          >
            <div className="news-feature-copy">
              <div className="feature-byline">
                <span>Latest update</span>
                <time dateTime={latest.date}>{latest.displayDate}</time>
                <SampleLabel item={latest} />
              </div>
              <h2 id="latest-headline">
                <a href={latest.url}>{latest.title}</a>
              </h2>
              {latest.summary && <p>{latest.summary}</p>}
              <a className="text-link" href={latest.url}>
                Read the update <span aria-hidden="true">↗</span>
              </a>
            </div>
            {latest.image && (
              <a
                className="news-feature-photo"
                href={latest.url}
                aria-label={`Read: ${latest.title}`}
              >
                <img
                  src={latest.image.src}
                  alt={latest.image.alt}
                  width="600"
                  height="500"
                  style={{ objectPosition: latest.image.position }}
                />
              </a>
            )}
          </article>
          {earlier.length > 0 && (
            <section className="news-archive" aria-labelledby="earlier-title">
              <h2 id="earlier-title">Earlier updates</h2>
              <NewsList items={earlier} />
            </section>
          )}
        </>
      ) : (
        <section
          className="news-feature news-page-empty"
          aria-labelledby="empty-news-title"
        >
          <p className="section-title">Company news</p>
          <div className="news-feature-copy">
            <h2 id="empty-news-title">More to come.</h2>
            <p>Company updates will appear here.</p>
            <a className="text-link" href="/">
              Back to home <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
