import React, { useState, useEffect } from 'react';
import { FiSearch, FiMail, FiUser, FiMessageSquare, FiCalendar, FiEye, FiTrash2, FiDownload, FiFilter, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

function AdminContact() {
  // Mock contact submissions data
  const mockContactList = [
    { 
      _id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      message: 'I have a question about your premium services. Can you provide more details about the pricing structure?',
      createdAt: '2024-03-10T10:30:00Z',
      status: 'unread',
      phone: '+91 98765 43210',
      subject: 'Pricing Inquiry',
      category: 'Sales'
    },
    { 
      _id: 2, 
      name: 'Sarah Smith', 
      email: 'sarah@example.com',
      message: 'Great platform! I wanted to suggest adding dark mode option for better user experience.',
      createdAt: '2024-03-09T14:20:00Z',
      status: 'read',
      phone: '+91 98765 43211',
      subject: 'Feature Suggestion',
      category: 'Feedback'
    },
    { 
      _id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      message: 'I am facing issues with the withdrawal process. The transaction is pending for 2 days.',
      createdAt: '2024-03-08T09:15:00Z',
      status: 'unread',
      phone: '+91 98765 43212',
      subject: 'Technical Issue',
      category: 'Support'
    },
    { 
      _id: 4, 
      name: 'Emma Wilson', 
      email: 'emma@example.com',
      message: 'Looking for partnership opportunities. Please contact me at your earliest convenience.',
      createdAt: '2024-03-07T16:45:00Z',
      status: 'read',
      phone: '+91 98765 43213',
      subject: 'Partnership Inquiry',
      category: 'Business'
    },
    { 
      _id: 5, 
      name: 'Alex Brown', 
      email: 'alex@example.com',
      message: 'Can you explain the verification process? How long does it usually take?',
      createdAt: '2024-03-06T11:20:00Z',
      status: 'replied',
      phone: '+91 98765 43214',
      subject: 'Verification Process',
      category: 'Support'
    },
    { 
      _id: 6, 
      name: 'Lisa Taylor', 
      email: 'lisa@example.com',
      message: 'I want to update my account information but cant find the option in settings.',
      createdAt: '2024-03-05T13:10:00Z',
      status: 'unread',
      phone: '+91 98765 43215',
      subject: 'Account Update',
      category: 'Support'
    },
    { 
      _id: 7, 
      name: 'David Lee', 
      email: 'david@example.com',
      message: 'Your platform has been very helpful for my business. Thank you for the excellent service!',
      createdAt: '2024-03-04T15:30:00Z',
      status: 'archived',
      phone: '+91 98765 43216',
      subject: 'Feedback',
      category: 'Feedback'
    },
    { 
      _id: 8, 
      name: 'Rachel Green', 
      email: 'rachel@example.com',
      message: 'Need help with two-factor authentication setup. The SMS verification is not working.',
      createdAt: '2024-03-03T12:40:00Z',
      status: 'replied',
      phone: '+91 98765 43217',
      subject: 'Security Issue',
      category: 'Security'
    },
    { 
      _id: 9, 
      name: 'Tom Wilson', 
      email: 'tom@example.com',
      message: 'Interested in your enterprise plan. Please send me the detailed pricing information.',
      createdAt: '2024-03-02T09:20:00Z',
      status: 'unread',
      phone: '+91 98765 43218',
      subject: 'Enterprise Inquiry',
      category: 'Sales'
    },
    { 
      _id: 10, 
      name: 'Maria Garcia', 
      email: 'maria@example.com',
      message: 'I found a bug in the mobile app. The login screen crashes on iOS devices.',
      createdAt: '2024-03-01T14:30:00Z',
      status: 'read',
      phone: '+91 98765 43219',
      subject: 'Bug Report',
      category: 'Technical'
    },
  ];

  const [contactList, setContactList] = useState(mockContactList);
  const [filteredContacts, setFilteredContacts] = useState(mockContactList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Calculate stats
  const stats = {
    total: contactList.length,
    unread: contactList.filter(c => c.status === 'unread').length,
    read: contactList.filter(c => c.status === 'read').length,
    replied: contactList.filter(c => c.status === 'replied').length,
    archived: contactList.filter(c => c.status === 'archived').length,
  };

  // Get unique categories
  const categories = ['All', ...new Set(contactList.map(item => item.category))];

  // Fetch contacts (mock)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = contactList;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(contact =>
        contact.name?.toLowerCase().includes(lowerSearch) ||
        contact.email?.toLowerCase().includes(lowerSearch) ||
        contact.subject?.toLowerCase().includes(lowerSearch) ||
        contact.message?.toLowerCase().includes(lowerSearch) ||
        contact.phone?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterStatus !== 'All') {
      result = result.filter(contact => contact.status === filterStatus.toLowerCase());
    }

    // Apply category filter
    if (filterCategory !== 'All') {
      result = result.filter(contact => contact.category === filterCategory);
    }

    // Sort by date (newest first)
    result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredContacts(result);
  }, [searchTerm, filterStatus, filterCategory, contactList]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  // Handle view message
  const handleViewMessage = (contact) => {
    setSelectedMessage(contact);
    setShowMessageModal(true);
    // Mark as read if unread
    if (contact.status === 'unread') {
      setContactList(prev => prev.map(item => 
        item._id === contact._id ? { ...item, status: 'read' } : item
      ));
    }
  };

  // Handle delete message
  const handleDeleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setContactList(prev => prev.filter(item => item._id !== id));
      setFilteredContacts(prev => prev.filter(item => item._id !== id));
      setSelectedMessages(prev => prev.filter(msgId => msgId !== id));
      alert('Message deleted (mock)');
    }
  };

  // Handle select/deselect message
  const handleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(prev => prev.filter(msgId => msgId !== id));
    } else {
      setSelectedMessages(prev => [...prev, id]);
    }
  };

  // Handle select all messages
  const handleSelectAll = () => {
    if (selectedMessages.length === filteredContacts.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredContacts.map(item => item._id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedMessages.length === 0) {
      alert('Please select messages first');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.length} selected message(s)?`)) {
      setContactList(prev => prev.filter(item => !selectedMessages.includes(item._id)));
      setFilteredContacts(prev => prev.filter(item => !selectedMessages.includes(item._id)));
      setSelectedMessages([]);
      alert(`${selectedMessages.length} message(s) deleted (mock)`);
    }
  };

  // Handle mark as read
  const handleMarkAsRead = () => {
    if (selectedMessages.length === 0) {
      alert('Please select messages first');
      return;
    }
    
    setContactList(prev => prev.map(item => 
      selectedMessages.includes(item._id) ? { ...item, status: 'read' } : item
    ));
    setSelectedMessages([]);
    alert(`${selectedMessages.length} message(s) marked as read (mock)`);
  };

  // Handle mark as replied
  const handleMarkAsReplied = () => {
    if (selectedMessages.length === 0) {
      alert('Please select messages first');
      return;
    }
    
    setContactList(prev => prev.map(item => 
      selectedMessages.includes(item._id) ? { ...item, status: 'replied' } : item
    ));
    setSelectedMessages([]);
    alert(`${selectedMessages.length} message(s) marked as replied (mock)`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      unread: 'bg-red-100 text-red-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
    };

    const icons = {
      unread: <FiMail className="w-3 h-3 mr-1" />,
      read: <FiCheckCircle className="w-3 h-3 mr-1" />,
      replied: <FiMessageSquare className="w-3 h-3 mr-1" />,
      archived: <FiClock className="w-3 h-3 mr-1" />,
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors[status] || colors.unread}`}>
        {icons[status]}{statusText}
      </span>
    );
  };

  // Category badge component
  const CategoryBadge = ({ category }) => {
    const colors = {
      Support: 'bg-blue-100 text-blue-800',
      Sales: 'bg-green-100 text-green-800',
      Feedback: 'bg-yellow-100 text-yellow-800',
      Business: 'bg-purple-100 text-purple-800',
      Technical: 'bg-red-100 text-red-800',
      Security: 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[category] || 'bg-gray-100 text-gray-800'}`}>
        {category}
      </span>
    );
  };

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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-2">Manage and respond to user messages and inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unread</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.unread}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Replied</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.replied}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Archived</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stats.archived}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <FiClock className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Selected</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{selectedMessages.length}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiUser className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Bulk Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or message content..."
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter and Bulk Actions */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-500 w-5 h-5" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={handleStatusFilter}
                >
                  <option value="All">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterCategory}
                onChange={handleCategoryFilter}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedMessages.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleSelectAll}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  {selectedMessages.length === filteredContacts.length ? 'Deselect All' : 'Select All'}
                </button>
                <button
                  onClick={handleMarkAsRead}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  Mark as Read ({selectedMessages.length})
                </button>
                <button
                  onClick={handleMarkAsReplied}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  Mark as Replied ({selectedMessages.length})
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete ({selectedMessages.length})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages Grid (Card System) */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <FiMail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredContacts.map(contact => (
              <div 
                key={contact._id} 
                className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                  contact.status === 'unread' ? 'border-l-4 border-l-red-500' : 
                  contact.status === 'replied' ? 'border-l-4 border-l-green-500' : 
                  'border-gray-200'
                }`}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(contact._id)}
                          onChange={() => handleSelectMessage(contact._id)}
                          className="rounded border-gray-300"
                        />
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                          <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <StatusBadge status={contact.status} />
                      <span className="text-xs text-gray-400 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Subject and Category */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{contact.subject}</h4>
                    <CategoryBadge category={contact.category} />
                  </div>

                  {/* Message Preview */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {contact.message}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      <FiUser className="w-3 h-3" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      <span>
                        {new Date(contact.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewMessage(contact)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      <FiEye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(contact._id)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setContactList(prev => prev.map(item => 
                          item._id === contact._id ? { ...item, status: 'replied' } : item
                        ));
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs font-medium"
                    >
                      <FiMessageSquare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message View Modal */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusBadge status={selectedMessage.status} />
                      <span className="text-sm text-gray-500">
                        {new Date(selectedMessage.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Sender Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-medium text-gray-900">{selectedMessage.name}</div>
                      <div className="text-gray-600">{selectedMessage.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Contact</div>
                      <div className="font-medium text-gray-900">{selectedMessage.phone}</div>
                      <div className="text-gray-600">Submitted: {new Date(selectedMessage.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">Message</div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Reply Section */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Reply</div>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Type your response here..."
                  ></textarea>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => setShowMessageModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Send Reply
                    </button>
                    <button 
                      onClick={() => {
                        setContactList(prev => prev.map(item => 
                          item._id === selectedMessage._id ? { ...item, status: 'replied' } : item
                        ));
                        setShowMessageModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      Mark as Replied
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminContact;