import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "greek"], variable: "--font-inter" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Noble Nobel Cars",
    default: "Noble Nobel Cars",
  },
  description: "Quality pre-owned vehicles — Μεταχειρισμένα αυτοκίνητα υψηλής ποιότητας",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Validate that the locale is supported
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased text-surface-900 bg-surface-50">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
