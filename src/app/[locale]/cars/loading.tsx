import CarCardSkeleton from "@/components/CarCardSkeleton";

export default function CarsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 animate-pulse rounded bg-surface-200" />
        <div className="h-4 w-64 animate-pulse rounded bg-surface-200" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        {/* Filter sidebar skeleton */}
        <aside className="hidden md:block">
          <div className="space-y-4 rounded-xl border border-surface-200 bg-white p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-surface-200" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-surface-200" />
              </div>
            ))}
          </div>
        </aside>

        {/* Car grid skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
