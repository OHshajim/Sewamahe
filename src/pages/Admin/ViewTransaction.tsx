import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiDollarSign,
  FiPercent,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiClock,
  FiInfo,
  FiDownload,
  FiMail,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ViewAdminTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock transaction data
  const mockTransaction = {
    _id: id || "txn_5f8d04d7e4b0c",
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      userId: "USR001",
    },
    withdrawal: {
      amount: 1500.0,
      paymentMethod: "Bank Transfer",
      account:
        "State Bank of India\nAccount Number: 1234567890\nIFSC Code: SBIN0001234\nAccount Holder: John Doe",
      status: "completed",
      createdAt: "2024-03-10T10:30:00Z",
      completedAt: "2024-03-10T14:30:00Z",
      transactionId: "TXN" + (id ? id.slice(-8) : "12345678"),
      referenceId: "REF" + Date.now().toString().slice(-8),
      remarks: "Monthly withdrawal request - Salary transfer",
      adminNotes: "Processed successfully via NEFT",
    },
    adminCharge: 2.5, // percentage
    fees: {
      platform: 2.5,
      processing: 0.5,
      total: 3.0,
    },
  };

  const [transaction, setTransaction] = useState(mockTransaction);
  const [loading, setLoading] = useState(false);
  const [userReceives, setUserReceives] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);

  // Calculate amounts
  useEffect(() => {
    if (transaction?.withdrawal?.amount) {
      const chargeAmount =
        (transaction.withdrawal.amount * transaction.fees.total) / 100;
      const mainReturn = transaction.withdrawal.amount - chargeAmount;
      setUserReceives(mainReturn);
      setTotalCharges(chargeAmount);
    }
  }, [transaction]);

  // Fetch transaction (mock)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Handle download receipt (mock)
  const handleDownloadReceipt = () => {
    alert("Receipt downloaded (mock)");
  };

  // Handle send email (mock)
  const handleSendEmail = () => {
    alert(`Email sent to ${transaction.user.email} (mock)`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const icons = {
      completed: <FiCheckCircle className="w-4 h-4 mr-2" />,
      pending: <FiClock className="w-4 h-4 mr-2" />,
      processing: <FiInfo className="w-4 h-4 mr-2" />,
      failed: <FiXCircle className="w-4 h-4 mr-2" />,
      cancelled: <FiXCircle className="w-4 h-4 mr-2" />,
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <div className="inline-flex items-center">
        <span
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
            colors[status] || colors.pending
          }`}>
          {icons[status]}
          {statusText}
        </span>
      </div>
    );
  };

  // Info card component
  const InfoCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
        <div className="flex items-center mb-3">
          <div
            className={`w-10 h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center mr-3`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Detail row component
  const DetailRow = ({ label, value, icon: Icon, className = "" }) => (
    <div
      className={`flex justify-between items-center py-3 border-b border-gray-100 ${className}`}>
      <div className="flex items-center">
        {Icon && <Icon className="w-4 h-4 text-gray-400 mr-2" />}
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)",
        scrollBehavior: "smooth",
      }}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mr-4">
          <FiArrowLeft className="w-5 h-5" />
          <span className="hidden md:inline">Back to Transactions</span>
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Transaction Details
              </h1>
              <p className="text-gray-600 mt-2">
                Complete details of transaction #
                {transaction.withdrawal.transactionId}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadReceipt}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">
              <FiDownload className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={handleSendEmail}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <FiMail className="w-4 h-4" />
              Send Email
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Transaction ID and Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="text-lg font-bold text-gray-900 font-mono mt-1">
                  {transaction.withdrawal.transactionId}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Reference: {transaction.withdrawal.referenceId}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">Status</div>
                <StatusBadge status={transaction.withdrawal.status} />
                <div className="text-xs text-gray-500 mt-2">
                  Updated:{" "}
                  {new Date(
                    transaction.withdrawal.completedAt ||
                      transaction.withdrawal.createdAt
                  ).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <InfoCard
                icon={FiDollarSign}
                title="Requested Amount"
                value={`₹${transaction.withdrawal.amount.toLocaleString(
                  "en-IN",
                  { minimumFractionDigits: 2 }
                )}`}
                color="blue"
                subtitle={undefined}
              />
              <InfoCard
                icon={FiPercent}
                title="Total Charges"
                value={`${transaction.fees.total}%`}
                subtitle={`₹${totalCharges.toFixed(2)}`}
                color="yellow"
              />
              <InfoCard
                icon={FiDollarSign}
                title="User Receives"
                value={`₹${userReceives.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}`}
                subtitle="Net amount after charges"
                color="green"
              />
              <InfoCard
                icon={FiCalendar}
                title="Transaction Date"
                value={new Date(
                  transaction.withdrawal.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
                subtitle={new Date(
                  transaction.withdrawal.createdAt
                ).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                color="purple"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* User Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                  User Information
                </h2>
                <div className="space-y-4">
                  <DetailRow
                    label="Full Name"
                    value={transaction.user.name}
                    icon={FiUser}
                  />
                  <DetailRow
                    label="Email Address"
                    value={transaction.user.email}
                    icon={FiMail}
                  />
                  <DetailRow
                    label="Phone Number"
                    value={transaction.user.phone}
                    icon={FiInfo}
                  />
                  <DetailRow
                    label="User ID"
                    value={transaction.user.userId}
                    icon={FiInfo}
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center">
                  <FiCreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <DetailRow
                    label="Payment Method"
                    value={transaction.withdrawal.paymentMethod}
                    icon={FiCreditCard}
                  />
                  <div className="py-3 border-b border-gray-100">
                    <div className="flex items-center mb-2">
                      <FiInfo className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Account Information</span>
                    </div>
                    <div className="text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg font-mono text-sm mt-1">
                      {transaction.withdrawal.account}
                    </div>
                  </div>
                  <DetailRow
                    label="Remarks"
                    value={transaction.withdrawal.remarks}
                    icon={FiInfo}
                  />
                </div>
              </div>
            </div>

            {/* Transaction Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Transaction Breakdown
              </h2>
              <div className="space-y-3">
                <DetailRow
                  label="Requested Amount"
                  value={`₹${transaction.withdrawal.amount.toLocaleString(
                    "en-IN",
                    { minimumFractionDigits: 2 }
                  )}`}
                  icon={undefined}
                />
                <DetailRow
                  label={`Platform Fee (${transaction.fees.platform}%)`}
                  value={`- ₹${(
                    (transaction.withdrawal.amount *
                      transaction.fees.platform) /
                    100
                  ).toFixed(2)}`}
                  className="text-red-600"
                  icon={undefined}
                />
                <DetailRow
                  label={`Processing Fee (${transaction.fees.processing}%)`}
                  value={`- ₹${(
                    (transaction.withdrawal.amount *
                      transaction.fees.processing) /
                    100
                  ).toFixed(2)}`}
                  className="text-red-600"
                  icon={undefined}
                />
                <DetailRow
                  label="Total Charges"
                  value={`- ₹${totalCharges.toFixed(2)}`}
                  className="text-red-600 font-semibold"
                  icon={undefined}
                />
                <div className="pt-3 border-t border-gray-200">
                  <DetailRow
                    label="Net Amount to Transfer"
                    value={`₹${userReceives.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}`}
                    className="text-green-600 font-bold text-lg"
                    icon={undefined}
                  />
                </div>
              </div>
            </div>

            {/* Timeline and Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Transaction Timeline
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Request Created
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(
                          transaction.withdrawal.createdAt
                        ).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Status Updated
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(
                          transaction.withdrawal.completedAt ||
                            transaction.withdrawal.createdAt
                        ).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Changed to {transaction.withdrawal.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Current Status
                      </div>
                      <div className="text-sm text-gray-500">
                        Transaction {transaction.withdrawal.status}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {transaction.withdrawal.status === "completed"
                          ? "Funds transferred successfully"
                          : transaction.withdrawal.status === "pending"
                          ? "Awaiting processing"
                          : "Processing"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Admin Notes
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm text-blue-800">
                      {transaction.withdrawal.adminNotes ||
                        "No admin notes for this transaction."}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Note
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Add notes about this transaction..."></textarea>
                    <div className="mt-2 flex justify-end">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm">
                        Save Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleBack}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  <FiArrowLeft className="inline-block w-4 h-4 mr-2" />
                  Back to Transactions
                </button>
                <button
                  onClick={handleDownloadReceipt}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  <FiDownload className="inline-block w-4 h-4 mr-2" />
                  Download Receipt
                </button>
                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                  <FiMail className="inline-block w-4 h-4 mr-2" />
                  Send Receipt via Email
                </button>
                <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                  <FiCheckCircle className="inline-block w-4 h-4 mr-2" />
                  Mark as Resolved
                </button>
              </div>
            </div>
          </>
        )}

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default ViewAdminTransaction;
