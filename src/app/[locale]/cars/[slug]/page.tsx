import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getCarBySlug, formatPrice, formatMileage } from "@/lib/queries/cars";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import InquiryForm from "@/components/InquiryForm";

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);
  
  if (!car) {
    return { title: "Not Found" };
  }

  const title = `${car.year} ${car.make} ${car.model}`;
  const description = `${title} - ${formatMileage(car.mileage_km)}, ${car.fuel_type}, ${formatPrice(car.price_eur)}. Quality pre-owned vehicle at Noble Nobel Cars.`;

  return {
    title,
    description,
  };
}

export default async function CarDetailPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("CarDetail");
  const c = await getTranslations("Common");
  
  const car = await getCarBySlug(params.slug);

  if (!car) {
    notFound();
  }

  const specs = [
    { label: t("year"), value: car.year },
    { label: t("mileage"), value: formatMileage(car.mileage_km) },
    { label: t("fuelType"), value: car.fuel_type ? c(car.fuel_type) : "-" },
    { label: t("transmission"), value: car.transmission ? c(car.transmission) : "-" },
    { label: t("engineCc"), value: car.engine_cc ? `${car.engine_cc} cc` : "-" },
    { label: t("color"), value: car.color || "-" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/cars" className="inline-flex items-center text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">
          {t("backToCars")}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Gallery & Description */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-surface-900 sm:text-4xl">{car.title}</h1>
            <p className="mt-2 text-lg text-surface-500">{car.make} {car.model}</p>
          </div>

          <PhotoGallery images={car.car_images} />

          {car.description && (
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200">
              <h2 className="text-xl font-bold text-surface-900 mb-4">Description</h2>
              <div className="prose prose-surface max-w-none whitespace-pre-wrap">
                {car.description}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Price, Specs, Form */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200 text-center">
            <div className="text-sm font-medium uppercase tracking-wider text-surface-500 mb-2">{t("price")}</div>
            <div className="text-4xl font-extrabold text-accent-700">{formatPrice(car.price_eur)}</div>
            
            {car.status !== "available" && (
              <div className="mt-4 inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                {t(car.status)}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-200">
            <h3 className="text-lg font-bold text-surface-900 mb-4">{t("specifications")}</h3>
            <dl className="space-y-4">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-surface-100 pb-2 last:border-0 last:pb-0">
                  <dt className="text-surface-500">{spec.label}</dt>
                  <dd className="font-medium text-surface-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <InquiryForm carId={car.id} />
        </div>
      </div>
    </main>
  );
}
