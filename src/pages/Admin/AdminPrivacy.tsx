import React, { useState, useEffect } from 'react';
import { FiSave, FiEye, FiEdit2, FiAlertCircle, FiShield, FiLock, FiUserCheck, FiDatabase, FiList, FiCode, FiCheckCircle, FiFileText } from 'react-icons/fi';

function AdminPrivacy() {
  // Mock privacy policy content
  const mockPrivacyContent = `<h1 class="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
<p class="text-gray-700 mb-4">Effective Date: March 10, 2024</p>

<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
  <div class="flex">
    <FiShield class="text-green-500 text-xl mr-3" />
    <div>
      <p class="text-green-700 font-medium">Your Privacy Matters</p>
      <p class="text-green-600">We are committed to protecting your personal information and your right to privacy.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">1. Information We Collect</h2>
<p class="text-gray-700 mb-4">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services.</p>

<ul class="list-disc pl-5 text-gray-700 mb-4">
  <li class="mb-2"><strong>Personal Information:</strong> Name, email address, phone number</li>
  <li class="mb-2"><strong>Account Information:</strong> Username, password, profile information</li>
  <li class="mb-2"><strong>Technical Data:</strong> IP address, browser type, device information</li>
  <li class="mb-2"><strong>Usage Data:</strong> How you use our website and services</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">2. How We Use Your Information</h2>
<p class="text-gray-700 mb-4">We use personal information collected via our website for a variety of business purposes described below:</p>

<ul class="list-disc pl-5 text-gray-700 mb-4">
  <li class="mb-2">To provide and maintain our service</li>
  <li class="mb-2">To manage your account and registration</li>
  <li class="mb-2">To contact you with updates and security alerts</li>
  <li class="mb-2">For business transfers and legal compliance</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">3. Data Security</h2>
<p class="text-gray-700 mb-4">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.</p>

<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
  <div class="flex items-center">
    <FiLock class="text-blue-500 text-xl mr-3" />
    <div>
      <p class="text-blue-700 font-medium">Security Measures Include:</p>
      <p class="text-blue-600 text-sm">Encryption, access controls, regular security assessments, and staff training.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">4. Your Privacy Rights</h2>
<p class="text-gray-700 mb-4">Depending on your location, you may have certain rights regarding your personal information:</p>

<ul class="list-disc pl-5 text-gray-700 mb-4">
  <li class="mb-2">Right to access your personal information</li>
  <li class="mb-2">Right to correct inaccurate information</li>
  <li class="mb-2">Right to request deletion of your data</li>
  <li class="mb-2">Right to restrict processing of your data</li>
  <li>Right to data portability</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">5. Cookies and Tracking Technologies</h2>
<p class="text-gray-700 mb-4">We use cookies and similar tracking technologies to track activity on our website and store certain information.</p>

<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">6. Contact Us</h2>
<p class="text-gray-700 mb-4">If you have questions or comments about this policy, you may contact our Data Protection Officer at <strong>privacy@example.com</strong>.</p>

<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
  <p class="text-gray-600 text-sm"><strong>Note:</strong> This privacy policy may change from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
</div>`;

  const [privacyInfo, setPrivacyInfo] = useState(mockPrivacyContent);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [showPrivacyTips, setShowPrivacyTips] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState('2024-03-10');
  const [dataTypes, setDataTypes] = useState([]);

  // Calculate character count and extract data types
  useEffect(() => {
    const textOnly = privacyInfo.replace(/<[^>]*>/g, '');
    setCharacterCount(textOnly.length);
    
    // Extract mentioned data types
    const types = [];
    if (privacyInfo.includes('email')) types.push('Email');
    if (privacyInfo.includes('phone')) types.push('Phone');
    if (privacyInfo.includes('IP')) types.push('IP Address');
    if (privacyInfo.includes('cookies')) types.push('Cookies');
    if (privacyInfo.includes('device')) types.push('Device Info');
    setDataTypes(types);
  }, [privacyInfo]);

  // Handle update (mock)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = formData.get('privacy') as string;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrivacyInfo(updatedContent);
      setEffectiveDate(new Date().toISOString().split('T')[0]);
      setLoading(false);
      alert('Privacy Policy updated successfully! (mock update)');
    }, 1000);
  };

  // Handle reset to default
  const handleReset = () => {
    if (window.confirm('Reset to default privacy policy?')) {
      setPrivacyInfo(mockPrivacyContent);
      setEffectiveDate('2024-03-10');
      alert('Content reset to default (mock)');
    }
  };

  // Handle preview toggle
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Update date in content
  const updateDateInContent = () => {
    const newDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const updatedContent = privacyInfo.replace(/Effective Date:.*<\/p>/, `Effective Date: ${newDate}</p>`);
    setPrivacyInfo(updatedContent);
    setEffectiveDate(new Date().toISOString().split('T')[0]);
    alert('Effective date updated in content');
  };

  // Privacy tips for users
  const privacyTips = [
    'Clearly state what data you collect',
    'Explain how data is used',
    'Describe data security measures',
    'List user privacy rights',
    'Include cookie policy',
    'Provide contact information',
    'Mention data retention periods',
    'Explain third-party sharing',
  ];

  // Quick privacy sections to add
  const quickSections = [
    { 
      title: 'Data Collection', 
      icon: FiDatabase,
      content: '<h2>1. Information We Collect</h2>\n<p>We collect the following types of information...</p>'
    },
    { 
      title: 'Data Usage', 
      icon: FiUserCheck,
      content: '<h2>2. How We Use Your Information</h2>\n<p>Your information is used for the following purposes...</p>'
    },
    { 
      title: 'Data Security', 
      icon: FiShield,
      content: '<h2>3. Data Security</h2>\n<p>We implement the following security measures...</p>'
    },
    { 
      title: 'User Rights', 
      icon: FiLock,
      content: '<h2>4. Your Privacy Rights</h2>\n<p>You have the following rights regarding your data...</p>'
    },
    { 
      title: 'Cookies Policy', 
      icon: FiAlertCircle,
      content: '<h2>5. Cookies and Tracking</h2>\n<p>We use cookies for the following purposes...</p>'
    },
    { 
      title: 'Contact DPO', 
      icon: FiAlertCircle,
      content: '<h2>6. Contact Information</h2>\n<p>For privacy concerns, contact our DPO at: <strong>privacy@example.com</strong></p>'
    },
  ];

  // GDPR/Privacy regulations
  const privacyRegulations = [
    { name: 'GDPR', region: 'EU/EEA', color: 'bg-blue-100 text-blue-800' },
    { name: 'CCPA', region: 'California', color: 'bg-green-100 text-green-800' },
    { name: 'LGPD', region: 'Brazil', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'PIPEDA', region: 'Canada', color: 'bg-purple-100 text-purple-800' },
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy Editor</h1>
          <p className="text-gray-600 mt-2">Edit and manage your website privacy policy</p>
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
                <FiFileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Effective Date</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {new Date(effectiveDate).toLocaleDateString('en-US', { 
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiShield className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Data Types</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{dataTypes.length}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiDatabase className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
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
                <FiCode className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Editor/Preview Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Privacy Policy Editor</h2>
              <p className="text-gray-500 text-sm">Edit HTML content and preview how it will appear on your website</p>
            </div>
            <div className="flex flex-wrap gap-3">
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
                onClick={() => setShowPrivacyTips(!showPrivacyTips)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Privacy Tips
              </button>
              <button
                type="button"
                onClick={updateDateInContent}
                className="px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 font-medium"
              >
                Update Date
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

        {/* Privacy Tips Panel */}
        {showPrivacyTips && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-start">
              <FiShield className="text-green-600 w-5 h-5 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Privacy Policy Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {privacyTips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-green-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-800">{tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-green-800 mb-2">Applicable Regulations</h4>
                  <div className="flex flex-wrap gap-2">
                    {privacyRegulations.map((regulation) => (
                      <span key={regulation.name} className={`px-3 py-1 rounded-full text-xs font-medium ${regulation.color}`}>
                        {regulation.name} ({regulation.region})
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-green-700 text-sm mt-4">
                  <strong>Note:</strong> Consult with a legal professional to ensure your privacy policy complies with applicable regulations in your operating regions.
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
                    Privacy Policy Content
                  </label>
                  <textarea
                    name="privacy"
                    value={privacyInfo}
                    onChange={(e) => setPrivacyInfo(e.target.value)}
                    className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="<h1>Privacy Policy</h1><p>Your content here...</p>"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Characters: {characterCount} | Data Types: {dataTypes.length}
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
                        Update Policy
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
                  dangerouslySetInnerHTML={{ __html: privacyInfo }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                This is how your privacy policy will appear on the website
              </div>
            </div>
          )}
        </div>

        {/* Data Collection Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Data Collection Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <FiDatabase className="w-4 h-4 text-blue-500 mr-2" />
                Data Types Collected
              </h4>
              <div className="flex flex-wrap gap-1 mt-2">
                {dataTypes.length > 0 ? (
                  dataTypes.map((type, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No data types specified yet</span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <FiShield className="w-4 h-4 text-green-500 mr-2" />
                Security Measures
              </h4>
              <div className="text-sm text-gray-600 mt-2">
                {(privacyInfo.match(/security|encrypt|protect|secure/gi) || []).length} security measures mentioned
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <FiUserCheck className="w-4 h-4 text-purple-500 mr-2" />
                User Rights
              </h4>
              <div className="text-sm text-gray-600 mt-2">
                {(privacyInfo.match(/right to|access|delete|correct/gi) || []).length} user rights specified
              </div>
            </div>
          </div>
        </div>

        {/* Legal Compliance Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mt-6">
          <div className="flex items-start">
            <FiAlertCircle className="text-blue-500 w-5 h-5 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Legal Compliance Notice</h4>
              <p className="text-blue-700 text-sm">
                This privacy policy editor helps you create and manage your policy content. However, privacy laws vary 
                by jurisdiction (GDPR, CCPA, LGPD, etc.). It is your responsibility to ensure your privacy policy 
                complies with all applicable laws in your operating regions. We recommend consulting with a qualified 
                legal professional for compliance verification.
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

export default AdminPrivacy;