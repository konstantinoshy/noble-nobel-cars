import { setRequestLocale, getTranslations } from "next-intl/server";
import { getFeaturedCars } from "@/lib/queries/cars";
import CarCard from "@/components/CarCard";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("HomePage");
  
  // Fetch up to 6 featured cars
  const featuredCars = await getFeaturedCars(6);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-surface-900/90 mix-blend-multiply" />
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center sm:px-6 lg:px-8">
          <h1 className="animate-slide-up text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg text-surface-200" style={{ animationDelay: "100ms" }}>
            {t("heroSubtitle")}
          </p>
          <div className="animate-slide-up mt-10 flex justify-center gap-4" style={{ animationDelay: "200ms" }}>
            <Link
              href="/cars"
              className="rounded-full bg-accent-500 px-8 py-4 font-bold text-surface-900 transition-all hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/25"
            >
              {t("heroCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="bg-surface-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-surface-900">{t("featuredTitle")}</h2>
              <p className="mt-2 text-surface-500">{t("featuredSubtitle")}</p>
            </div>
            <Link href="/cars" className="font-semibold text-primary-600 hover:text-primary-700">
              {t("viewAllCars")}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
