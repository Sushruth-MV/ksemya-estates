export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-r from-mist via-forest-light to-mist bg-[length:200%_100%] animate-shimmer rounded-sm ${className}`}
    />
  );
}

export function SkeletonPropertyCard() {
  return (
    <div className="bg-mist border border-cream/10 rounded-lg overflow-hidden">
      <SkeletonBlock className="aspect-video w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
        <SkeletonBlock className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonListRow() {
  return (
    <div className="bg-mist border border-cream/10 rounded-lg p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-3 w-20" />
      </div>
      <SkeletonBlock className="h-3 w-48" />
    </div>
  );
}
