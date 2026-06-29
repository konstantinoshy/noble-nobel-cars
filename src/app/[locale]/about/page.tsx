import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("AboutPage");

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-xl text-surface-500">{t("description")}</p>
      </div>

      <div className="mt-16 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-surface-900">{t("storyTitle")}</h2>
          <p className="mt-4 text-lg text-surface-600 leading-relaxed">
            {t("storyText")}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-surface-900 mb-8">{t("whyUsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200">
              <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-surface-900">{t("reason1Title")}</h3>
              <p className="mt-2 text-surface-600">{t("reason1Text")}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200">
              <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-surface-900">{t("reason2Title")}</h3>
              <p className="mt-2 text-surface-600">{t("reason2Text")}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200">
              <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-surface-900">{t("reason3Title")}</h3>
              <p className="mt-2 text-surface-600">{t("reason3Text")}</p>
            </div>
          </div>
        </section>
        
        <section className="rounded-3xl bg-surface-900 p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">{t("valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div>
                <h3 className="text-xl font-bold text-accent-400">{t("value1")}</h3>
                <p className="mt-2 text-surface-300">{t("value1Text")}</p>
             </div>
             <div>
                <h3 className="text-xl font-bold text-accent-400">{t("value2")}</h3>
                <p className="mt-2 text-surface-300">{t("value2Text")}</p>
             </div>
             <div>
                <h3 className="text-xl font-bold text-accent-400">{t("value3")}</h3>
                <p className="mt-2 text-surface-300">{t("value3Text")}</p>
             </div>
          </div>
        </section>
      </div>
    </main>
  );
}
