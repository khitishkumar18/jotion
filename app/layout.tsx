import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });
// title and description of project
export const metadata: Metadata = {
  title: "Jotion",
  description: "The connected workspace where better, faster work happens.",
  // favicon for both dark and light mode of browser
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* wrapped the entire application to clerk and convex as authentication and database */}
        <ConvexClientProvider>
          {/* wrapped inside edegestore provider which helps us to upload image for notes */}
          <EdgeStoreProvider>
          {/* wrapped the children inside the theme-provider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme-2"
          >
            <Toaster position="bottom-center" />
            <ModalProvider />
            {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

