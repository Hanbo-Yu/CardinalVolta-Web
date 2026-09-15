import { useEffect, useRef, useState } from "react";

export default function AmbientVideo({
  src,
  poster,
  label,
  caption,
  priority = false,
  start = 0,
  end,
  className = "",
}) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const toggleRef = useRef(() => {});
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let near = false;
    let attached = false;
    let positioned = false;
    let resetting = false;
    let disposed = false;
    let intent = "auto";
    let resetTimer;
    video.muted = true;

    function sync() {
      if (disposed) return;
      const wantsMotion =
        intent === "playing" || (intent === "auto" && !preference.matches);
      if (near && wantsMotion && !attached) {
        attached = true;
        video.src = src;
        video.load();
      }
      if (
        visible &&
        !document.hidden &&
        wantsMotion &&
        positioned &&
        !resetting
      ) {
        video.play().catch(() => {
          if (!disposed) setPlaying(false);
        });
      } else video.pause();
    }
    function metadata() {
      if (start > 0 && start < video.duration) video.currentTime = start;
      else {
        positioned = true;
        sync();
      }
    }
    function loaded() {
      if (positioned) setReady(true);
    }
    function seeked() {
      positioned = true;
      resetting = false;
      setReady(true);
      sync();
    }
    function progress() {
      const boundary = Math.min(end ?? video.duration, video.duration);
      if (
        !Number.isFinite(boundary) ||
        resetting ||
        video.paused ||
        boundary <= start + 1
      )
        return;
      if (video.currentTime >= boundary - 0.4) {
        resetting = true;
        setReady(false);
        // Dissolve to the matching opening-frame poster before restarting the clip.
        resetTimer = setTimeout(() => {
          if (disposed) return;
          video.pause();
          video.currentTime = start;
        }, 300);
      }
    }
    function ended() {
      if (!resetting) {
        video.currentTime = start;
      }
    }
    function onPlay() {
      setPlaying(true);
    }
    function onPause() {
      setPlaying(false);
    }
    function onError() {
      setFailed(true);
      setPlaying(false);
    }
    const events = {
      loadedmetadata: metadata,
      loadeddata: loaded,
      seeked,
      timeupdate: progress,
      ended,
      playing: onPlay,
      pause: onPause,
      error: onError,
    };
    Object.entries(events).forEach(([name, fn]) =>
      video.addEventListener(name, fn),
    );
    const nearby = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        sync();
      },
      { rootMargin: "250px" },
    );
    const onscreen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        sync();
      },
      { threshold: [0, 0.15] },
    );
    nearby.observe(frameRef.current);
    onscreen.observe(frameRef.current);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    toggleRef.current = () => {
      intent = !video.paused || resetting ? "paused" : "playing";
      if (intent === "paused" && resetting) {
        clearTimeout(resetTimer);
        resetting = false;
        setReady(true);
      }
      sync();
    };
    return () => {
      disposed = true;
      clearTimeout(resetTimer);
      nearby.disconnect();
      onscreen.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      Object.entries(events).forEach(([name, fn]) =>
        video.removeEventListener(name, fn),
      );
      video.pause();
      video.removeAttribute("src");
      video.load();
      toggleRef.current = () => {};
    };
  }, [src, start, end]);

  return (
    <figure
      className={`ambient-film ${className}`}
      aria-label={caption || label}
    >
      <div className="film-frame" ref={frameRef}>
        <img
          className="film-poster"
          src={poster}
          alt=""
          width="1600"
          height="900"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        <video
          ref={videoRef}
          className={ready ? "film-video is-ready" : "film-video"}
          poster={poster}
          muted
          playsInline
          preload="none"
          aria-label={label}
        />
        <div className="film-shade" aria-hidden="true" />
        {caption && <span className="film-caption">{caption}</span>}
        {failed ? (
          <p className="film-error" role="status">
            Video unavailable
          </p>
        ) : (
          <button
            className="film-toggle"
            type="button"
            onClick={() => toggleRef.current()}
            aria-label={`${playing ? "Pause" : "Play"} ${label}`}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              {playing ? (
                <path d="M6 4v12M14 4v12" />
              ) : (
                <path d="m6 3 10 7-10 7Z" />
              )}
            </svg>
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
        )}
      </div>
    </figure>
  );
}
