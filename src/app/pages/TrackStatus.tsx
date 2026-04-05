import { useState } from "react";
import { Search, Clock, CheckCircle2, AlertCircle, Loader } from "lucide-react";

type IssueStatus = "Pending" | "In Progress" | "Resolved" | "Closed";

interface IssueDetails {
  id: string;
  category: string;
  status: IssueStatus;
  priority: "Low" | "Medium" | "High";
  submittedDate: string;
  lastUpdate: string;
  description: string;
}

export function TrackStatus() {
  const [trackingId, setTrackingId] = useState("");
  const [issue, setIssue] = useState<IssueDetails | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockIssues: Record<string, IssueDetails> = {
    "ISS-12345678-ABCD": {
      id: "ISS-12345678-ABCD",
      category: "Technical",
      status: "In Progress",
      priority: "High",
      submittedDate: "2026-04-01",
      lastUpdate: "2026-04-03",
      description: "Projector not working in Room 301",
    },
    "ISS-87654321-WXYZ": {
      id: "ISS-87654321-WXYZ",
      category: "Academic",
      status: "Resolved",
      priority: "Medium",
      submittedDate: "2026-03-28",
      lastUpdate: "2026-04-02",
      description: "Course material access issue",
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setIssue(null);

    // Simulate API call
    setTimeout(() => {
      const foundIssue = mockIssues[trackingId];
      if (foundIssue) {
        setIssue(foundIssue);
      } else {
        setNotFound(true);
      }
      setIsSearching(false);
    }, 800);
  };

  const getStatusIcon = (status: IssueStatus) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-5 h-5" />;
      case "In Progress":
        return <Loader className="w-5 h-5" />;
      case "Resolved":
      case "Closed":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Resolved":
      case "Closed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Track Issue Status
        </h1>
        <p className="text-slate-600">
          Enter your tracking ID to view the current status of your issue
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="trackingId" className="flex items-center gap-2 mb-2 text-slate-700">
              <Search className="w-5 h-5 text-blue-600" />
              Tracking ID
            </label>
            <input
              type="text"
              id="trackingId"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g., ISS-12345678-ABCD"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Issue
              </>
            )}
          </button>
        </form>
      </div>

      {/* Not Found Message */}
      {notFound && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-red-900 mb-2">Issue Not Found</h3>
          <p className="text-red-700">
            No issue found with the tracking ID: <code className="font-mono">{trackingId}</code>
            <br />
            Please check your tracking ID and try again.
          </p>
        </div>
      )}

      {/* Issue Details */}
      {issue && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl text-slate-900 mb-2">Issue Details</h2>
                <code className="text-sm text-slate-600 font-mono">{issue.id}</code>
              </div>
              <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${getStatusColor(issue.status)}`}>
                {getStatusIcon(issue.status)}
                {issue.status}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Category</p>
                <p className="text-slate-900">{issue.category}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Priority</p>
                <span className={`inline-block px-3 py-1 rounded-lg border text-sm ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Submitted Date</p>
                <p className="text-slate-900">{new Date(issue.submittedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Last Updated</p>
                <p className="text-slate-900">{new Date(issue.lastUpdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">Description</p>
              <p className="text-slate-900">{issue.description}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-slate-50 border-t border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Status Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900">Issue Submitted</p>
                  <p className="text-sm text-slate-600">{new Date(issue.submittedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              {issue.status !== "Pending" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Loader className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900">In Progress</p>
                    <p className="text-sm text-slate-600">Being reviewed by the department</p>
                  </div>
                </div>
              )}
              {(issue.status === "Resolved" || issue.status === "Closed") && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900">Resolved</p>
                    <p className="text-sm text-slate-600">{new Date(issue.lastUpdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Demo IDs */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Demo Tracking IDs:</strong> Try these IDs to see different statuses:
          <br />
          <code className="font-mono">ISS-12345678-ABCD</code> (In Progress) or{" "}
          <code className="font-mono">ISS-87654321-WXYZ</code> (Resolved)
        </p>
      </div>
    </div>
  );
}
