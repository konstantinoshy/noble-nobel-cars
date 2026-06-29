"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

interface CarFiltersProps {
  makes: string[];
}

export default function CarFilters({ makes }: CarFiltersProps) {
  const t = useTranslations("Filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      });
      return current.toString();
    },
    [searchParams]
  );

  function updateFilter(key: string, value: string) {
    const qs = createQueryString({ [key]: value });
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasFilters = searchParams.toString().length > 0;

  const fuelTypes = [
    { value: "petrol", label: t("petrol") },
    { value: "diesel", label: t("diesel") },
    { value: "hybrid", label: t("hybrid") },
    { value: "electric", label: t("electric") },
  ];

  const transmissions = [
    { value: "manual", label: t("manual") },
    { value: "automatic", label: t("automatic") },
  ];

  const sortOptions = [
    { value: "newest", label: t("sortNewest") },
    { value: "price_asc", label: t("sortPriceAsc") },
    { value: "price_desc", label: t("sortPriceDesc") },
  ];

  return (
    <div className="rounded-xl border border-surface-200 bg-white">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 font-medium text-surface-900 md:hidden"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t("filters")}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter body */}
      <div className={`space-y-4 p-4 pt-0 md:block md:pt-4 ${open ? "block" : "hidden"}`}>
        {/* Sort */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("sort")}
          </label>
          <select
            value={searchParams.get("sort") || "newest"}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("make")}
          </label>
          <select
            value={searchParams.get("make") || ""}
            onChange={(e) => updateFilter("make", e.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">{t("allMakes")}</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("fuelType")}
          </label>
          <select
            value={searchParams.get("fuel_type") || ""}
            onChange={(e) => updateFilter("fuel_type", e.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">{t("allFuelTypes")}</option>
            {fuelTypes.map((ft) => (
              <option key={ft.value} value={ft.value}>
                {ft.label}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("transmission")}
          </label>
          <select
            value={searchParams.get("transmission") || ""}
            onChange={(e) => updateFilter("transmission", e.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">{t("allTransmissions")}</option>
            {transmissions.map((tr) => (
              <option key={tr.value} value={tr.value}>
                {tr.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("yearFrom")}
            </label>
            <input
              type="number"
              placeholder="2015"
              value={searchParams.get("year_from") || ""}
              onChange={(e) => updateFilter("year_from", e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("yearTo")}
            </label>
            <input
              type="number"
              placeholder="2025"
              value={searchParams.get("year_to") || ""}
              onChange={(e) => updateFilter("year_to", e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Price range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("priceFrom")}
            </label>
            <input
              type="number"
              placeholder="5000"
              value={searchParams.get("price_from") || ""}
              onChange={(e) => updateFilter("price_from", e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("priceTo")}
            </label>
            <input
              type="number"
              placeholder="50000"
              value={searchParams.get("price_to") || ""}
              onChange={(e) => updateFilter("price_to", e.target.value)}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="w-full rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}
