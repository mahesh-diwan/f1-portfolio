import { portfolioConfig } from "../../portfolioConfig";
import type { Project, Experience, Education, SkillGroup, Certification } from "../../portfolioConfig";

export type { Project, Experience, Education, SkillGroup, Certification };

export const portfolio = portfolioConfig;

export function getProject(id: string): Project | undefined {
  return portfolio.projects.find((p) => p.id === id);
}


