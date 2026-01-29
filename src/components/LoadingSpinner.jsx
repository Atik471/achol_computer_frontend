/**
 * LoadingSpinner - A flexible loading component with multiple variants
 * 
 * @param {string} variant - "overlay" | "inline" | "spinner"
 *   - overlay: Semi-transparent backdrop with centered spinner (for auth, route guards)
 *   - inline: Spinner within content area, layout stays visible (for page loading)
 *   - spinner: Tiny inline spinner only (for buttons, small areas)
 * @param {string} message - Optional loading message text
 */
const LoadingSpinner = ({ variant = "overlay", message = "Loading..." }) => {
  // Overlay: Semi-transparent backdrop with blur effect - shows blurred background
  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-base-content font-medium">{message}</p>
        </div>
      </div>
    );
  }

  // Inline: Content area spinner - layout (navbar, sidebar) remains visible
  if (variant === "inline") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content/70">{message}</p>
      </div>
    );
  }

  // Spinner: Tiny inline spinner for buttons and small areas
  return <span className="loading loading-spinner loading-sm text-primary" />;
};

export default LoadingSpinner;
