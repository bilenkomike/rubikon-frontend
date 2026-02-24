import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Scene from "./Scene";
import "./styles.css";
import Logo from "../../../public/rubikon.svg?react";

const INTRO_KEY = "intro_last_seen_ts";
const INTRO_TTL_MS = 24 * 60 * 60 * 1000;

const TITLE_TEXT = "Rubikon.live";
const SUBTITLE_TEXT = "Premium products + Best Prices";

export default function Loader({ onDone }) {
  const rootRef = useRef();
  const uiRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const caretRef = useRef(null);

  // whether we should play the full intro this time
  const [shouldPlayIntro] = useState(
    () => !hasSeenIntroWithinTTL(INTRO_KEY, INTRO_TTL_MS),
  );

  // When intro should be skipped: instantly “finish”
  useEffect(() => {
    if (!shouldPlayIntro) {
      // mark as seen anyway (optional)
      markIntroSeen(INTRO_KEY);
      onDone?.();
    }
  }, [shouldPlayIntro, onDone]);

  const revealUI = () => {
    if (!uiRef.current || !titleRef.current || !subtitleRef.current) return;

    // mark intro seen for next 24h
    markIntroSeen(INTRO_KEY);

    // reset UI
    titleRef.current.textContent = "";
    subtitleRef.current.style.opacity = 0;
    subtitleRef.current.style.transform = "translateX(24px)";
    caretRef.current?.classList.remove("loader-caret--done");

    gsap.killTweensOf([uiRef.current, subtitleRef.current]);

    const tl = gsap.timeline({
      onComplete: () => {
        // after fade, unmount Loader
        onDone?.();
      },
    });

    // 1) Fade/slide UI block in
    tl.fromTo(
      uiRef.current,
      { x: 220, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
    );

    // 2) Typing
    tl.add(() => {
      typeTextHuman({
        el: titleRef.current,
        caretEl: caretRef.current,
        text: TITLE_TEXT,
        baseMs: 45,
        jitterMs: 10,
        onDone: () => caretRef.current?.classList.add("loader-caret--done"),
      });
    });

    // 3) Subtitle reveal
    tl.to({}, { duration: 0.35 });
    tl.fromTo(
      subtitleRef.current,
      { x: 24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );

    // ✅ 4) Hold final text on screen for 3–4 seconds
    tl.to({}, { duration: 3.5 }); // set 3.0–4.0 as you like

    // ✅ 5) Fade the entire loader out
    tl.to(rootRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // ✅ 6) Set display none right after opacity is 0
    tl.set(rootRef.current, { display: "none" });
  };

  return (
    <div className="loader-loaderRoot" ref={rootRef}>
      {/* If we play intro => Scene runs, then calls revealUI when done */}
      {shouldPlayIntro && (
        <div className="loader-canvasWrap">
          <Scene onRevealUI={revealUI} />
        </div>
      )}

      {/* UI overlay */}
      {shouldPlayIntro && (
        <div ref={uiRef} className="loader-heroUI">
          <div className="loader-logoWrap" aria-label="Logo">
            <Logo />
          </div>

          <h1 className="loader-title">
            <span ref={titleRef} />
            <span ref={caretRef} className="loader-caret" />
          </h1>

          <p ref={subtitleRef} className="loader-subtitle">
            {SUBTITLE_TEXT}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- localStorage TTL helpers ---------- */

function hasSeenIntroWithinTTL(key, ttlMs) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < ttlMs;
  } catch {
    return false;
  }
}

function markIntroSeen(key) {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    // ignore (private mode / blocked storage)
  }
}

/* ---------- typing helper (human randomness) ---------- */

function typeTextHuman({
  el,
  caretEl,
  text,
  baseMs = 45,
  jitterMs = 10,
  onChar,
  onDone,
}) {
  if (!el) return;

  el.textContent = "";
  let i = 0;

  const step = () => {
    el.textContent += text[i];
    i += 1;
    onChar?.();

    if (i >= text.length) {
      onDone?.();
      return;
    }

    const jitter = randInt(-jitterMs, jitterMs);
    const char = text[i - 1];

    let extraPause = 0;
    if (char === "," || char === ".") extraPause = 180 + Math.random() * 120;
    else if (char === " ") extraPause = 10 + Math.random() * 20;
    else if (Math.random() < 0.04) extraPause = 80 + Math.random() * 120;

    const delay = Math.max(15, baseMs + jitter + extraPause);
    setTimeout(step, delay);
  };

  caretEl?.classList.remove("loader-caret--done");
  step();
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
