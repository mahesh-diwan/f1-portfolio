import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SectionRouter } from "@/components/layout/SectionRouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ScrollProgress />
      <main id="main-content" className="flex-1">
        <SectionRouter />
      </main>
      <Footer />
    </div>
  );
}
