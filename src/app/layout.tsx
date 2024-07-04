import { absoluteUrl } from "@/libs/utils";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

const openSauceSans = localFont({
  src: "./OpenSauceSans.ttf",
  variable: "--font-openSauceSans",
});
const extenda = localFont({
  src: "./Extenda.otf",
  variable: "--font-extenda",
  weight: "900",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "DANIEL AIHIE",
    template: "%s | DANIEL AIHIE",
  },
  description: "A portfolio site for Daniel Aihie.",
  openGraph: {
    title: "DANIEL AIHIE",
    description: "A portfolio site for Daniel Aihie.",
    url: absoluteUrl("/"),
    siteName: "DANIEL AIHIE",
    images: [
      {
        url: absoluteUrl("/assets/images/og-image.png"),
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${extenda.variable} font-extenda ${openSauceSans.variable} font-openSauceSans`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
