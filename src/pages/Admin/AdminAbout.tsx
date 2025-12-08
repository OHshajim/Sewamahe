import React, { useState, useEffect } from 'react';
import { FiSave, FiEye, FiEdit2, FiAlertCircle } from 'react-icons/fi';

function AdminAbout() {
  // Mock about content
  const mockAboutContent = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Welcome to Our Platform</h1>
<p class="text-gray-700 mb-4">We are a leading platform dedicated to providing exceptional services and solutions to our users worldwide.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Mission</h2>
<p class="text-gray-700 mb-4">To create innovative solutions that empower businesses and individuals to achieve their goals efficiently and effectively.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Values</h2>
<ul class="list-disc pl-5 text-gray-700 mb-4">
  <li class="mb-2">Integrity in all our dealings</li>
  <li class="mb-2">Innovation in our solutions</li>
  <li class="mb-2">Excellence in our services</li>
  <li class="mb-2">Customer-centric approach</li>
  <li>Continuous improvement</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Team</h2>
<p class="text-gray-700 mb-4">We have a dedicated team of professionals with expertise in various domains, working together to deliver outstanding results.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
  <div class="flex">
    <FiAlertCircle class="text-blue-500 text-xl mr-3" />
    <div>
      <p class="text-blue-700 font-medium">Notice</p>
      <p class="text-blue-600">We are continuously working to improve our services and add new features based on user feedback.</p>
    </div>
  </div>
</div>`;

  const [aboutInfo, setAboutInfo] = useState(mockAboutContent);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [showTips, setShowTips] = useState(false);

  // Calculate character count
  useEffect(() => {
    const textOnly = aboutInfo.replace(/<[^>]*>/g, '');
    setCharacterCount(textOnly.length);
  }, [aboutInfo]);

  // Handle update (mock)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = formData.get('about') as string;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAboutInfo(updatedContent);
      setLoading(false);
      alert('About page content updated successfully! (mock update)');
    }, 1000);
  };

  // Handle reset to default
  const handleReset = () => {
    if (window.confirm('Reset to default content?')) {
      setAboutInfo(mockAboutContent);
      alert('Content reset to default (mock)');
    }
  };

  // Handle preview toggle
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // HTML tips for users
  const htmlTips = [
    'Use <h1> to <h6> for headings',
    'Use <p> for paragraphs',
    'Use <ul> and <li> for lists',
    'Use <strong> for bold text',
    'Use <em> for italic text',
    'Use <a href="#"> for links',
    'Use class for Tailwind CSS classes',
  ];

  return (
    <div 
      className="h-full overflow-y-auto bg-gray-50"
      style={{ 
        maxHeight: 'calc(100vh - 64px)',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">About Page Editor</h1>
          <p className="text-gray-600 mt-2">Edit and preview the content of your About page</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Characters</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{characterCount}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiEdit2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">HTML Tags</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {(aboutInfo.match(/<[^>]+>/g) || []).length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiSave className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lines</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {aboutInfo.split('\n').length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiEye className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 capitalize">
                  {previewMode ? 'Preview' : 'Edit'}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Editor/Preview Toggle */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
              <p className="text-gray-500 text-sm">Edit HTML content and preview how it will appear</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={togglePreview}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  previewMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiEye className="inline-block w-4 h-4 mr-2" />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                HTML Tips
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* HTML Tips Panel */}
        {showTips && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-start">
              <FiAlertCircle className="text-yellow-600 w-5 h-5 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">HTML Editing Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {htmlTips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-yellow-100">
                      <code className="text-sm font-mono text-gray-800">{tip}</code>
                    </div>
                  ))}
                </div>
                <p className="text-yellow-700 text-sm mt-4">
                  Note: You can use Tailwind CSS classes for styling (e.g., class="text-blue-600 font-bold")
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                    HTML Content for About Page
                  </label>
                  <textarea
                    name="about"
                    value={aboutInfo}
                    onChange={(e) => setAboutInfo(e.target.value)}
                    className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="<h1>Welcome</h1><p>Write something here...</p>"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Characters: {characterCount} | Lines: {aboutInfo.split('\n').length}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Update Content
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEye className="w-5 h-5 mr-2 text-green-600" />
                Live Preview
              </h3>
              <div className="border border-gray-200 rounded-lg p-6 min-h-96 overflow-auto">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: aboutInfo }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                This is how your content will appear on the About page
              </div>
            </div>
          )}

          {/* Preview Panel (always visible) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2 text-purple-600" />
              Preview Information
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Content Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Headings (h1-h6)</span>
                    <span className="font-medium text-gray-900">
                      {(aboutInfo.match(/<h[1-6][^>]*>/gi) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paragraphs</span>
                    <span className="font-medium text-gray-900">
                      {(aboutInfo.match(/<p[^>]*>/gi) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lists</span>
                    <span className="font-medium text-gray-900">
                      {(aboutInfo.match(/<(ul|ol)[^>]*>/gi) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Links</span>
                    <span className="font-medium text-gray-900">
                      {(aboutInfo.match(/<a[^>]*>/gi) || []).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAboutInfo(prev => prev + '\n<p>New paragraph added.</p>')}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium"
                  >
                    Add Paragraph
                  </button>
                  <button
                    onClick={() => setAboutInfo(prev => prev + '\n<h2>New Section</h2>')}
                    className="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium"
                  >
                    Add Heading
                  </button>
                  <button
                    onClick={() => setAboutInfo(prev => prev + '\n<ul>\n  <li>List item</li>\n</ul>')}
                    className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium"
                  >
                    Add List
                  </button>
                  <button
                    onClick={() => setAboutInfo(prev => prev.replace(/<[^>]*>/g, ''))}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium"
                  >
                    Strip HTML
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Content Guidelines</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2"></div>
                    Keep content clear and concise
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2"></div>
                    Use proper HTML structure
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2"></div>
                    Test preview before saving
                  </li>
                  <li className="flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2"></div>
                    Avoid excessive formatting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Changes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Recent Changes
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Initial content loaded</div>
                <div className="text-sm text-gray-500">Just now</div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Auto-saved
              </span>
            </div>
            <div className="text-center text-gray-500 text-sm py-4">
              No previous changes recorded (mock data)
            </div>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminAbout;