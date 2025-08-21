
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary dark:border-primary-content"></div>
        {/* Optional Text */}
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
