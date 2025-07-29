import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CommonNavBar from "@/components/CommonNavBar";
import CommonFooter from "@/components/CommonFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The root layout of the site.
 *
 * This component is responsible for rendering the root layout of the site.
 * It renders a {@link CommonNavBar} component at the top, a main section
 * with a light gray background, and a {@link CommonFooter} component at the
 * bottom.
 *
 * @param children The React children to render in the main section.
 * @returns The root layout of the site.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CommonNavBar />
        <section className="bg-[#F1F2F6]">{children}</section>
        <CommonFooter />
      </body>
    </html>
  );
}
