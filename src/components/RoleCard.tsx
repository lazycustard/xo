const RoleCardSkeleton = () => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="h-32 bg-gray-200 rounded-md mb-4"></div>

      {/* Title placeholder */}
      <div className="h-6 bg-gray-200 rounded-md mb-2"></div>

      {/* Description placeholder */}
      <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md mb-2"></div>

      {/* Button placeholder */}
      <div className="h-8 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default RoleCardSkeleton;