export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-radr-orange/25 to-radr-orange/10 ring-1 ring-radr-orange/30 shadow-glow backdrop-blur-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-radr-orange" aria-hidden>
          <path d="M6 4h7.2c3.2 0 5.1 1.7 5.1 4.5 0 2.1-1.1 3.6-3 4.2l3.1 7.3h-3.2l-2.7-6.6H9v6.6H6V4zm8 6.6c1.6 0 2.6-.7 2.6-2.1s-1-2-2.6-2H9v4.1h5z"/>
        </svg>
      </span>
      <span className="text-white font-bold text-xl tracking-tight">Radr</span>
    </div>
  );
}