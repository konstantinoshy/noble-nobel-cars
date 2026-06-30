"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/cars", label: "cars" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+302101234567";
const PHONE_DISPLAY = PHONE.replace(/^(\+30)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");

export default function Header() {
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-surface-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-900 text-xs font-black text-white">
            NN
          </span>
          <span className="hidden sm:inline">Noble Nobel</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Right side: phone + locale + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tap-to-call — always visible */}
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            aria-label={t("callUs") || "Call us"}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>

          <LocaleSwitcher />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-surface-600 hover:bg-surface-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="animate-slide-down border-t border-surface-200 bg-white px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-100"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
