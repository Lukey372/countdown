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
    
    const timer = setTimeout(() => {
      setFlippingDigits({ days: false, hours: false, minutes: false, seconds: false });
    }, 600);
    
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
      ? "Opens September 23, 2025 at 12:00 PM ET"
      : state === "OPEN"
      ? "Closes September 30, 2025 at 12:00 PM ET"
      : "Migration window has closed";

  const pill =
    state === "PRE_OPEN" ? "OPENS IN" : state === "OPEN" ? "OPEN NOW" : "CLOSED";

  const pillClass =
    state === "OPEN" ? "state-pill-open" : state === "PRE_OPEN" ? "state-pill-pre" : "state-pill-closed";

  return (
    <section aria-label="Migration countdown" className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
      
      {/* Main headline - highly readable */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-readable font-black leading-tight tracking-tight stream-text
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl
                       mb-4 md:mb-6">
          <span className="text-glow-accent">$TILT</span>
          <span className="text-white mx-2 md:mx-4">→</span>
          <span className="text-glow-accent">$RADR</span>
        </h1>
        <h2 className="text-readable font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Migration
        </h2>
        <p className="mt-4 md:mt-6 text-secondary font-medium text-lg md:text-xl lg:text-2xl">
          {subline}
        </p>
      </div>

      {/* State indicator pill */}
      <div className="mb-8 md:mb-12">
        <span className={`inline-flex items-center gap-3 rounded-full px-6 py-3 md:px-8 md:py-4 
                         text-base md:text-lg font-bold tracking-wide uppercase ${pillClass}`}>
          {state === "OPEN" && (
            <div className="w-3 h-3 bg-orange-500 rounded-full" 
                 style={{ boxShadow: '0 0 10px rgba(255, 106, 0, 0.8)' }} />
          )}
          <span className="text-readable">{pill}</span>
        </span>
      </div>

      {/* Countdown timer - high contrast */}
      {state !== "CLOSED" && (
        <div className="glass-container rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              { label: "DAYS", val: days.toString().padStart(2, "0"), key: "days" },
              { label: "HOURS", val: fmtTwo(hours), key: "hours" },
              { label: "MINUTES", val: fmtTwo(minutes), key: "minutes" },
              { label: "SECONDS", val: fmtTwo(seconds), key: "seconds" },
            ].map(({ label, val, key }) => {
              const isFlipping = flippingDigits[key as keyof typeof flippingDigits];
              return (
                <div
                  key={label}
                  className={`countdown-tile digit-flip rounded-xl md:rounded-2xl 
                             p-4 md:p-6 lg:p-8 text-center min-w-[80px] md:min-w-[120px] lg:min-w-[140px]
                             ${isFlipping ? 'flipping' : ''}`}
                  aria-label={`${val} ${label.toLowerCase()} remaining`}
                >
                  <div className="text-readable font-black tabular-nums
                                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    {val}
                  </div>
                  <div className="mt-2 md:mt-3 text-xs md:text-sm lg:text-base 
                                  tracking-widest text-glow-accent font-bold uppercase">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress bar for open state */}
      {state === "OPEN" && (
        <div className="w-full max-w-2xl mb-8 md:mb-12">
          <div className="progress-container h-3 md:h-4 w-full rounded-full overflow-hidden">
            <div
              className="progress-fill h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-3 md:mt-4 text-center text-base md:text-lg font-semibold text-glow-accent">
            {Math.round(progress * 100)}% Complete
          </div>
        </div>
      )}

      {/* Migration window details */}
      <div className="w-full max-w-4xl mb-8 md:mb-12">
        <div className="glass-container rounded-xl md:rounded-2xl px-6 py-4 md:px-8 md:py-6 text-center">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-sm md:text-base lg:text-lg">
            <div>
              <span className="text-glow-accent font-semibold">Opens:</span>
              <span className="text-secondary ml-2">Sep 23, 2025 12:00 PM ET</span>
              <div className="text-xs md:text-sm text-secondary mt-1">
                {isClient ? `Local: ${openingLocal.toFormat("LLL d, h:mm a ZZZZ")}` : "Loading local time..."}
              </div>
            </div>
            <div>
              <span className="text-glow-accent font-semibold">Closes:</span>
              <span className="text-secondary ml-2">Sep 30, 2025 12:00 PM ET</span>
              <div className="text-xs md:text-sm text-secondary mt-1">
                {isClient ? `Local: ${closingLocal.toFormat("LLL d, h:mm a ZZZZ")}` : "Loading local time..."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA button for open state */}
      {state === "OPEN" && (
        <div>
          <a
            href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button rounded-full font-bold text-lg md:text-xl
                       px-8 py-4 md:px-12 md:py-5 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
          >
            Start Migration Now
          </a>
        </div>
      )}
    </section>
  );
}