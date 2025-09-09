const QRScannerSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 animate-pulse">
      {/* Scanner placeholder */}
      <div className="w-64 h-64 bg-gray-200 rounded-md mb-4"></div>

      {/* Text placeholder */}
      <div className="h-6 bg-gray-200 rounded-md w-48"></div>
    </div>
  );
};

export default QRScannerSkeleton;