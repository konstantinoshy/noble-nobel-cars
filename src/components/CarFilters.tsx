"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarFiltersProps {
  makes: string[];
}

export default function CarFilters({ makes }: CarFiltersProps) {
  const t = useTranslations("Filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // ---- Debounced local state ----
  const [model, setModel] = useState(searchParams.get("model") || "");
  const [color, setColor] = useState(searchParams.get("color") || "");
  
  const [yearFrom, setYearFrom] = useState(searchParams.get("year_from") || "");
  const [yearTo, setYearTo] = useState(searchParams.get("year_to") || "");
  
  const [priceFrom, setPriceFrom] = useState(searchParams.get("price_from") || "");
  const [priceTo, setPriceTo] = useState(searchParams.get("price_to") || "");
  
  const [mileageFrom, setMileageFrom] = useState(searchParams.get("mileage_from") || "");
  const [mileageTo, setMileageTo] = useState(searchParams.get("mileage_to") || "");
  
  const [engineCcFrom, setEngineCcFrom] = useState(searchParams.get("engine_cc_from") || "");
  const [engineCcTo, setEngineCcTo] = useState(searchParams.get("engine_cc_to") || "");
  
  const [hpFrom, setHpFrom] = useState(searchParams.get("hp_from") || "");
  const [hpTo, setHpTo] = useState(searchParams.get("hp_to") || "");

  // Sync state if URL changes externally
  useEffect(() => setModel(searchParams.get("model") || ""), [searchParams]);
  useEffect(() => setColor(searchParams.get("color") || ""), [searchParams]);
  useEffect(() => setYearFrom(searchParams.get("year_from") || ""), [searchParams]);
  useEffect(() => setYearTo(searchParams.get("year_to") || ""), [searchParams]);
  useEffect(() => setPriceFrom(searchParams.get("price_from") || ""), [searchParams]);
  useEffect(() => setPriceTo(searchParams.get("price_to") || ""), [searchParams]);
  useEffect(() => setMileageFrom(searchParams.get("mileage_from") || ""), [searchParams]);
  useEffect(() => setMileageTo(searchParams.get("mileage_to") || ""), [searchParams]);
  useEffect(() => setEngineCcFrom(searchParams.get("engine_cc_from") || ""), [searchParams]);
  useEffect(() => setEngineCcTo(searchParams.get("engine_cc_to") || ""), [searchParams]);
  useEffect(() => setHpFrom(searchParams.get("hp_from") || ""), [searchParams]);
  useEffect(() => setHpTo(searchParams.get("hp_to") || ""), [searchParams]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function updateFilterDebounced(key: string, value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const qs = createQueryString({ [key]: value });
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 400);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasFilters = searchParams.toString().length > 0;

  const bodyTypes = [
    { value: "sedan", label: t("sedan") },
    { value: "hatchback", label: t("hatchback") },
    { value: "suv", label: t("suv") },
    { value: "coupe", label: t("coupe") },
    { value: "cabriolet", label: t("cabriolet") },
    { value: "wagon", label: t("wagon") },
    { value: "pickup", label: t("pickup") },
    { value: "van", label: t("van") },
  ];

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
    { value: "last_modified", label: t("sortLastModified") },
    { value: "price_asc", label: t("sortPriceAsc") },
    { value: "price_desc", label: t("sortPriceDesc") },
    { value: "registration", label: t("sortRegistration") },
    { value: "year_desc", label: t("sortYearDesc") },
    { value: "year_asc", label: t("sortYearAsc") },
    { value: "make_model", label: t("sortMakeModel") },
    { value: "mileage_desc", label: t("sortMileageDesc") },
    { value: "mileage_asc", label: t("sortMileageAsc") },
    { value: "hp_desc", label: t("sortHpDesc") },
    { value: "hp_asc", label: t("sortHpAsc") },
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
            value={searchParams.get("sort") || "last_modified"}
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

        <hr className="border-surface-100" />

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

        {/* Model (Text Input) */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("model")}
          </label>
          <input
            type="text"
            placeholder={t("modelPlaceholder")}
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              updateFilterDebounced("model", e.target.value);
            }}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Body Type */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("bodyType")}
          </label>
          <select
            value={searchParams.get("body_type") || ""}
            onChange={(e) => updateFilter("body_type", e.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">{t("allBodyTypes")}</option>
            {bodyTypes.map((bt) => (
              <option key={bt.value} value={bt.value}>
                {bt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("priceFrom")}
            </label>
            <input
              type="number"
              placeholder="0"
              value={priceFrom}
              onChange={(e) => {
                setPriceFrom(e.target.value);
                updateFilterDebounced("price_from", e.target.value);
              }}
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
              value={priceTo}
              onChange={(e) => {
                setPriceTo(e.target.value);
                updateFilterDebounced("price_to", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Year range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("yearFrom")}
            </label>
            <input
              type="number"
              placeholder="2010"
              value={yearFrom}
              onChange={(e) => {
                setYearFrom(e.target.value);
                updateFilterDebounced("year_from", e.target.value);
              }}
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
              value={yearTo}
              onChange={(e) => {
                setYearTo(e.target.value);
                updateFilterDebounced("year_to", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Mileage range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("mileageFrom")}
            </label>
            <input
              type="number"
              placeholder="0"
              value={mileageFrom}
              onChange={(e) => {
                setMileageFrom(e.target.value);
                updateFilterDebounced("mileage_from", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("mileageTo")}
            </label>
            <input
              type="number"
              placeholder="200000"
              value={mileageTo}
              onChange={(e) => {
                setMileageTo(e.target.value);
                updateFilterDebounced("mileage_to", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Engine CC range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("engineCcFrom")}
            </label>
            <input
              type="number"
              placeholder="1000"
              value={engineCcFrom}
              onChange={(e) => {
                setEngineCcFrom(e.target.value);
                updateFilterDebounced("engine_cc_from", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("engineCcTo")}
            </label>
            <input
              type="number"
              placeholder="2000"
              value={engineCcTo}
              onChange={(e) => {
                setEngineCcTo(e.target.value);
                updateFilterDebounced("engine_cc_to", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Horsepower range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("hpFrom")}
            </label>
            <input
              type="number"
              placeholder="90"
              value={hpFrom}
              onChange={(e) => {
                setHpFrom(e.target.value);
                updateFilterDebounced("hp_from", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
              {t("hpTo")}
            </label>
            <input
              type="number"
              placeholder="300"
              value={hpTo}
              onChange={(e) => {
                setHpTo(e.target.value);
                updateFilterDebounced("hp_to", e.target.value);
              }}
              className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
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

        {/* Color */}
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-surface-500">
            {t("color")}
          </label>
          <input
            type="text"
            placeholder={t("colorPlaceholder")}
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              updateFilterDebounced("color", e.target.value);
            }}
            className="w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="mt-2 w-full rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}
