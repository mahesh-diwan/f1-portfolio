import { portfolioConfig } from "./portfolioConfig";

export const portfolioContext = {
  ai: {
    version: "2.0",

    objective:
      "Build a premium Formula 1 inspired developer portfolio that showcases engineering excellence and maximizes recruiter engagement.",

    contentSource: "portfolioConfig",

    instructions: [
      "Use portfolioConfig as the single source of truth.",
      "Never hardcode personal information.",
      "Never duplicate portfolio data.",
      "Generate every page dynamically from portfolioConfig.",
      "If additional content is required, extend portfolioConfig instead of hardcoding.",
    ],
  },

  product: {
    theme: "Formula One Engineering",

    style: [
      "Telemetry",
      "Race Strategy",
      "Mission Control",
      "Engineering Dashboard",
      "Pit Wall",
      "Cockpit HUD",
      "Performance",
      "Precision",
    ],

    avoid: [
      "Generic portfolio layouts",
      "Cyberpunk",
      "Copying Formula One branding",
      "Glassmorphism everywhere",
      "Unnecessary animations",
    ],
  },

  features: {
    telemetryDashboard: true,
    raceTimeline: true,
    pitWallProjects: true,
    commandPalette: true,
    keyboardShortcuts: true,
    githubIntegration: true,
    projectTelemetry: true,
    animatedCounters: true,
    responsiveFirst: true,
    accessibilityFirst: true,
  },

  quality: {
    lighthouse: 95,
    accessibility: "AA",
    productionReady: true,
    playwrightRequired: true,
    responsive: true,
    typescriptStrict: true,
  },

  source: portfolioConfig,
};

export default portfolioContext;
