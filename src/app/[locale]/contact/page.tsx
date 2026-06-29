import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("ContactPage");

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-xl text-surface-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-surface-200">
             <h2 className="text-2xl font-bold text-surface-900 mb-6">{t("description")}</h2>
             
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   </div>
                   <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider text-surface-500">{t("addressLabel")}</h3>
                      <p className="mt-1 text-lg text-surface-900 whitespace-pre-line">{t("addressValue")}</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                   </div>
                   <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider text-surface-500">{t("phoneLabel")}</h3>
                      <p className="mt-1 text-lg font-medium text-surface-900">{t("phoneValue")}</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </div>
                   <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider text-surface-500">{t("emailLabel")}</h3>
                      <p className="mt-1 text-lg text-surface-900">{t("emailValue")}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="rounded-2xl bg-surface-50 p-8 border border-surface-200">
             <h3 className="text-lg font-bold text-surface-900 mb-4">{t("hoursLabel")}</h3>
             <ul className="space-y-3 text-surface-600">
                <li className="flex justify-between border-b border-surface-200 pb-2">
                   <span>{t("hoursWeekday").split(':')[0]}</span>
                   <span className="font-medium text-surface-900">{t("hoursWeekday").split(':').slice(1).join(':')}</span>
                </li>
                <li className="flex justify-between border-b border-surface-200 pb-2">
                   <span>{t("hoursSaturday").split(':')[0]}</span>
                   <span className="font-medium text-surface-900">{t("hoursSaturday").split(':').slice(1).join(':')}</span>
                </li>
                <li className="flex justify-between">
                   <span>{t("hoursSunday").split(':')[0]}</span>
                   <span className="font-medium text-red-600">{t("hoursSunday").split(':').slice(1).join(':')}</span>
                </li>
             </ul>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-96 md:h-full min-h-[400px] rounded-2xl bg-surface-200 relative overflow-hidden border border-surface-300">
           <div className="absolute inset-0 flex items-center justify-center flex-col text-surface-500">
              <svg className="h-12 w-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              <p className="font-medium">Map Integration Placeholder</p>
           </div>
        </div>
      </div>
    </main>
  );
}
