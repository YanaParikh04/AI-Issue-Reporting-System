import { Link, useNavigate } from "react-router";
import { CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export function Success() {
  const navigate = useNavigate();
  const [trackingId] = useState(() => 
    `ISS-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  );

  useEffect(() => {
    // Check if there's a submission in sessionStorage
    const lastSubmission = sessionStorage.getItem("lastSubmission");
    if (!lastSubmission) {
      // Redirect to report page if accessed directly
      navigate("/report");
    }
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Issue Submitted Successfully!
        </h1>
        <p className="text-slate-600 mb-8">
          Your issue has been received and is being processed by our AI system.
          We'll review it and take appropriate action.
        </p>

        {/* Tracking ID */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-slate-600 mb-2">Your Tracking ID</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <code className="text-2xl font-mono text-blue-600">
              {trackingId}
            </code>
          </div>
          <p className="text-sm text-slate-500">
            Save this ID to track your issue's progress
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            What happens next?
          </h3>
          <ol className="space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600">1.</span>
              <span>AI system categorizes and prioritizes your issue</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600">2.</span>
              <span>Assigned to the appropriate department</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600">3.</span>
              <span>You'll receive updates as progress is made</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-blue-600">4.</span>
              <span>Issue will be resolved and closed</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/report"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            <FileText className="w-5 h-5" />
            Submit Another Issue
          </Link>
          <Link
            to="/track"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Track Issue Status
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mt-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
