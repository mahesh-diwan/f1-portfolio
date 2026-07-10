import type { Metadata } from "next";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { LoadingScreen } from "@/components/providers/LoadingScreen";
import { ThemeProvider } from "@/lib/theme-context";
import { TransitionProvider } from "@/lib/transition-context";
import "./globals.css";

const basePath = process.env.GITHUB_ACTIONS ? "/f1-portfolio" : "";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahesh Diwan | DevOps & Cloud Engineer",
  description:
    "DevOps & Cloud Infrastructure Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation. Portfolio inspired by Formula One pit wall engineering.",
  keywords: [
    "DevOps",
    "Cloud Engineer",
    "AWS",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Mahesh Diwan",
    "Portfolio",
    "Formula One",
    "F1",
    "Pit Wall",
    "Telemetry",
  ],
  authors: [{ name: "Mahesh Diwan" }],
  creator: "Mahesh Diwan",
  metadataBase: new URL("https://mahesh-diwan.github.io"),
  openGraph: {
    title: "Mahesh Diwan | DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Infrastructure Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation. Built with Next.js, inspired by F1 pit wall engineering.",
    type: "website",
    locale: "en_US",
    siteName: "Mahesh Diwan — Pit Wall Portfolio",
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Mahesh Diwan — DevOps & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesh Diwan | DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Infrastructure Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation.",
    images: [`${basePath}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans antialiased">
        <LoadingScreen />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--text-inverse)] focus:text-xs focus:font-mono focus:uppercase focus:tracking-wider focus:rounded-sm"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ThemeProvider>
            <TransitionProvider>
              {children}
            </TransitionProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}