import Countdown from "@/components/Countdown";
import Logo from "@/components/Logo";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-radr text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-6">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
      </div>

      <div className="mx-auto grid place-items-center px-4 py-10 md:py-16 min-h-[90vh]">
        <Countdown />
      </div>
    </main>
  );
}