import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { SectionRouter } from "@/components/layout/SectionRouter";
import { KonamiCodeOverlay } from "@/components/ui/KonamiCode";

export default function Home() {
  return (
    <>
      <Navigation />
      <CommandPalette />
      <ScrollProgress />
      <KonamiCodeOverlay />
      <main id="main-content">
        <SectionRouter />
      </main>
      <Footer />
    </>
  );
}
