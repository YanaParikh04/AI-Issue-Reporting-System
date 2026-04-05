import { useState } from "react";
import { useNavigate } from "react-router";
import { User, IdCard, Tag, FileText, Upload, CheckSquare } from "lucide-react";

export function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    category: "",
    description: "",
    anonymous: false,
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in sessionStorage for the success page
    sessionStorage.setItem("lastSubmission", JSON.stringify(formData));
    navigate("/success");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Report an Issue
        </h1>
        <p className="text-slate-600">
          Fill out the form below to submit your issue. Our AI system will analyze and prioritize it.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="flex items-center gap-2 mb-2 text-slate-700">
              <User className="w-5 h-5 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              disabled={formData.anonymous}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your full name"
            />
          </div>

          {/* User ID / Enrollment Number */}
          <div>
            <label htmlFor="userId" className="flex items-center gap-2 mb-2 text-slate-700">
              <IdCard className="w-5 h-5 text-blue-600" />
              User ID / Enrollment Number
            </label>
            <input
              type="text"
              id="userId"
              required
              disabled={formData.anonymous}
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your ID or enrollment number"
            />
          </div>

          {/* Issue Category */}
          <div>
            <label htmlFor="category" className="flex items-center gap-2 mb-2 text-slate-700">
              <Tag className="w-5 h-5 text-blue-600" />
              Issue Category
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              <option value="Academic">Academic</option>
              <option value="Facility">Facility</option>
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
            </select>
          </div>

          {/* Issue Description */}
          <div>
            <label htmlFor="description" className="flex items-center gap-2 mb-2 text-slate-700">
              <FileText className="w-5 h-5 text-blue-600" />
              Issue Description
            </label>
            <textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your issue in detail..."
            />
          </div>

          {/* Upload Supporting Image */}
          <div>
            <label htmlFor="fileUpload" className="flex items-center gap-2 mb-2 text-slate-700">
              <Upload className="w-5 h-5 text-blue-600" />
              Upload Supporting Image (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Upload className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600">
                  {fileName || "Choose a file"}
                </span>
              </label>
            </div>
            {fileName && (
              <p className="mt-2 text-sm text-green-600">
                ✓ {fileName} selected
              </p>
            )}
          </div>

          {/* Report Anonymously */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => {
                const anonymous = e.target.checked;
                setFormData({
                  ...formData,
                  anonymous,
                  fullName: anonymous ? "" : formData.fullName,
                  userId: anonymous ? "" : formData.userId,
                });
              }}
              className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer text-slate-700">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                Report Anonymously
              </label>
              <p className="text-sm text-slate-500 mt-1">
                Your identity will be kept confidential. Name and ID fields will be disabled.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            Submit Issue Report
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All submissions are reviewed by our AI system for automatic categorization
          and priority assignment. You'll receive a tracking ID to monitor your issue's progress.
        </p>
      </div>
    </div>
  );
}
