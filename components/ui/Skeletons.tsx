export function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      <div className="border border-gray-200 rounded-lg p-3 space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        {[1, 2].map((i) => (
          <div key={i} className="h-9 rounded-lg bg-gray-200 animate-pulse" />
        ))}
        <div className="h-8 rounded-lg bg-gray-100 animate-pulse mt-1" />
      </div>
      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-20 rounded-lg bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-1 flex-wrap">
            {[60, 80, 70].map((w, i) => (
              <div key={i} className="h-5 rounded bg-gray-200 animate-pulse" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuilderSkeleton() {
  return (
    <div className="h-full overflow-hidden p-4 sm:p-6 bg-gray-50">
      <div className="flex gap-2 mb-6">
        {[80, 100, 90, 70, 110, 120, 90].map((w, i) => (
          <div key={i} className="h-8 rounded-md bg-gray-200 animate-pulse shrink-0" style={{ width: w }} />
        ))}
      </div>
      <div className="space-y-3 max-w-2xl">
        <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
        </div>
        <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
        </div>
        <div className="h-32 rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

export function PreviewSkeleton() {
  return (
    <div className="w-full h-full flex items-start justify-center pt-6 px-4">
      <div className="w-full max-w-2xl lg:max-w-none space-y-3 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-px bg-gray-200 my-4" />
        {[120, 80, 160, 100, 80].map((h, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="rounded-lg bg-gray-200" style={{ height: h }} />
          </div>
        ))}
      </div>
    </div>
  );
}
