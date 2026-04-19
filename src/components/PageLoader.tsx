import { useState, useEffect, useRef } from "react";

const CSS = `
@keyframes pl-glitch-1 {
  0%,100% { clip-path: inset(0 0 94% 0);  transform: translateX(-5px); }
  20%      { clip-path: inset(28% 0 52% 0); transform: translateX( 5px); }
  40%      { clip-path: inset(58% 0 22% 0); transform: translateX(-3px); }
  60%      { clip-path: inset(12% 0 78% 0); transform: translateX( 3px); }
  80%      { clip-path: inset(78% 0 8% 0);  transform: translateX(-5px); }
}
@keyframes pl-glitch-2 {
  0%,100%  { clip-path: inset(48% 0 32% 0); transform: translateX( 5px); }
  25%      { clip-path: inset(12% 0 68% 0); transform: translateX(-5px); }
  50%      { clip-path: inset(68% 0 12% 0); transform: translateX( 3px); }
  75%      { clip-path: inset(22% 0 58% 0); transform: translateX(-3px); }
}
@keyframes pl-scanline {
  0%   { top: -12px; opacity: 0; }
  3%   { opacity: 1; }
  97%  { opacity: 1; }
  100% { top: 100vh; opacity: 0; }
}
@keyframes pl-blink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0; }
}
@keyframes pl-enter {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pl-exit {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(1.03); }
}
@keyframes pl-box-enter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.pl-glitch-1 { animation: pl-glitch-1 2.6s steps(1) infinite; }
.pl-glitch-2 { animation: pl-glitch-2 2.6s steps(1) infinite; animation-delay:0.5s; }
.pl-blink    { animation: pl-blink 1s step-end infinite; }
.pl-scanline { animation: pl-scanline 4s linear infinite; }
.pl-screen-enter { animation: pl-enter     0.35s ease forwards; }
.pl-screen-exit  { animation: pl-exit      0.7s  ease forwards; }
.pl-box          { animation: pl-box-enter 0.5s  ease 0.15s both; }
`;

const MESSAGES = [
  "INITIALIZING QA MATRIX...",
  "LOADING AUTOMATION FRAMEWORKS...",
  "CALIBRATING TEST PROTOCOLS...",
  "ESTABLISHING SECURE CONNECTION...",
  "DEPLOYING QUALITY SYSTEMS...",
  "ALL SYSTEMS NOMINAL...",
  "SYSTEM READY",
];

const MIN_MS = 3000;

interface Props { onDismiss: () => void; }

