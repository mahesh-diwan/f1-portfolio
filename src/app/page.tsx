import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { SectionRouter } from "@/components/layout/SectionRouter";
import { KonamiCodeOverlay } from "@/components/providers/KonamiCode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <CommandPalette />
      <ScrollProgress />
      <KonamiCodeOverlay />
      <main id="main-content" className="flex-1">
        <SectionRouter />
      </main>
      <Footer />
    </div>
  );
}
