// app/(main)/components/LoadingCard.tsx
export default function LoadingCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200"></div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        {/* Description */}
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>

        {/* Price / Button Row */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
