'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  onStateChange: (state: 'pre-open' | 'open' | 'closed') => void;
}

const Countdown: React.FC<CountdownProps> = ({ onStateChange }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentState, setCurrentState] = useState<'pre-open' | 'open' | 'closed'>('pre-open');

  useEffect(() => {
    // Define the migration window times in ET
    const openTime = DateTime.fromObject({
      year: 2025,
      month: 9,
      day: 23,
      hour: 12,
      minute: 0,
      second: 0
    }, { zone: 'America/New_York' });

    const closeTime = DateTime.fromObject({
      year: 2025,
      month: 9,
      day: 30,
      hour: 12,
      minute: 0,
      second: 0
    }, { zone: 'America/New_York' });

    const updateCountdown = () => {
      const now = DateTime.now();
      
      let targetTime: DateTime;
      let state: 'pre-open' | 'open' | 'closed';

      if (now < openTime) {
        targetTime = openTime;
        state = 'pre-open';
      } else if (now <= closeTime) {
        targetTime = closeTime;
        state = 'open';
      } else {
        state = 'closed';
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCurrentState(state);
        onStateChange(state);
        return;
      }

      const diff = targetTime.diff(now, ['days', 'hours', 'minutes', 'seconds']);
      const { days, hours, minutes, seconds } = diff.toObject();

      setTimeLeft({
        days: Math.max(0, Math.floor(days || 0)),
        hours: Math.max(0, Math.floor(hours || 0)),
        minutes: Math.max(0, Math.floor(minutes || 0)),
        seconds: Math.max(0, Math.floor(seconds || 0))
      });

      if (state !== currentState) {
        setCurrentState(state);
        onStateChange(state);
      }
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [currentState, onStateChange]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Countdown Tiles */}
      <div className="grid grid-cols-4 gap-4 md:gap-8">
        {[
          { value: timeLeft.days, label: 'D' },
          { value: timeLeft.hours, label: 'H' },
          { value: timeLeft.minutes, label: 'M' },
          { value: timeLeft.seconds, label: 'S' }
        ].map(({ value, label }) => (
          <div
            key={label}
            className="glass rounded-2xl p-6 md:p-8 text-center min-w-[80px] md:min-w-[120px]"
          >
            <div className="text-[10vw] md:text-8xl font-bold tabular-nums text-white mb-2 animate-pulse">
              {formatNumber(value)}
            </div>
            <div className="text-radr-slate text-sm md:text-base uppercase tracking-[0.2em] font-medium">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* State Badge */}
      <div className="px-6 py-3 rounded-full bg-radr-charcoal border border-radr-line">
        <span className="text-radr-slate text-sm md:text-base font-medium uppercase tracking-wider">
          {currentState === 'pre-open' && 'OPENS IN'}
          {currentState === 'open' && 'OPEN NOW'}
          {currentState === 'closed' && 'CLOSED'}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
