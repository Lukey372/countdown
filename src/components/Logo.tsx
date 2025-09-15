export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl 
                      bg-gradient-to-br from-orange-500/30 to-orange-600/20 
                      ring-2 ring-orange-500/50 backdrop-blur-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-orange-500" aria-hidden>
          <path d="M6 4h7.2c3.2 0 5.1 1.7 5.1 4.5 0 2.1-1.1 3.6-3 4.2l3.1 7.3h-3.2l-2.7-6.6H9v6.6H6V4zm8 6.6c1.6 0 2.6-.7 2.6-2.1s-1-2-2.6-2H9v4.1h5z"/>
        </svg>
      </div>
      <span className="text-readable font-bold text-xl md:text-2xl tracking-tight">Radr</span>
    </div>
  );
}