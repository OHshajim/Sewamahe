import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiDollarSign,
  FiPercent,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ViewWithdrawalRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock transaction data
  const mockTransaction = {
    _id: id || 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
    },
    withdrawal: {
      amount: 1500.0,
      paymentMethod: "Bank Transfer",
      account: "State Bank\nAccount: XXXX-1234\nIFSC: SBIN0001234",
      status: "pending",
      createdAt: "2024-03-10T10:30:00Z",
      transactionId: "TXN" + (id || "123456"),
      remarks: "Monthly withdrawal request",
    },
    adminCharge: 2.5, // percentage
  };

  const [transaction, setTransaction] = useState(mockTransaction);
  const [loading, setLoading] = useState(false);
  const [userReceives, setUserReceives] = useState(0);

  // Calculate user receives amount
  useEffect(() => {
    if (transaction?.withdrawal?.amount) {
      const chargeAmount =
        (transaction.withdrawal.amount * transaction.adminCharge) / 100;
      const mainReturn = transaction.withdrawal.amount - chargeAmount;
      setUserReceives(mainReturn);
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

  // Handle status update (mock)
  const handleUpdateStatus = (status) => {
    setTransaction((prev) => ({
      ...prev,
      withdrawal: {
        ...prev.withdrawal,
        status: status,
      },
    }));
    alert(`Status updated to ${status} (mock update)`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      reject: "bg-red-100 text-red-800 border-red-200",
      completed: "bg-purple-100 text-purple-800 border-purple-200",
    };

    const icons = {
      pending: <FiClock className="w-4 h-4 mr-1" />,
      approved: <FiCheckCircle className="w-4 h-4 mr-1" />,
      processing: <FiInfo className="w-4 h-4 mr-1" />,
      reject: <FiInfo className="w-4 h-4 mr-1" />,
      completed: <FiCheckCircle className="w-4 h-4 mr-1" />,
    };

    const statusText =
      status === "reject"
        ? "Rejected"
        : status === "pending"
        ? "Pending"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
          colors[status] || colors.pending
        }`}>
        {icons[status]}
        {statusText}
      </span>
    );
  };

  // Info card component
  const InfoCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  // Action buttons
  const ActionButton = ({ onClick, children, color = "blue", icon: Icon }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
        color === "green"
          ? "bg-green-600 hover:bg-green-700 text-white"
          : color === "red"
          ? "bg-red-600 hover:bg-red-700 text-white"
          : color === "yellow"
          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
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
          <span className="hidden md:inline">Back</span>
        </button>
        <div className="flex items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Transaction Details
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage withdrawal request details
            </p>
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
              <div>
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="text-lg font-bold text-gray-900 font-mono">
                  {transaction.withdrawal.transactionId}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">Status</div>
                <StatusBadge status={transaction.withdrawal.status} />
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
                subtitle={undefined}
              />
              <InfoCard
                icon={FiPercent}
                title="Admin Charge"
                value={`${transaction.adminCharge}%`}
                subtitle={`₹${(
                  (transaction.withdrawal.amount * transaction.adminCharge) /
                  100
                ).toFixed(2)}`}
              />
              <InfoCard
                icon={FiDollarSign}
                title="User Receives"
                value={`₹${userReceives.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}`}
                subtitle="After charges"
              />
              <InfoCard
                icon={FiCalendar}
                title="Request Date"
                value={new Date(
                  transaction.withdrawal.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                subtitle={new Date(
                  transaction.withdrawal.createdAt
                ).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* User Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  <FiUser className="inline-block w-5 h-5 mr-2 text-blue-600" />
                  User Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="text-gray-900 font-medium">
                      {transaction.user.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="text-gray-900">
                      {transaction.user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="text-gray-900">
                      {transaction.user.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  <FiCreditCard className="inline-block w-5 h-5 mr-2 text-blue-600" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <div className="text-gray-900 font-medium">
                      {transaction.withdrawal.paymentMethod}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Information
                    </label>
                    <div className="text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg font-mono text-sm">
                      {transaction.withdrawal.account}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remarks
                    </label>
                    <div className="text-gray-900">
                      {transaction.withdrawal.remarks || "No remarks provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Transaction Breakdown
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Requested Amount</span>
                  <span className="font-medium text-gray-900">
                    ₹
                    {transaction.withdrawal.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-600">
                    Admin Charge ({transaction.adminCharge}%)
                  </span>
                  <span className="font-medium text-red-600">
                    - ₹
                    {(
                      (transaction.withdrawal.amount *
                        transaction.adminCharge) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-600 font-medium">
                    Amount to Transfer
                  </span>
                  <span className="font-bold text-green-600">
                    ₹
                    {userReceives.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                {transaction.withdrawal.status === "pending" && (
                  <>
                    <ActionButton
                      onClick={() => handleUpdateStatus("approved")}
                      color="green"
                      icon={FiCheckCircle}>
                      Approve Request
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleUpdateStatus("processing")}
                      color="blue"
                      icon={FiInfo}>
                      Mark as Processing
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleUpdateStatus("reject")}
                      color="red"
                      icon={FiInfo}>
                      Reject Request
                    </ActionButton>
                  </>
                )}

                {transaction.withdrawal.status === "approved" && (
                  <ActionButton
                    onClick={() => handleUpdateStatus("completed")}
                    color="green"
                    icon={FiCheckCircle}>
                    Mark as Completed
                  </ActionButton>
                )}

                {transaction.withdrawal.status === "processing" && (
                  <>
                    <ActionButton
                      onClick={() => handleUpdateStatus("completed")}
                      color="green"
                      icon={FiCheckCircle}>
                      Mark as Completed
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleUpdateStatus("pending")}
                      color="yellow"
                      icon={FiClock}>
                      Revert to Pending
                    </ActionButton>
                  </>
                )}

                {(transaction.withdrawal.status === "reject" ||
                  transaction.withdrawal.status === "completed") && (
                  <ActionButton
                    onClick={() => handleUpdateStatus("pending")}
                    color="yellow"
                    icon={FiClock}>
                    Reset to Pending
                  </ActionButton>
                )}

                <button
                  onClick={handleBack}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                  Back to List
                </button>
              </div>
            </div>

            {/* Transaction Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
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
                      {new Date().toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      - Currently {transaction.withdrawal.status}
                    </div>
                  </div>
                </div>
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

export default ViewWithdrawalRequest;
