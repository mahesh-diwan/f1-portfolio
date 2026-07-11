"use client";

import { usePageTransition } from "@/lib/transition-context";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { TelemetrySkills } from "@/components/sections/TelemetrySkills";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";
import { PitStopCountdown } from "@/components/sections/PitStopCountdown";
import { Podium } from "@/components/sections/Podium";

const sections: Record<string, React.ReactNode> = {
  hero: <Hero />,
  experience: <Experience />,
  education: <Education />,
  projects: <Projects />,
  skills: <TelemetrySkills />,
  "pit-stop": <PitStopCountdown />,
  "open-source": <OpenSource />,
  contact: <Contact />,
  podium: <Podium />,
};

export function SectionRouter() {
  const { activeSection } = usePageTransition();

  return <div>{sections[activeSection] ?? null}</div>;
}
