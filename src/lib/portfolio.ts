import { portfolioConfig } from "../../portfolioConfig";
import type { Project, Experience, Education, SkillGroup, Certification } from "../../portfolioConfig";

export type { Project, Experience, Education, SkillGroup, Certification };

export const portfolio = portfolioConfig;

export function getProject(id: string): Project | undefined {
  return portfolio.projects.find((p) => p.id === id);
}

export function getExperience(id: string): Experience | undefined {
  return portfolio.experience.find((e) => e.id === id);
}

export function getEducation(id: string): Education | undefined {
  return portfolio.education.find((e) => e.id === id);
}

export function getSkillGroup(name: string): SkillGroup | undefined {
  return portfolio.skills.find((s) => s.group === name);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  portfolio.projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  portfolio.experience.forEach((e) => e.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getGithubApiUrl(): string {
  return `https://api.github.com/users/${portfolio.githubUsername}`;
}
