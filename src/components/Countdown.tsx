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
  const [now, setNow] = useState(DateTime.now());
  const [prevValues, setPrevValues] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const state: State = now < openAt ? "PRE_OPEN" : now <= closeAt ? "OPEN" : "CLOSED";
  const target = state === "PRE_OPEN" ? openAt : state === "OPEN" ? closeAt : null;

  useEffect(() => {
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

  const openingLocal = openAt.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const closingLocal = closeAt.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const subline =
    state === "PRE_OPEN"
      ? "Opens Sep 23, 2025 • 12:00 PM ET"
      : state === "OPEN"
      ? "Closes Sep 30, 2025 • 12:00 PM ET"
      : "Migration window has closed";

  const pill =
    state === "PRE_OPEN" ? "OPENS IN" : state === "OPEN" ? "OPEN NOW" : "CLOSED";

  return (
    <section aria-label="Migration countdown" className="relative w-full particles">
      {/* Enhanced background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-radr-orange/30 via-radr-orange/10 to-transparent blur-3xl animate-radiate"
        aria-hidden
      />
      
      {/* Main headline with enhanced glow */}
      <div className="text-center mb-8">
        <h1 className="text-white font-black leading-tight tracking-tight text-glow stream-optimized
                       text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          $TILT → $RADR Migration
        </h1>
        <p className="mt-4 text-white/90 font-medium text-xl md:text-2xl lg:text-3xl">
          {subline}
        </p>
      </div>

      {/* Enhanced countdown tiles */}
      {state !== "CLOSED" && (
        <div className="mt-12 flex items-stretch justify-center gap-6 md:gap-8">
          {[
            { label: "DAYS", val: days.toString().padStart(2, "0"), prev: prevValues.days },
            { label: "HOURS", val: fmtTwo(hours), prev: prevValues.hours },
            { label: "MINUTES", val: fmtTwo(minutes), prev: prevValues.minutes },
            { label: "SECONDS", val: fmtTwo(seconds), prev: prevValues.seconds },
          ].map(({ label, val, prev }) => (
            <div
              key={label}
              className="glass-container orange-glow digit-flip grid min-w-[120px] md:min-w-[140px] lg:min-w-[160px] place-items-center rounded-3xl
                         px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12
                         hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${Math.random() * 2}s` }}
              aria-label={`${val} ${label.toLowerCase()} remaining`}
            >
              <div className="text-white font-black tabular-nums text-glow
                              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {val}
              </div>
              <div className="mt-2 text-xs md:text-sm tracking-[0.3em] text-radr-orange/80 font-semibold uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced state pill */}
      <div className="mt-8 flex justify-center">
        <span
          className={
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tracking-wide uppercase " +
            (state === "OPEN"
              ? "border-radr-orange/70 text-white bg-radr-orange/20 orange-glow animate-pulse"
              : state === "PRE_OPEN"
              ? "border-white/40 text-white/90 bg-white/5"
              : "border-white/20 text-white/50 bg-white/5")
          }
        >
          {state === "OPEN" && (
            <div className="w-2 h-2 bg-radr-orange rounded-full animate-pulse" />
          )}
          {pill}
        </span>
      </div>

      {/* Enhanced progress bar */}
      {state === "OPEN" && (
        <div className="mx-auto mt-8 w-[min(800px,90vw)]">
          <div className="glass-container h-2 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-radr-orange via-orange-400 to-radr-orange animate-pulse"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-2 text-center text-sm font-medium text-radr-orange/80">
            {Math.round(progress * 100)}% of migration window elapsed
          </div>
        </div>
      )}

      {/* Enhanced timestamp details */}
      <div className="mx-auto mt-12 w-[min(1000px,95vw)] text-center space-y-2">
        <div className="glass-container rounded-2xl px-6 py-4 text-white/90 font-medium">
          <div className="text-base md:text-lg">
            <span className="text-radr-orange font-semibold">Opening:</span> Sep 23, 2025 12:00 PM ET
            <span className="mx-4 text-white/50">•</span>
            <span className="text-white/80">Your local:</span> {openingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ")}
          </div>
          <div className="text-base md:text-lg mt-2">
            <span className="text-radr-orange font-semibold">Closing:</span> Sep 30, 2025 12:00 PM ET
            <span className="mx-4 text-white/50">•</span>
            <span className="text-white/80">Your local:</span> {closingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ")}
          </div>
        </div>
      </div>

      {/* Enhanced CTA */}
      {state === "OPEN" && (
        <div className="mt-10 flex justify-center">
          <a
            href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
            target="_blank"
            className="glass-container rounded-2xl bg-gradient-to-r from-radr-orange to-orange-500 text-black font-bold text-lg
                       px-8 py-4 hover:scale-105 hover:shadow-2xl transition-all duration-300
                       focus:outline-none focus:ring-4 focus:ring-radr-orange/50"
          >
            Start Migration Now
          </a>
        </div>
      )}
    </section>
  );
}