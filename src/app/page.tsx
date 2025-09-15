import Countdown from "@/components/Countdown";
import Logo from "@/components/Logo";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-radr text-white overflow-hidden">
      {/* Fixed top navigation bar */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-4">
          <div className="flex items-center gap-4">
          <Logo />
        </div>
        </div>
      </nav>

      {/* Main content with top padding for fixed nav */}
      <div className="mx-auto grid place-items-center px-6 pt-24 min-h-screen">
        <Countdown />
      </div>
    </main>
  );
}