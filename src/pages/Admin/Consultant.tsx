import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  FiSearch,
  FiCheck,
  FiX,
  FiUser,
  FiUsers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

function AdminConsultant() {
  // Mock consultant data
  const mockConsultants = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      username: "johndoe",
      type: "Consultant",
      consultantStatus: "Approved",
      joinDate: "2024-01-15",
      specialty: "Business Strategy",
      clients: 24,
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah@example.com",
      username: "sarahs",
      type: "Consultant",
      consultantStatus: "Pending",
      joinDate: "2024-02-10",
      specialty: "Marketing",
      clients: 15,
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@example.com",
      username: "mikej",
      type: "Consultant",
      consultantStatus: "Approved",
      joinDate: "2024-01-25",
      specialty: "Finance",
      clients: 32,
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma@example.com",
      username: "emmaw",
      type: "Consultant",
      consultantStatus: "Pending",
      joinDate: "2024-03-01",
      specialty: "IT Consulting",
      clients: 8,
    },
    {
      id: 5,
      firstName: "Alex",
      lastName: "Brown",
      email: "alex@example.com",
      username: "alexb",
      type: "Consultant",
      consultantStatus: "Approved",
      joinDate: "2024-02-15",
      specialty: "HR",
      clients: 19,
    },
    {
      id: 6,
      firstName: "Lisa",
      lastName: "Taylor",
      email: "lisa@example.com",
      username: "lisat",
      type: "Consultant",
      consultantStatus: "Pending",
      joinDate: "2024-03-05",
      specialty: "Sales",
      clients: 12,
    },
    {
      id: 7,
      firstName: "David",
      lastName: "Lee",
      email: "david@example.com",
      username: "davidl",
      type: "Consultant",
      consultantStatus: "Approved",
      joinDate: "2024-01-30",
      specialty: "Operations",
      clients: 27,
    },
    {
      id: 8,
      firstName: "Rachel",
      lastName: "Green",
      email: "rachel@example.com",
      username: "rachelg",
      type: "Consultant",
      consultantStatus: "Rejected",
      joinDate: "2024-02-20",
      specialty: "Legal",
      clients: 0,
    },
  ];

  const [consultants, setConsultants] = useState(mockConsultants);
  const [filteredConsultants, setFilteredConsultants] =
    useState(mockConsultants);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Calculate stats
  const stats = {
    total: consultants.length,
    approved: consultants.filter((c) => c.consultantStatus === "Approved")
      .length,
    pending: consultants.filter((c) => c.consultantStatus === "Pending").length,
    rejected: consultants.filter((c) => c.consultantStatus === "Rejected")
      .length,
  };

  // Fetch consultants (mock)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = consultants;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (consultant) =>
          consultant.firstName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          consultant.lastName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          consultant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultant.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter(
        (consultant) => consultant.consultantStatus === filterStatus
      );
    }

    setFilteredConsultants(result);
  }, [searchTerm, filterStatus, consultants]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle approve consultant (mock)
  const handleApprove = (id) => {
    setConsultants((prev) =>
      prev.map((consultant) =>
        consultant.id === id
          ? { ...consultant, consultantStatus: "Approved" }
          : consultant
      )
    );
    alert(`Consultant approved (mock update)`);
  };

  // Handle disapprove consultant (mock)
  const handleDisapprove = (id) => {
    setConsultants((prev) =>
      prev.map((consultant) =>
        consultant.id === id
          ? { ...consultant, consultantStatus: "Rejected" }
          : consultant
      )
    );
    alert(`Consultant disapproved (mock update)`);
  };

  // Handle bulk actions
  const handleBulkApprove = () => {
    if (selectedRows.length === 0) {
      alert("Please select consultants first");
      return;
    }

    const selectedIds = selectedRows.map((row) => row.id);
    setConsultants((prev) =>
      prev.map((consultant) =>
        selectedIds.includes(consultant.id)
          ? { ...consultant, consultantStatus: "Approved" }
          : consultant
      )
    );
    setSelectedRows([]);
    alert(`${selectedRows.length} consultant(s) approved (mock update)`);
  };

  const handleBulkReject = () => {
    if (selectedRows.length === 0) {
      alert("Please select consultants first");
      return;
    }

    const selectedIds = selectedRows.map((row) => row.id);
    setConsultants((prev) =>
      prev.map((consultant) =>
        selectedIds.includes(consultant.id)
          ? { ...consultant, consultantStatus: "Rejected" }
          : consultant
      )
    );
    setSelectedRows([]);
    alert(`${selectedRows.length} consultant(s) rejected (mock update)`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      Approved: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      Approved: <FiCheckCircle className="w-3 h-3 mr-1" />,
      Pending: <FiClock className="w-3 h-3 mr-1" />,
      Rejected: <FiX className="w-3 h-3 mr-1" />,
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
          colors[status] || colors.Pending
        }`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  // DataTable columns
  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-gray-900">
          {row.firstName} {row.lastName}
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div className="text-gray-600 text-sm">{row.email}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.consultantStatus,
      sortable: true,
      cell: (row) => <StatusBadge status={row.consultantStatus} />,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.consultantStatus === "Approved" ? (
            <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium cursor-default">
              Approved
            </button>
          ) : (
            <>
              <button
                onClick={() => handleApprove(row.id)}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium">
                Approve
              </button>
              <button
                onClick={() => handleDisapprove(row.id)}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium">
                Reject
              </button>
            </>
          )}
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
            Consultant Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage consultant applications and approvals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Consultants</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.approved}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
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
                <p className="text-sm text-gray-500">Selected</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {selectedRows.length}
                </p>
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
                placeholder="Search consultants by name, email, or specialty..."
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
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

              {selectedRows.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleBulkApprove}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors">
                    <FiCheck className="w-4 h-4" />
                    Approve ({selectedRows.length})
                  </button>
                  <button
                    onClick={handleBulkReject}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors">
                    <FiX className="w-4 h-4" />
                    Reject ({selectedRows.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            title="Consultant Applications"
            columns={columns}
            data={filteredConsultants}
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
                  No consultants found
                </div>
                <div className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </div>
              </div>
            }
            progressComponent={
              <div className="py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent inline-block"></div>
                <div className="text-gray-500 mt-4">Loading consultants...</div>
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

export default AdminConsultant;
