export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-radr-orange/30 to-radr-orange/15 ring-2 ring-radr-orange/40 shadow-glow backdrop-blur-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" className="fill-radr-orange" aria-hidden>
          <path d="M6 4h7.2c3.2 0 5.1 1.7 5.1 4.5 0 2.1-1.1 3.6-3 4.2l3.1 7.3h-3.2l-2.7-6.6H9v6.6H6V4zm8 6.6c1.6 0 2.6-.7 2.6-2.1s-1-2-2.6-2H9v4.1h5z"/>
        </svg>
      </span>
      <span className="text-white font-bold text-2xl tracking-tight text-glow-subtle">Radr</span>
    </div>
  );
}