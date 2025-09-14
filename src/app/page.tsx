'use client';

import React, { useState } from 'react';
import { DateTime } from 'luxon';
import Logo from '@/components/Logo';
import Countdown from '@/components/Countdown';

export default function Home() {
  const [migrationState, setMigrationState] = useState<'pre-open' | 'open' | 'closed'>('pre-open');

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

  const formatTimeForDisplay = (dt: DateTime) => {
    return dt.toFormat('MMM d, yyyy h:mm a');
  };

  const getLocalTime = (dt: DateTime) => {
    return dt.toLocal().toFormat('MMM d, yyyy h:mm a z');
  };

  const handleStateChange = (state: 'pre-open' | 'open' | 'closed') => {
    setMigrationState(state);
  };

  return (
    <div className="min-h-screen bg-radr-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Background Gradient with Orange Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-radr-black via-radr-charcoal to-radr-black">
          <div className="absolute inset-0 bg-gradient-radial from-radr-orange/20 via-transparent to-transparent animate-radiate"></div>
        </div>

        {/* Top Left Logo */}
        <div className="absolute top-8 left-8 z-10">
          <Logo />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-float-glow">
            $TILT → $RADR Migration
          </h1>

          {/* Sub-line */}
          <p className="text-lg md:text-xl text-radr-slate mb-12">
            {migrationState === 'pre-open' && 'Opens Sep 23, 2025 • 12:00 PM ET'}
            {migrationState === 'open' && 'Closes Sep 30, 2025 • 12:00 PM ET'}
            {migrationState === 'closed' && 'Migration window has closed'}
          </p>

          {/* Countdown */}
          <div className="mb-12" aria-live="polite">
            <Countdown onStateChange={handleStateChange} />
          </div>

          {/* CTA Button (only during open window) */}
          {migrationState === 'open' && (
            <div className="mb-12">
              <a
                href="https://radr.fun?utm_source=countdown&utm_medium=landing&utm_campaign=tilt_to_radr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-radr-orange text-radr-black font-bold text-lg rounded-full hover:bg-radr-orange/90 transition-colors duration-200 shadow-lg hover:shadow-radr-orange/25"
              >
                Start Migration
              </a>
            </div>
          )}

          {/* Time Information */}
          <div className="text-sm text-radr-slate space-y-1">
            <div>
              Opening: {formatTimeForDisplay(openTime)} ET • Your local: {getLocalTime(openTime)}
            </div>
            <div>
              Closing: {formatTimeForDisplay(closeTime)} ET • Your local: {getLocalTime(closeTime)}
            </div>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="py-16 px-4 bg-radr-charcoal/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* What is migrating? */}
            <div className="glass rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-3">What is migrating?</h3>
              <p className="text-radr-slate text-sm leading-relaxed">
                Migrate $TILT to $RADR in one click.
              </p>
            </div>

            {/* When? */}
            <div className="glass rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-3">When?</h3>
              <p className="text-radr-slate text-sm leading-relaxed">
                One-week window • Sep 23 → Sep 30 (ET).
              </p>
            </div>

            {/* Where to migrate? */}
            <div className="glass rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-3">Where to migrate?</h3>
              <p className="text-radr-slate text-sm leading-relaxed">
                radr.fun • Official migration portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-radr-line">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs text-radr-slate">
            © 2025 Radr. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {/* Social Links */}
            <a
              href="https://x.com/radr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-radr-slate hover:text-radr-orange transition-colors"
              aria-label="Follow on X"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            <a
              href="https://t.me/radr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-radr-slate hover:text-radr-orange transition-colors"
              aria-label="Join Telegram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}