import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatPrice, formatMileage } from "@/lib/queries/cars";
import type { CarWithPrimaryImage } from "@/lib/queries/cars";

interface CarCardProps {
  car: CarWithPrimaryImage;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <article className="card-hover overflow-hidden rounded-xl border border-surface-200 bg-white">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-100">
          {car.primary_image_url ? (
            <Image
              src={car.primary_image_url}
              alt={car.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-surface-400">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-surface-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {car.title}
          </h3>

          <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {car.year}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {formatMileage(car.mileage_km)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-accent-700">
              {formatPrice(car.price_eur)}
            </span>
            {car.fuel_type && (
              <span className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-surface-600">
                {car.fuel_type}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
