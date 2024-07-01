import { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { absoluteUrl } from "@/libs/utils";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const ttNormsPro = localFont({
  src: "./TT-Norms-Pro.otf",
  variable: "--font-ttNormsPro",
  weight: "900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://outstatic.com"),
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
        url: absoluteUrl("/images/og-image.png"),
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon/favicon-32x32.png" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // className={`${heebo.variable} font-heebo ${arbutusSlab.variable} font-arbutusSlab ${helvetica.variable} font-helvetica`}

    <html
      lang="en"
      className={`${roboto.variable} font-roboto ${ttNormsPro.variable} font-ttNormsPro`}
    >
      <body>{children}</body>
    </html>
  );
}
