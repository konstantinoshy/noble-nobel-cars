export default function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-200 bg-white">
      {/* Image placeholder */}
      <div className="aspect-[16/10] animate-pulse bg-surface-200" />

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-200" />

        {/* Year + Mileage */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-12 animate-pulse rounded bg-surface-200" />
          <div className="h-3 w-16 animate-pulse rounded bg-surface-200" />
        </div>

        {/* Price + badge */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-surface-200" />
          <div className="h-4 w-14 animate-pulse rounded-full bg-surface-200" />
        </div>
      </div>
    </div>
  );
}
