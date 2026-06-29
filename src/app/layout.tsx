import "./globals.css";

// This root layout is a passthrough — the real root layout with <html>
// and <body> lives at [locale]/layout.tsx, managed by next-intl.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
