"use client";

import { usePageTransition } from "@/lib/transition-context";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { TelemetrySkills } from "@/components/sections/TelemetrySkills";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";

const sections: Record<string, React.ReactNode> = {
  hero: <Hero />,
  experience: <Experience />,
  education: <Education />,
  projects: <Projects />,
  skills: <TelemetrySkills />,
  "open-source": <OpenSource />,
  contact: <Contact />,
};

export function SectionRouter() {
  const { activeSection } = usePageTransition();

  return <div>{sections[activeSection]}</div>;
}
