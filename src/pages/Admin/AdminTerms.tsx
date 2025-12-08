import React, { useState, useEffect } from "react";
import {
  FiSave,
  FiEye,
  FiEdit2,
  FiAlertCircle,
  FiFileText,
  FiCheckSquare,
  FiList,
  FiCode,
} from "react-icons/fi";

function AdminTerms() {
  // Mock terms content
  const mockTermsContent = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
<p class="text-gray-700 mb-4">Last updated: March 10, 2024</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
  <div class="flex">
    <FiAlertCircle class="text-blue-500 text-xl mr-3" />
    <div>
      <p class="text-blue-700 font-medium">Important Notice</p>
      <p class="text-blue-600">Please read these terms and conditions carefully before using our service.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">1. Acceptance of Terms</h2>
<p class="text-gray-700 mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">2. User Responsibilities</h2>
<ul class="list-disc pl-5 text-gray-700 mb-4">
  <li class="mb-2">You must be at least 18 years old to use this service</li>
  <li class="mb-2">You are responsible for maintaining the confidentiality of your account</li>
  <li class="mb-2">You agree not to use the service for any illegal purposes</li>
  <li class="mb-2">You will not share your login credentials with others</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">3. Service Usage</h2>
<p class="text-gray-700 mb-4">Our services are provided "as is" and we make no warranties of any kind, either expressed or implied.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">4. Limitation of Liability</h2>
<p class="text-gray-700 mb-4">We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">5. Modifications to Terms</h2>
<p class="text-gray-700 mb-4">We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">6. Contact Information</h2>
<p class="text-gray-700 mb-4">If you have any questions about these Terms, please contact us at <strong>support@example.com</strong>.</p>

<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
  <p class="text-gray-600 text-sm"><strong>Note:</strong> These terms constitute the entire agreement between you and our company regarding the use of our services.</p>
</div>`;

  const [termsInfo, setTermsInfo] = useState(mockTermsContent);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [showLegalTips, setShowLegalTips] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("2024-03-10");

  // Calculate character count
  useEffect(() => {
    const textOnly = termsInfo.replace(/<[^>]*>/g, "");
    setCharacterCount(textOnly.length);
  }, [termsInfo]);

  // Handle update (mock)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = formData.get("terms") as string;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTermsInfo(updatedContent);
      setLastUpdated(new Date().toISOString().split("T")[0]);
      setLoading(false);
      alert("Terms & Conditions updated successfully! (mock update)");
    }, 1000);
  };

  // Handle reset to default
  const handleReset = () => {
    if (window.confirm("Reset to default terms and conditions?")) {
      setTermsInfo(mockTermsContent);
      setLastUpdated("2024-03-10");
      alert("Content reset to default (mock)");
    }
  };

  // Handle preview toggle
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Update date in content
  const updateDateInContent = () => {
    const newDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const updatedContent = termsInfo.replace(
      /Last updated:.*<\/p>/,
      `Last updated: ${newDate}</p>`
    );
    setTermsInfo(updatedContent);
    setLastUpdated(new Date().toISOString().split("T")[0]);
    alert("Date updated in content");
  };

  // Legal tips for users
  const legalTips = [
    "Include clear acceptance statements",
    "Define user responsibilities clearly",
    "Specify age restrictions",
    "Include limitation of liability",
    "Add modification terms",
    "Provide contact information",
    "Include privacy policy reference",
  ];

  // Quick sections to add
  const quickSections = [
    {
      title: "Acceptance Clause",
      content:
        "<h2>1. Acceptance of Terms</h2>\n<p>By accessing and using this website...</p>",
    },
    {
      title: "User Responsibilities",
      content:
        "<h2>2. User Responsibilities</h2>\n<ul>\n  <li>Responsibility 1</li>\n  <li>Responsibility 2</li>\n</ul>",
    },
    {
      title: "Privacy Policy",
      content:
        "<h2>Privacy Policy</h2>\n<p>Refer to our separate privacy policy document...</p>",
    },
    {
      title: "Contact Info",
      content:
        "<h2>Contact Information</h2>\n<p>For questions, contact: <strong>email@example.com</strong></p>",
    },
  ];

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)",
        scrollBehavior: "smooth",
      }}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Terms & Conditions Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Edit and manage your website terms and conditions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Characters</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {characterCount}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiFileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {new Date(lastUpdated).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiCheckSquare className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sections</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {(termsInfo.match(/<h[1-6][^>]*>/gi) || []).length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiList className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 capitalize">
                  {previewMode ? "Preview" : "Edit"}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiCode className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Editor/Preview Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Terms & Conditions Editor
              </h2>
              <p className="text-gray-500 text-sm">
                Edit HTML content and preview how it will appear on your website
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={togglePreview}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  previewMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}>
                <FiEye className="inline-block w-4 h-4 mr-2" />
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </button>
              <button
                type="button"
                onClick={() => setShowLegalTips(!showLegalTips)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Legal Tips
              </button>
              <button
                type="button"
                onClick={updateDateInContent}
                className="px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 font-medium">
                Update Date
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Legal Tips Panel */}
        {showLegalTips && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-start">
              <FiAlertCircle className="text-yellow-600 w-5 h-5 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  Legal Writing Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {legalTips.map((tip, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border border-yellow-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-800">{tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-yellow-700 text-sm mt-4">
                  <strong>Note:</strong> Consult with a legal professional to
                  ensure your terms and conditions comply with applicable laws.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="mb-8">
          {/* Editor Panel */}
          {!previewMode ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEdit2 className="w-5 h-5 mr-2 text-blue-600" />
                HTML Editor
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions Content
                  </label>
                  <textarea
                    name="terms"
                    value={termsInfo}
                    onChange={(e) => setTermsInfo(e.target.value)}
                    className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="<h1>Terms and Conditions</h1><p>Your content here...</p>"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Characters: {characterCount} | Sections:{" "}
                    {(termsInfo.match(/<h[1-6][^>]*>/gi) || []).length}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Update Terms
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEye className="w-5 h-5 mr-2 text-green-600" />
                Live Preview
              </h3>
              <div className="border border-gray-200 rounded-lg p-6 min-h-96 overflow-auto">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: termsInfo }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                This is how your terms and conditions will appear on the website
              </div>
            </div>
          )}
        </div>

        {/* Version History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Version History
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  Initial terms created
                </div>
                <div className="text-sm text-gray-500">
                  March 10, 2024 - 10:30 AM
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Current
              </span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">
                  Privacy policy added
                </div>
                <div className="text-sm text-gray-500">
                  February 15, 2024 - 2:15 PM
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                Archived
              </span>
            </div>
            <div className="text-center text-gray-500 text-sm py-4">
              Showing 2 of 2 versions (mock data)
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mt-6">
          <div className="flex items-start">
            <FiAlertCircle className="text-blue-500 w-5 h-5 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Legal Disclaimer
              </h4>
              <p className="text-blue-700 text-sm">
                This terms and conditions editor is for content management only.
                We recommend consulting with a legal professional to ensure your
                terms comply with all applicable laws and regulations. The
                company is not liable for any legal issues arising from the use
                of generated terms and conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminTerms;