export default function PageLoader({ onDismiss }: Props) {
  const [progress, setProgress] = useState(0);
  const [msgIdx,   setMsgIdx]   = useState(0);
  const [exiting,  setExiting]  = useState(false);

  const loadDoneRef    = useRef(false);
  const minDoneRef     = useRef(false);
  const dismissedRef   = useRef(false);
  const progressRef    = useRef(0);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setProgress(100);
    setMsgIdx(MESSAGES.length - 1);
    setTimeout(() => setExiting(true), 400);
    setTimeout(onDismiss, 1100);
  };

  const tryDismiss = () => {
    if (loadDoneRef.current && minDoneRef.current) dismiss();
  };

  useEffect(() => {
    // Progress ticks to 100 over exactly MIN_MS ms (linear feel)
    const totalTicks = MIN_MS / 40;
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      // Ease: fast start, slight slowdown near end
      const t = tick / totalTicks;
      const eased = t < 0.8 ? t / 0.8 * 0.9 : 0.9 + (t - 0.8) / 0.2 * 0.1;
      progressRef.current = Math.min(Math.round(eased * 100), 98);
      setProgress(progressRef.current);
      const idx = Math.min(
        Math.floor((progressRef.current / 100) * (MESSAGES.length - 1)),
        MESSAGES.length - 2
      );
      setMsgIdx(idx);
      if (tick >= totalTicks) clearInterval(interval);
    }, 40);

    // Minimum display gate
    const minTimer = setTimeout(() => {
      minDoneRef.current = true;
      tryDismiss();
    }, MIN_MS);

    // DOM ready gate — fires when HTML + scripts are parsed,
    // deliberately NOT window.load so heavy assets (video) don't block it
    const onDOMReady = () => {
      loadDoneRef.current = true;
      tryDismiss();
    };
    if (document.readyState === "interactive" || document.readyState === "complete") {
      loadDoneRef.current = true;
    } else {
      document.addEventListener("DOMContentLoaded", onDOMReady, { once: true });
    }

    // Hard cap at 8 s
    const cap = setTimeout(dismiss, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(minTimer);
      clearTimeout(cap);
      document.removeEventListener("DOMContentLoaded", onDOMReady);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* ── Full-screen backdrop ── */}
      <div
        className={exiting ? "pl-screen-exit" : "pl-screen-enter"}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#030308",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Courier New', Courier, monospace",
          overflow: "hidden",
        }}
      >
        {/* Radial glow behind the box */}
        <div style={{
          position: "absolute",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />

        {/* Moving scanline */}
        <div className="pl-scanline" style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(to right, transparent 0%, rgba(0,212,255,0.15) 20%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.15) 80%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* ── Terminal box ── */}
        <div
          className="pl-box"
          style={{
            position: "relative",
            width: "min(520px, 90vw)",
            background: "rgba(5, 5, 18, 0.97)",
            border: "1px solid rgba(0,212,255,0.35)",
            borderRadius: "2px",
            boxShadow: [
              "0 0 0 1px rgba(0,212,255,0.1)",
              "0 0 40px rgba(0,212,255,0.12)",
              "0 0 80px rgba(139,92,246,0.06)",
              "inset 0 0 60px rgba(0,212,255,0.015)",
            ].join(", "),
          }}
        >
          {/* Box corner brackets */}
          {[
            { top: -2, left: -2,   borderTop: "2px solid #00d4ff", borderLeft:  "2px solid #00d4ff" },
            { top: -2, right: -2,  borderTop: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" },
            { bottom: -2, left: -2,  borderBottom: "2px solid #00d4ff", borderLeft:  "2px solid #00d4ff" },
            { bottom: -2, right: -2, borderBottom: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
          ))}

          {/* Header bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 18px",
            borderBottom: "1px solid rgba(0,212,255,0.15)",
            background: "rgba(0,212,255,0.04)",
          }}>
            <span style={{ color: "rgba(0,212,255,0.8)", fontSize: "11px", letterSpacing: "0.3em" }}>
              ◈ SYSTEM BOOT
            </span>
            <div style={{ display: "flex", gap: "7px" }}>
              {["rgba(236,72,153,0.7)", "rgba(251,191,36,0.7)", "rgba(34,197,94,0.7)"].map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "36px 32px 28px" }}>

            {/* Glitchy name */}
            <div style={{ position: "relative", textAlign: "center", marginBottom: "6px" }}>
              <div className="pl-glitch-1" style={{
                position: "absolute", inset: 0,
                color: "#00d4ff", fontSize: "clamp(26px,5vw,42px)",
                fontWeight: 900, letterSpacing: "0.1em", userSelect: "none",
              }}>RAJESH DORADLA</div>
              <div className="pl-glitch-2" style={{
                position: "absolute", inset: 0,
                color: "#d946ef", fontSize: "clamp(26px,5vw,42px)",
                fontWeight: 900, letterSpacing: "0.1em", userSelect: "none",
              }}>RAJESH DORADLA</div>
              <div style={{
                fontSize: "clamp(26px,5vw,42px)", fontWeight: 900, letterSpacing: "0.1em",
                background: "linear-gradient(to right, #e2e8f0, #ffffff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>RAJESH DORADLA</div>
            </div>

            {/* Subtitle */}
            <div style={{
              textAlign: "center", color: "rgba(148,163,184,0.65)",
              fontSize: "11px", letterSpacing: "0.28em", marginBottom: "32px",
            }}>
              PRINCIPAL QA ENGINEER
            </div>

            {/* Divider */}
            <div style={{
              height: "1px", marginBottom: "24px",
              background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2), rgba(139,92,246,0.2), transparent)",
            }} />

            {/* Status message */}
            <div style={{
              color: "#00d4ff", fontSize: "12px", letterSpacing: "0.1em",
              marginBottom: "24px", minHeight: "20px",
              textShadow: "0 0 8px rgba(0,212,255,0.5)",
            }}>
              {`> ${MESSAGES[msgIdx]}`}
              <span className="pl-blink" style={{ marginLeft: "2px" }}>█</span>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "10px" }}>
              <div style={{
                height: "3px", background: "rgba(255,255,255,0.06)",
                borderRadius: "2px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", width: `${progress}%`,
                  background: "linear-gradient(to right, #00d4ff, #a855f7, #d946ef)",
                  borderRadius: "2px",
                  transition: "width 0.12s ease",
                  boxShadow: "0 0 10px rgba(0,212,255,0.6)",
                }} />
              </div>
            </div>

            {/* Percentage row */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: "rgba(100,116,139,0.6)", fontSize: "10px", letterSpacing: "0.15em" }}>
                PORTFOLIO OS v2.0
              </span>
              <span style={{
                color: "rgba(0,212,255,0.85)", fontSize: "13px",
                letterSpacing: "0.15em", fontWeight: 700,
                textShadow: "0 0 8px rgba(0,212,255,0.4)",
              }}>
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
