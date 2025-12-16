import { getAllWithdrawals } from "@/actions/admin";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  FiSearch,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function WithdrawalRequest() {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  // Calculate stats
  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter((w) => w.status === "pending").length,
    approved: withdrawals.filter((w) => w.status === "approved").length,
    processing: withdrawals.filter((w) => w.status === "processing").length,
    rejected: withdrawals.filter((w) => w.status === "reject").length,
    totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0),
  };

  // Fetch withdrawals (mock)
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const { data } = await getAllWithdrawals();
      if (data.success) {
        setWithdrawals(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = withdrawals;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (withdrawal) =>
          withdrawal.author?.name?.toLowerCase().includes(lowerSearch) ||
          withdrawal.author?.email?.toLowerCase().includes(lowerSearch) ||
          withdrawal.paymentMethod?.toLowerCase().includes(lowerSearch) ||
          withdrawal.amount?.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterStatus !== "All") {
      result = result.filter((withdrawal) =>
        filterStatus === "reject"
          ? withdrawal.status === "reject"
          : withdrawal.status === filterStatus.toLowerCase()
      );
    }

    // Sort by date (newest first)
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredWithdrawals(result);
  }, [searchTerm, filterStatus, withdrawals]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle view withdrawal
  const handleView = (id) => {
    navigate(`/admin/withdrawal-request/view/${id}`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      reject: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      pending: <FiClock className="w-3 h-3 mr-1" />,
      approved: <FiCheckCircle className="w-3 h-3 mr-1" />,
      processing: <FiLoader className="w-3 h-3 mr-1" />,
      reject: <FiXCircle className="w-3 h-3 mr-1" />,
    };

    const statusText =
      status === "reject"
        ? "Rejected"
        : status === "pending"
        ? "Pending"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
          colors[status] || colors.pending
        }`}>
        {icons[status]}
        {statusText}
      </span>
    );
  };

  // Payment method badge
  const PaymentMethodBadge = ({ method }) => {
    const colors = {
      "Bank Transfer": "bg-purple-100 text-purple-800",
      UPI: "bg-indigo-100 text-indigo-800",
      PayPal: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          colors[method] || "bg-gray-100 text-gray-800"
        }`}>
        {method}
      </span>
    );
  };

  // DataTable columns
  const columns = [
    {
      name: "User",
      selector: (row) => row.author?.name,
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.author?.name}</div>
          <div className="text-xs text-gray-500">{row.author?.email}</div>
        </div>
      ),
    },
    {
      name: "Method",
      selector: (row) => row.paymentMethod,
      sortable: true,
      cell: (row) => <PaymentMethodBadge method={row.paymentMethod} />,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => (
        <div className="font-bold text-gray-900">
          ₹{row.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-500">
          {new Date(row.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleView(row._id)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
          <FiEye className="w-3 h-3" />
          View
        </button>
      ),

      ignoreRowClick: true,
    },
  ];

  // DataTable custom styles
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottomWidth: "1px",
        borderColor: "#e5e7eb",
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        fontSize: "0.75rem",
        fontWeight: "600",
        textTransform: "uppercase" as const,
        color: "#6b7280",
      },
    },
    cells: {
      style: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        fontSize: "0.875rem",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        minHeight: "56px",
        "&:not(:last-of-type)": {
          borderBottomWidth: "1px",
          borderColor: "#f3f4f6",
        },
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#ffffff",
        borderTopWidth: "1px",
        borderColor: "#e5e7eb",
        padding: "0.75rem",
        fontSize: "0.875rem",
      },
    },
  };

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
            Withdrawal Requests
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and process user withdrawal requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiClock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  ₹
                  {stats.totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
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
                placeholder="Search by user name, email, amount, or payment method..."
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter and Bulk Actions */}
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={handleStatusFilter}>
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="reject">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            title="Withdrawal Requests"
            columns={columns}
            data={filteredWithdrawals}
            progressPending={loading}
            pagination
            paginationPerPage={8}
            paginationRowsPerPageOptions={[5, 8, 10, 20]}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
            }}
            customStyles={customStyles}
            noDataComponent={
              <div className="py-8 md:py-12 text-center">
                <div className="text-gray-500 text-base md:text-lg mb-2">
                  No withdrawal requests found
                </div>
                <div className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </div>
              </div>
            }
            progressComponent={
              <div className="py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent inline-block"></div>
                <div className="text-gray-500 mt-4">
                  Loading withdrawal requests...
                </div>
              </div>
            }
            dense
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 400px)"
          />
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default WithdrawalRequest;
