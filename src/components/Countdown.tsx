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
    <section aria-label="Migration countdown" className="relative w-full">
      {/* glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radr-orange/25 blur-3xl animate-radiate"
        aria-hidden
      />
      {/* headline */}
      <h1 className="text-center text-white font-extrabold leading-tight tracking-tight
                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        $TILT → $RADR Migration
      </h1>
      <p className="mt-3 text-center text-white/90 text-lg md:text-xl">{subline}</p>

      {/* tiles */}
      {state !== "CLOSED" && (
        <div className="mt-8 flex items-stretch justify-center gap-4">
          {[
            { label: "D", val: days.toString().padStart(2, "0") },
            { label: "H", val: fmtTwo(hours) },
            { label: "M", val: fmtTwo(minutes) },
            { label: "S", val: fmtTwo(seconds) },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="digit-tick grid min-w-[110px] place-items-center rounded-2xl
                         border border-radr-line/80 bg-white/5 backdrop-blur-md shadow-glass
                         px-6 py-6 md:px-8 md:py-8"
              data-tick="1"
              aria-label={`${label} remaining`}
            >
              <div className="text-white font-extrabold tabular-nums
                              text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                {val}
              </div>
              <div className="mt-1 text-xs tracking-[0.28em] text-radr-slate">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* state pill */}
      <div className="mt-4 flex justify-center">
        <span
          className={
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide " +
            (state === "OPEN"
              ? "border-radr-orange/70 text-white bg-radr-orange/15 animate-pulseBadge"
              : state === "PRE_OPEN"
              ? "border-white/30 text-white/80"
              : "border-white/20 text-white/50")
          }
        >
          {pill}
        </span>
      </div>

      {/* progress bar */}
      {state === "OPEN" && (
        <div className="mx-auto mt-6 w-[min(720px,92vw)]">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-radr-orange/80 to-white/80"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-1 text-center text-xs text-white/60">
            {Math.round(progress * 100)}% of window elapsed
          </div>
        </div>
      )}

      {/* open/close timestamps */}
      <div className="mx-auto mt-6 w-[min(920px,95vw)] text-center text-sm text-white/80">
        <div>
          Opening: Sep 23, 2025 12:00 PM ET • Your local:{" "}
          {openingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ")}
        </div>
        <div>
          Closing: Sep 30, 2025 12:00 PM ET • Your local:{" "}
          {closingLocal.toFormat("LLL d, yyyy h:mm a ZZZZ")}
        </div>
      </div>

      {/* CTA (open only) */}
      {state === "OPEN" && (
        <div className="mt-8 flex justify-center">
          <a
            href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
            target="_blank"
            className="rounded-2xl bg-radr-orange text-black font-semibold px-6 py-3 hover:opacity-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-radr-orange"
          >
            Start Migration
          </a>
        </div>
      )}
    </section>
  );
}