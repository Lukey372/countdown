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

  // Track value changes for flip animation
  useEffect(() => {
    setPrevValues({ days, hours, minutes, seconds });
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
    <section aria-label="Migration countdown" className="relative w-full particles min-h-screen flex flex-col items-center justify-center">
      {/* Premium background glow with enhanced radiate effect */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-radr-orange/20 via-radr-orange/8 to-transparent blur-3xl animate-radiate"
        aria-hidden
      />
      
      {/* Main headline with premium typography and glow */}
      <div className="text-center mb-12">
        <h1 className="text-white font-black leading-[0.9] tracking-tight text-glow stream-optimized
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
          $TILT → $RADR Migration
        </h1>
        <p className="mt-6 text-white/85 font-medium text-lg md:text-xl lg:text-2xl xl:text-3xl text-glow-subtle">
          {subline}
        </p>
      </div>

      {/* Premium glassmorphism countdown container */}
      {state !== "CLOSED" && (
        <div className="glass-container rounded-3xl p-8 md:p-10 lg:p-12 mb-8">
          <div className="flex items-stretch justify-center gap-4 md:gap-6 lg:gap-8">
            {[
              { label: "DAYS", val: days.toString().padStart(2, "0"), prev: prevValues.days },
              { label: "HOURS", val: fmtTwo(hours), prev: prevValues.hours },
              { label: "MINUTES", val: fmtTwo(minutes), prev: prevValues.minutes },
              { label: "SECONDS", val: fmtTwo(seconds), prev: prevValues.seconds },
            ].map(({ label, val, prev }, index) => (
              <div
                key={label}
                className="glass-tile digit-flip grid min-w-[100px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] place-items-center rounded-2xl
                           px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 xl:px-10 xl:py-12
                           cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`${val} ${label.toLowerCase()} remaining`}
              >
                <div className="text-white font-black tabular-nums text-glow-subtle
                                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  {val}
                </div>
                <div className="mt-2 text-xs md:text-sm lg:text-base tracking-[0.25em] text-radr-orange/70 font-semibold uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Premium state indicator */}
      <div className="mb-8">
        <span
          className={
            "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold tracking-wide uppercase backdrop-blur-sm " +
            (state === "OPEN"
              ? "border-radr-orange/60 text-white bg-radr-orange/15 shadow-lg animate-pulse"
              : state === "PRE_OPEN"
              ? "border-white/30 text-white/90 bg-white/5 shadow-lg"
              : "border-white/20 text-white/50 bg-white/5 shadow-lg")
          }
        >
          {state === "OPEN" && (
            <div className="w-2 h-2 bg-radr-orange rounded-full animate-pulse shadow-sm" />
          )}
          {pill}
        </span>
      </div>

      {/* Premium progress bar for open state */}
      {state === "OPEN" && (
        <div className="w-[min(600px,85vw)] mb-8">
          <div className="glass-container h-3 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-radr-orange via-orange-400 to-radr-orange shadow-inner"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-3 text-center text-sm font-medium text-radr-orange/80">
            {Math.round(progress * 100)}% of migration window elapsed
          </div>
        </div>
      )}

      {/* Premium frosted-glass panel for timestamps */}
      <div className="w-[min(900px,90vw)]">
        <div className="glass-container rounded-2xl px-6 py-5 md:px-8 md:py-6 text-center space-y-3">
          <div className="text-sm md:text-base lg:text-lg text-white/90 font-medium">
            <span className="text-radr-orange font-semibold">Opening:</span> Sep 23, 2025 12:00 PM ET
            <span className="mx-3 text-white/40">•</span>
            <span className="text-white/75">Your local:</span> {isClient ? openingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ") : "Loading..."}
          </div>
          <div className="text-sm md:text-base lg:text-lg text-white/90 font-medium">
            <span className="text-radr-orange font-semibold">Closing:</span> Sep 30, 2025 12:00 PM ET
            <span className="mx-3 text-white/40">•</span>
            <span className="text-white/75">Your local:</span> {isClient ? closingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ") : "Loading..."}
          </div>
        </div>
      </div>

      {/* Premium CTA for open state */}
      {state === "OPEN" && (
        <div className="mt-10">
          <a
            href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
            target="_blank"
            className="glass-container rounded-2xl bg-gradient-to-r from-radr-orange to-orange-500 text-black font-bold text-lg
                       px-10 py-4 hover:scale-105 hover:shadow-2xl transition-all duration-300
                       focus:outline-none focus:ring-4 focus:ring-radr-orange/50 shadow-lg"
          >
            Start Migration Now
          </a>
        </div>
      )}
    </section>
  );
}