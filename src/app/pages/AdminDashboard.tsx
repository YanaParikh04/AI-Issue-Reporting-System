import { useState } from "react";
import { Search, Filter, Clock, CheckCircle2, AlertCircle, Eye } from "lucide-react";

type IssueStatus = "Pending" | "In Progress" | "Resolved";
type Priority = "Low" | "Medium" | "High";

interface Issue {
  id: string;
  userId: string;
  category: string;
  priority: Priority;
  status: IssueStatus;
  submittedDate: string;
  description: string;
}

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Mock data
  const allIssues: Issue[] = [
    {
      id: "ISS-12345678-ABCD",
      userId: "STU2024001",
      category: "Technical",
      priority: "High",
      status: "In Progress",
      submittedDate: "2026-04-01",
      description: "Projector not working in Room 301",
    },
    {
      id: "ISS-87654321-WXYZ",
      userId: "STU2024002",
      category: "Academic",
      priority: "Medium",
      status: "Resolved",
      submittedDate: "2026-03-28",
      description: "Course material access issue",
    },
    {
      id: "ISS-11223344-EFGH",
      userId: "Anonymous",
      category: "Behavioral",
      priority: "High",
      status: "Pending",
      submittedDate: "2026-04-03",
      description: "Inappropriate behavior in library",
    },
    {
      id: "ISS-99887766-IJKL",
      userId: "STU2024003",
      category: "Facility",
      priority: "Low",
      status: "In Progress",
      submittedDate: "2026-04-02",
      description: "AC not working in cafeteria",
    },
    {
      id: "ISS-55443322-MNOP",
      userId: "STU2024004",
      category: "Technical",
      priority: "Medium",
      status: "Resolved",
      submittedDate: "2026-03-30",
      description: "WiFi connectivity issues in Block B",
    },
  ];

  const filteredIssues = allIssues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || issue.status === filterStatus;
    const matchesCategory = filterCategory === "All" || issue.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: IssueStatus) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "In Progress":
        return <AlertCircle className="w-4 h-4" />;
      case "Resolved":
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const stats = {
    total: allIssues.length,
    pending: allIssues.filter((i) => i.status === "Pending").length,
    inProgress: allIssues.filter((i) => i.status === "In Progress").length,
    resolved: allIssues.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Admin Dashboard
        </h1>
        <p className="text-slate-600">
          Monitor and manage all reported issues from a centralized dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600">Total Issues</p>
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-slate-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600">Pending</p>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600">In Progress</p>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-blue-700">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600">Resolved</p>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-green-700">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="flex items-center gap-2 mb-2 text-slate-700">
              <Search className="w-4 h-4 text-blue-600" />
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, User ID, or description..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="filterStatus" className="flex items-center gap-2 mb-2 text-slate-700">
              <Filter className="w-4 h-4 text-blue-600" />
              Status
            </label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterCategory" className="flex items-center gap-2 mb-2 text-slate-700">
              <Filter className="w-4 h-4 text-blue-600" />
              Category
            </label>
            <select
              id="filterCategory"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Facility">Facility</option>
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">Issue ID</th>
                <th className="px-6 py-4 text-left text-slate-700">User ID</th>
                <th className="px-6 py-4 text-left text-slate-700">Category</th>
                <th className="px-6 py-4 text-left text-slate-700">Priority</th>
                <th className="px-6 py-4 text-left text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <code className="text-sm font-mono text-slate-700">{issue.id}</code>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{issue.userId}</td>
                  <td className="px-6 py-4 text-slate-700">{issue.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-sm ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm ${getStatusColor(issue.status)}`}>
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {new Date(issue.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No issues found matching your filters</p>
          </div>
        )}
      </div>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedIssue(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl text-slate-900 mb-2">Issue Details</h2>
                  <code className="text-sm text-slate-600 font-mono">{selectedIssue.id}</code>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">User ID</p>
                  <p className="text-slate-900">{selectedIssue.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Category</p>
                  <p className="text-slate-900">{selectedIssue.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Priority</p>
                  <span className={`inline-block px-3 py-1 rounded-lg border text-sm ${getPriorityColor(selectedIssue.priority)}`}>
                    {selectedIssue.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm ${getStatusColor(selectedIssue.status)}`}>
                    {getStatusIcon(selectedIssue.status)}
                    {selectedIssue.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Submitted Date</p>
                  <p className="text-slate-900">{new Date(selectedIssue.submittedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Description</p>
                <p className="text-slate-900 bg-slate-50 p-4 rounded-lg">{selectedIssue.description}</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Status
                </button>
                <button className="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Assign to Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
