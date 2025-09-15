import Countdown from "@/components/Countdown";
import Logo from "@/components/Logo";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-radr text-white overflow-hidden">
      {/* Fixed top navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-3 md:py-4">
          <Logo />
        </div>
      </nav>

      {/* Main content with proper spacing for fixed nav */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <Countdown />
      </div>
    </main>
  );
}