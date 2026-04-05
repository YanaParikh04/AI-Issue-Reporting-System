import { Link } from "react-router";
import { FileText, Search, Shield, CheckCircle2, Clock, Users } from "lucide-react";

export function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900">
          Welcome to the AI-Based Issue Reporting System
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A modern, transparent, and efficient platform for reporting and tracking issues
          in your institution. Your voice matters.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/report"
          className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
            <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl mb-2 text-slate-900">Report an Issue</h3>
          <p className="text-slate-600">
            Submit a new issue with detailed information and supporting documents.
          </p>
        </Link>

        <Link
          to="/track"
          className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
            <Search className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl mb-2 text-slate-900">Track Status</h3>
          <p className="text-slate-600">
            Check the current status and progress of your submitted issues.
          </p>
        </Link>

        <Link
          to="/admin"
          className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
            <Shield className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl mb-2 text-slate-900">Admin Dashboard</h3>
          <p className="text-slate-600">
            Manage and resolve reported issues efficiently with advanced tools.
          </p>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-2xl mb-6 text-slate-900 text-center">System Overview</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-semibold text-slate-900">1,234</div>
            <div className="text-slate-600">Total Reports</div>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-semibold text-slate-900">987</div>
            <div className="text-slate-600">Resolved Issues</div>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-semibold text-slate-900">2.5 days</div>
            <div className="text-slate-600">Avg. Resolution Time</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
        <h2 className="text-2xl mb-6 text-slate-900 text-center">Why Use Our System?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-1">Transparent Tracking</h4>
              <p className="text-slate-600">
                Monitor your issue's progress in real-time with status updates.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-1">Anonymous Reporting</h4>
              <p className="text-slate-600">
                Report sensitive issues anonymously while maintaining accountability.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-1">Secure & Private</h4>
              <p className="text-slate-600">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-1">Fast Response</h4>
              <p className="text-slate-600">
                AI-powered prioritization ensures urgent issues get immediate attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
