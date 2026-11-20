// Short product film for a plugin, shared by the /plugins cards and the plugin
// page heroes. Data comes from resolvePluginVideo() in plugins-hub.js.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./Primitives.jsx";
import { track } from "../lib/track.js";

const PHONE = "(max-width: 767px)";

// ssrDefault: the value used when rendering without a window (prerender).
export function useMedia(query, ssrDefault = false) {
  const get = () => (typeof window === "undefined" ? ssrDefault : window.matchMedia(query).matches);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, [query]);
  return matches;
}

// Short product video for a card. Poster first; the MP4 is requested only when
// the card nears the viewport, and the variant (4:5 on phones, 16:9 elsewhere)
// is fixed the first time a src is assigned, so one visit downloads one file.
// Muted autoplay only, once, then it rests on the last frame (a narrated story
// that ends on the brand; looping would restart mid-read). No autoplay under
// prefers-reduced-motion. Pauses off-screen.
export default function PluginVideo({ media, labels, plugin, active = true, source = "plugins_hub" }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const phone = useMedia(PHONE);
  const [variant, setVariant] = useState(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [ended, setEnded] = useState(false);

  const shown = variant || (phone ? "tall" : "wide");
  const file = media[shown];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nearIO = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "200px" });
    // "On screen" = half of the video shows, or it fills half the viewport
    // height (a 4:5 slot on a landscape phone is taller than the screen).
    const visIO = new IntersectionObserver(
      ([e]) => {
        const r = e.intersectionRect;
        const fillsViewport =
          e.rootBounds && r.height >= e.rootBounds.height * 0.5 && r.width >= e.boundingClientRect.width * 0.5;
        setVisible(e.isIntersecting && (e.intersectionRatio >= 0.5 || fillsViewport));
        setInView(e.isIntersecting);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    nearIO.observe(el);
    visIO.observe(el);
    return () => {
      nearIO.disconnect();
      visIO.disconnect();
    };
  }, []);

  // Assigns the src once and fixes the variant. Called from effects and from
  // click handlers (iOS needs play() inside the gesture, so src goes in sync).
  const ensureSrc = () => {
    const v = videoRef.current;
    if (!v) return null;
    if (!v.getAttribute("src")) {
      v.muted = true;
      v.src = media[shown].src;
      setVariant(shown);
    }
    return v;
  };

  // Only the active card (mobile gallery) may request its file.
  useEffect(() => {
    if (near && active && !reduced) ensureSrc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, active, reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !variant) return;
    // Muted autoplay needs half the video on screen; once someone chose to
    // watch with sound, it only pauses when it leaves the screen entirely.
    if (!active || (sound ? !inView : !visible)) {
      if (!v.paused) v.pause();
      return;
    }
    if (!sound && !reduced && !userPaused && !ended) v.play().catch(() => {});
  }, [active, visible, inView, variant, sound, reduced, userPaused, ended]);

  const playWithSound = (action) => {
    const v = ensureSrc();
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    setSound(true);
    setInView(true); // the button was just clicked, so the video is on screen
    setEnded(false);
    setUserPaused(false);
    v.play().catch(() => {});
    track("hub_video", { source, plugin, action, variant: shown === "tall" ? "4x5" : "16x9" });
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (userPaused) {
      setUserPaused(false);
    } else {
      v.pause();
      setUserPaused(true);
      track("hub_video", { source, plugin, action: "pause", variant: shown === "tall" ? "4x5" : "16x9" });
    }
  };

  const onEnded = () => {
    setEnded(true);
    track("hub_video", { source, plugin, action: "complete", variant: shown === "tall" ? "4x5" : "16x9" });
  };

  // Controls sit top-right: the film's own captions live at the bottom.
  const pill =
    "inline-flex items-center gap-2 h-10 rounded-full bg-ink-950/85 backdrop-blur px-3.5 text-[13px] font-medium text-paper-50 border border-white/15 hover:border-signal hover:text-signal transition-colors";

  let main = null;
  if (!sound) {
    if (ended) main = { label: labels.again, action: "replay" };
    else if (reduced && !variant) main = { label: media.duration ? `${labels.play} · ${media.duration}` : labels.play, action: "play_sound" };
    else main = { label: labels.withSound, action: "play_sound" };
  }
  const showPause = !sound && !ended && !reduced && variant;

  return (
    <div
      ref={wrapRef}
      className={`relative bg-ink-950 border-b border-white/10 overflow-hidden ${
        shown === "tall" ? "aspect-[4/5]" : "aspect-video"
      }`}
    >
      <video
        ref={videoRef}
        poster={file.poster}
        preload="none"
        playsInline
        muted
        controls={sound}
        onEnded={onEnded}
        aria-label={media.label}
        className="block w-full h-full object-contain"
      >
        {media.captions && (
          <track kind="captions" src={media.captions} srcLang={media.captionsLang} label={media.captionsLabel} />
        )}
      </video>
      {(main || showPause) && (
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {main && (
            <button type="button" className={pill} onClick={() => playWithSound(main.action)}>
              <SpeakerIcon />
              {main.label}
            </button>
          )}
          {showPause && (
            <button
              type="button"
              className={`${pill} w-10 px-0 justify-center`}
              aria-label={userPaused ? labels.resume : labels.pause}
              onClick={togglePause}
            >
              {userPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

