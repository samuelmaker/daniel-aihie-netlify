import { absoluteUrl } from "@/libs/utils";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const blocPro = localFont({
  src: "./Bloc.ttf",
  variable: "--font-blocPro",
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
    icon: [{ url: "/assets/images/logo.jpg" }],
    apple: [{ url: "/assets/images/logo.jpg" }],
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
      className={`${roboto.variable} font-roboto ${blocPro.variable} font-blocPro`}
    >
      <body>{children}</body>
    </html>
  );
}
