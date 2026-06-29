"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";

interface InquiryFormProps {
  carId: string;
}

export default function InquiryForm({ carId }: InquiryFormProps) {
  const t = useTranslations("InquiryForm");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    
    const supabase = createClient();
    
    const { error } = await supabase.from("inquiries").insert({
      car_id: carId,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      consent_given: formData.get("consent") === "on",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-800">
        <svg className="mx-auto mb-3 h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-surface-900">{t("title")}</h3>

      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {t("error")}
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-surface-700">
          {t("name")} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder={t("namePlaceholder")}
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-surface-700">
            {t("phone")} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder={t("phonePlaceholder")}
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-surface-700">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-surface-700">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-lg border border-surface-200 px-4 py-2.5 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        ></textarea>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-surface-600">
          {t("consent")}{" "}
          <Link href="/about" className="font-medium text-primary-600 hover:underline">
            {t("privacyPolicy")}
          </Link>{" "}
          {t("consentSuffix")} *
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg disabled:opacity-50"
      >
        {loading ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
