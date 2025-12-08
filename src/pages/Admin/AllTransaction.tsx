import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiDollarSign,
  FiList,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
} from "react-icons/fi";

function AdminTransaction() {
  const navigate = useNavigate();

  // Mock transaction data
  const mockTransactions = [
    {
      _id: "txn_5f8d04d7e4b0c",
      paymentMethod: "Bank Transfer",
      account: "ACC-1234-XYZ",
      amount: 1500.0,
      status: "completed",
      createdAt: "2024-03-10T10:30:00Z",
      completedAt: "2024-03-10T14:30:00Z",
      transactionRef: "BANKREF12345",
    },
    {
      _id: "txn_5f8d04d7e4b0d",
      paymentMethod: "UPI",
      account: "upi@bank",
      amount: 2500.0,
      status: "completed",
      createdAt: "2024-03-09T14:20:00Z",
      completedAt: "2024-03-09T16:20:00Z",
      transactionRef: "UPITXN67890",
    },
    {
      _id: "txn_5f8d04d7e4b0e",
      paymentMethod: "PayPal",
      account: "user@paypal.com",
      amount: 3500.0,
      status: "failed",
      createdAt: "2024-03-08T09:15:00Z",
      completedAt: "2024-03-08T10:15:00Z",
      transactionRef: "PAYPAL78901",
    },
    {
      _id: "txn_5f8d04d7e4b0f",
      paymentMethod: "Bank Transfer",
      account: "ACC-5678-ABC",
      amount: 1200.0,
      status: "completed",
      createdAt: "2024-03-07T16:45:00Z",
      completedAt: "2024-03-07T18:45:00Z",
      transactionRef: "BANKREF23456",
    },
    {
      _id: "txn_5f8d04d7e4b10",
      paymentMethod: "UPI",
      account: "user@upi",
      amount: 1800.0,
      status: "completed",
      createdAt: "2024-03-06T11:20:00Z",
      completedAt: "2024-03-06T13:20:00Z",
      transactionRef: "UPITXN34567",
    },
    {
      _id: "txn_5f8d04d7e4b11",
      paymentMethod: "Bank Transfer",
      account: "ACC-9012-DEF",
      amount: 3200.0,
      status: "failed",
      createdAt: "2024-03-05T13:10:00Z",
      completedAt: "2024-03-05T15:10:00Z",
      transactionRef: "BANKREF45678",
    },
    {
      _id: "txn_5f8d04d7e4b12",
      paymentMethod: "PayPal",
      account: "user2@paypal.com",
      amount: 2200.0,
      status: "completed",
      createdAt: "2024-03-04T15:30:00Z",
      completedAt: "2024-03-04T17:30:00Z",
      transactionRef: "PAYPAL56789",
    },
    {
      _id: "txn_5f8d04d7e4b13",
      paymentMethod: "UPI",
      account: "user3@upi",
      amount: 1400.0,
      status: "completed",
      createdAt: "2024-03-03T12:40:00Z",
      completedAt: "2024-03-03T14:40:00Z",
      transactionRef: "UPITXN45678",
    },
    {
      _id: "txn_5f8d04d7e4b14",
      paymentMethod: "Bank Transfer",
      account: "ACC-3456-GHI",
      amount: 2800.0,
      status: "pending",
      createdAt: "2024-03-02T09:50:00Z",
      transactionRef: "BANKREF56789",
    },
    {
      _id: "txn_5f8d04d7e4b15",
      paymentMethod: "UPI",
      account: "user4@upi",
      amount: 1900.0,
      status: "completed",
      createdAt: "2024-03-01T14:15:00Z",
      completedAt: "2024-03-01T16:15:00Z",
      transactionRef: "UPITXN56789",
    },
  ];

  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Calculate stats
  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === "completed").length,
    failed: transactions.filter((t) => t.status === "failed").length,
    pending: transactions.filter((t) => t.status === "pending").length,
    totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
  };

  // Fetch transactions (mock)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = transactions;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (transaction) =>
          transaction._id?.toLowerCase().includes(lowerSearch) ||
          transaction.account?.toLowerCase().includes(lowerSearch) ||
          transaction.paymentMethod?.toLowerCase().includes(lowerSearch) ||
          transaction.amount?.toString().includes(searchTerm) ||
          transaction.transactionRef?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply status filter
    if (filterStatus !== "All") {
      result = result.filter(
        (transaction) => transaction.status === filterStatus.toLowerCase()
      );
    }

    // Sort by date (newest first)
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredTransactions(result);
  }, [searchTerm, filterStatus, transactions]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle view transaction
  const handleView = (id) => {
    navigate(`/admin/transaction/view/${id}`);
    alert(`Would navigate to transaction details page for ID: ${id} (mock)`);
  };

  // Handle retry failed transaction (mock)
  const handleRetry = (id) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction._id === id
          ? { ...transaction, status: "pending" }
          : transaction
      )
    );
    alert(`Transaction ${id} marked for retry (mock update)`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      completed: <FiCheckCircle className="w-3 h-3 mr-1" />,
      pending: <FiClock className="w-3 h-3 mr-1" />,
      failed: <FiXCircle className="w-3 h-3 mr-1" />,
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

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
      name: "Transaction ID",
      selector: (row) => row._id,
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900 text-sm font-mono">
            {row._id.slice(0, 8)}
          </div>
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
      name: "Account",
      selector: (row) => row.account,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-900 text-sm font-mono">
          {row.account.length > 10
            ? `${row.account.slice(0, 5)}...`
            : row.account}
        </div>
      ),
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
    //     {
    //       name: 'Date',
    //       selector: row => row.createdAt,
    //       sortable: true,
    //       cell: row => (
    //         <div className="text-sm text-gray-500">
    //           {new Date(row.createdAt).toLocaleDateString('en-IN', {
    //             day: '2-digit',
    //             month: 'short'
    //           })}
    //         </div>
    //       ),
    //     },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row._id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
            <FiEye className="w-3 h-3" />
            View
          </button>
        </div>
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
            Transaction History
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all processed transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiList className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.completed}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
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
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Failed</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.failed}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <FiXCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search by Transaction ID, Account, Amount, or Reference..."
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={handleStatusFilter}>
                <option value="All">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                <FiDollarSign className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            title="Transaction History"
            columns={columns}
            data={filteredTransactions}
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
            selectableRows
            selectableRowsHighlight
            selectableRowsVisibleOnly={false}
            onSelectedRowsChange={({ selectedRows }) =>
              setSelectedRows(selectedRows)
            }
            customStyles={customStyles}
            noDataComponent={
              <div className="py-8 md:py-12 text-center">
                <div className="text-gray-500 text-base md:text-lg mb-2">
                  No transactions found
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
                  Loading transactions...
                </div>
              </div>
            }
            dense
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 400px)"
          />
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mt-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transaction Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Average Amount</div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                ₹
                {(stats.totalAmount / stats.total).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Success Rate</div>
              <div className="text-xl font-bold text-green-600 mt-1">
                {stats.total > 0
                  ? ((stats.completed / stats.total) * 100).toFixed(1)
                  : 0}
                %
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Recent Activity</div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                {
                  transactions.filter(
                    (t) =>
                      new Date(t.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </div>
              <div className="text-xs text-gray-500 mt-1">Last 7 days</div>
            </div>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminTransaction;
