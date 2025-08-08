export default function PropertyCardSkeleton() {
  return (
    <div className="lg:w-[400px] lg:h-[450px] rounded-xl shadow-lg overflow-hidden bg-white animate-pulse">
      {/* Image Section */}
      <div className="relative w-full h-60 bg-gray-300"></div>

      {/* Details Section */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

        {/* Property Info */}
        <div className="flex justify-between text-sm">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between text-sm mt-5">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
