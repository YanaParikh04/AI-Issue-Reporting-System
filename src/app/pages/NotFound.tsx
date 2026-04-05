import { Link } from "react-router";
import { AlertCircle, Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      <h1 className="text-4xl font-semibold text-slate-900 mb-3">
        404 - Page Not Found
      </h1>
      <p className="text-slate-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
