"use client";
import { DateTime, Duration } from "luxon";
import { useEffect, useMemo, useState } from "react";

type State = "PRE_OPEN" | "OPEN" | "CLOSED";

const ET = "America/New_York";
const openAt = DateTime.fromObject({ year: 2025, month: 9, day: 23, hour: 12 }, { zone: ET });
const closeAt = DateTime.fromObject({ year: 2025, month: 9, day: 30, hour: 12 }, { zone: ET });

function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

function fmtTwo(n: number) { return n.toString().padStart(2, "0"); }

export default function Countdown() {
  const [now, setNow] = useState(DateTime.fromMillis(0, { zone: ET }));
  const [isClient, setIsClient] = useState(false);
  const [prevValues, setPrevValues] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flippingDigits, setFlippingDigits] = useState({ days: false, hours: false, minutes: false, seconds: false });
  const state: State = now < openAt ? "PRE_OPEN" : now <= closeAt ? "OPEN" : "CLOSED";
  const target = state === "PRE_OPEN" ? openAt : state === "OPEN" ? closeAt : null;

  useEffect(() => {
    setIsClient(true);
    setNow(DateTime.now());
    const t = setInterval(() => setNow(DateTime.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const delta = useMemo(() => {
    if (!target) return Duration.fromMillis(0);
    const ms = Math.max(0, target.toMillis() - now.toMillis());
    return Duration.fromMillis(ms).shiftTo("days", "hours", "minutes", "seconds");
  }, [now, target]);

  const days = Math.floor(delta.as("days"));
  const hours = delta.hours ?? 0;
  const minutes = delta.minutes ?? 0;
  const seconds = Math.floor(delta.seconds ?? 0);

  // Track value changes and trigger flip animations
  useEffect(() => {
    const newFlipping = {
      days: prevValues.days !== days,
      hours: prevValues.hours !== hours,
      minutes: prevValues.minutes !== minutes,
      seconds: prevValues.seconds !== seconds,
    };
    
    setFlippingDigits(newFlipping);
    
    // Reset flipping state after animation
    const timer = setTimeout(() => {
      setFlippingDigits({ days: false, hours: false, minutes: false, seconds: false });
    }, 800);
    
    setPrevValues({ days, hours, minutes, seconds });
    
    return () => clearTimeout(timer);
  }, [days, hours, minutes, seconds]);

  const progress = useMemo(() => {
    if (state !== "OPEN") return 0;
    const total = closeAt.toMillis() - openAt.toMillis();
    const passed = now.toMillis() - openAt.toMillis();
    return clamp01(passed / total);
  }, [now, state]);

  const openingLocal = isClient ? openAt.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone) : openAt;
  const closingLocal = isClient ? closeAt.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone) : closeAt;

  const subline =
    state === "PRE_OPEN"
      ? "Opens Sep 23, 2025 • 12:00 PM ET"
      : state === "OPEN"
      ? "Closes Sep 30, 2025 • 12:00 PM ET"
      : "Migration window has closed";

  const pill =
    state === "PRE_OPEN" ? "OPENS IN" : state === "OPEN" ? "OPEN NOW" : "CLOSED";

  return (
    <section aria-label="Migration countdown" className="relative w-full particles flex flex-col items-center justify-center py-16 md:py-24">
      {/* Cinematic background glow with enhanced depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-radr-orange/25 via-radr-orange/12 to-transparent blur-3xl"
        aria-hidden
      />
      
      {/* Cinematic headline with animated shine sweep */}
      <div className="text-center mb-12">
        <h1 className="text-white font-black leading-[0.85] tracking-tight text-glow-cinematic shine-sweep stream-optimized
                       text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
          $TILT → $RADR Migration
        </h1>
        <p className="mt-8 text-white/90 font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl text-glow-subtle">
          {subline}
        </p>
      </div>

      {/* Premium 3D glassmorphism countdown container */}
      {state !== "CLOSED" && (
        <div className="glass-container rounded-3xl p-10 md:p-12 lg:p-16 mb-12">
          <div className="flex items-stretch justify-center gap-6 md:gap-8 lg:gap-12">
            {[
              { label: "DAYS", val: days.toString().padStart(2, "0"), prev: prevValues.days },
              { label: "HOURS", val: fmtTwo(hours), prev: prevValues.hours },
              { label: "MINUTES", val: fmtTwo(minutes), prev: prevValues.minutes },
              { label: "SECONDS", val: fmtTwo(seconds), prev: prevValues.seconds },
            ].map(({ label, val, prev }, index) => {
              const isFlipping = flippingDigits[label.toLowerCase() as keyof typeof flippingDigits];
              return (
              <div
                key={label}
                className={`glass-tile digit-flip grid min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px] place-items-center rounded-2xl
                           px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-16
                           cursor-default ${isFlipping ? 'flipping' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                aria-label={`${val} ${label.toLowerCase()} remaining`}
              >
                <div className="text-white font-black tabular-nums text-glow
                                text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                  {val}
                </div>
                <div className="mt-3 text-sm md:text-base lg:text-lg tracking-[0.3em] text-radr-orange/80 font-bold uppercase">
                  {label}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Neon state indicator with pulse */}
      <div className="mb-12">
        <span
          className={
            "inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold tracking-wide uppercase " +
            (state === "OPEN"
              ? "neon-pill text-white"
              : state === "PRE_OPEN"
              ? "border-2 border-white/40 text-white/90 bg-white/10 backdrop-blur-sm"
              : "border-2 border-white/30 text-white/60 bg-white/5 backdrop-blur-sm")
          }
        >
          {state === "OPEN" && (
            <div className="w-3 h-3 bg-radr-orange rounded-full shadow-lg" style={{
              boxShadow: '0 0 10px rgba(255, 106, 0, 0.8), 0 0 20px rgba(255, 106, 0, 0.4)'
            }} />
          )}
          {pill}
        </span>
      </div>

      {/* Futuristic progress bar for open state */}
      {state === "OPEN" && (
        <div className="w-[min(700px,85vw)] mb-12">
          <div className="futuristic-progress h-4 w-full rounded-full">
            <div
              className="progress-fill h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-4 text-center text-base font-semibold text-radr-orange/90">
            {Math.round(progress * 100)}% of migration window elapsed
          </div>
        </div>
      )}

      {/* Premium frosted-glass panel for timestamps */}
      <div className="w-[min(1000px,90vw)] mb-12">
        <div className="glass-container rounded-2xl px-8 py-6 md:px-10 md:py-8 text-center space-y-4">
          <div className="text-base md:text-lg lg:text-xl text-white/95 font-semibold">
            <span className="text-radr-orange font-semibold">Opening:</span> Sep 23, 2025 12:00 PM ET
            <span className="mx-4 text-white/50">•</span>
            <span className="text-white/80">Your local:</span> {isClient ? openingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ") : "Loading..."}
          </div>
          <div className="text-base md:text-lg lg:text-xl text-white/95 font-semibold">
            <span className="text-radr-orange font-semibold">Closing:</span> Sep 30, 2025 12:00 PM ET
            <span className="mx-4 text-white/50">•</span>
            <span className="text-white/80">Your local:</span> {isClient ? closingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ") : "Loading..."}
          </div>
        </div>
      </div>

      {/* Glossy CTA button for open state */}
      {state === "OPEN" && (
        <div>
          <a
            href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
            target="_blank"
            className="glossy-button rounded-2xl text-black font-bold text-xl
                       px-12 py-5 focus:outline-none focus:ring-4 focus:ring-radr-orange/50"
          >
            Start Migration Now
          </a>
        </div>
      )}
    </section>
  );
}