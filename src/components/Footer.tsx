import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-surface-900"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-900 text-[10px] font-black text-white">
              NN
            </span>
            Noble Nobel Cars
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-surface-500">
            <Link
              href="/about"
              className="hover:text-surface-800 transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-surface-400">
          {t("rights", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
