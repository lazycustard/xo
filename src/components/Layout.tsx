const LayoutSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header placeholder */}
      <header className="w-full bg-gray-100 h-16 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
            <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </header>

      {/* Main content placeholder */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
          <div className="h-24 bg-gray-200 rounded-md"></div>
        </div>
      </main>

      {/* Footer placeholder */}
      <footer className="w-full bg-gray-100 h-16 border-t border-gray-200 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutSkeleton;