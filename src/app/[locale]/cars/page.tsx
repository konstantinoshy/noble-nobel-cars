import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getFilteredCars, getAvailableMakes, type CarFilters as FilterTypes } from "@/lib/queries/cars";
import CarCard from "@/components/CarCard";
import CarFilters from "@/components/CarFilters";

export const metadata: Metadata = {
  title: "Cars",
};

export default async function CarsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("CarsPage");
  const c = await getTranslations("Common");

  // Parse search params into filter object
  const filters: FilterTypes = {
    make: searchParams.make as string,
    fuel_type: searchParams.fuel_type as string,
    transmission: searchParams.transmission as string,
    sort: searchParams.sort as FilterTypes["sort"],
  };

  if (searchParams.year_from) filters.year_from = parseInt(searchParams.year_from as string);
  if (searchParams.year_to) filters.year_to = parseInt(searchParams.year_to as string);
  if (searchParams.price_from) filters.price_from = parseInt(searchParams.price_from as string);
  if (searchParams.price_to) filters.price_to = parseInt(searchParams.price_to as string);

  // Fetch data
  const [cars, makes] = await Promise.all([
    getFilteredCars(filters),
    getAvailableMakes(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900">{t("title")}</h1>
        <p className="mt-2 text-surface-500">{t("subtitle")} ({t("results", { count: cars.length })})</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full shrink-0 md:w-64 lg:w-72">
          <div className="sticky top-24">
            <CarFilters makes={makes} />
          </div>
        </aside>

        {/* Cars Grid */}
        <section className="flex-grow">
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-300 bg-surface-50 py-24 text-center">
              <svg className="h-12 w-12 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-surface-900">{c("noCarsFound")}</h3>
              <p className="mt-2 text-surface-500">{t("noResults")}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
