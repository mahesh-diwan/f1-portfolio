import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahesh Diwan | DevOps & Cloud Engineer",
    short_name: "Mahesh Diwan",
    description:
      "DevOps & Cloud Infrastructure Engineer portfolio inspired by Formula One engineering.",
    start_url: "/f1-portfolio/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#dc0000",
    icons: [
      {
        src: "/f1-portfolio/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
