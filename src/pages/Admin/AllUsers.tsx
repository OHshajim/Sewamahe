import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import {
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiEye,
  FiUserPlus,
  FiDownload,
  FiMail,
  FiCheck,
  FiX,
  FiUser,
  FiLock,
  FiUnlock,
  FiSend,
} from "react-icons/fi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const contentRef = useRef(null);

  // Sample user data
  const sampleUsers = [
    {
      id: 1,
      userId: "USR001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active",
      role: "user",
      joinDate: "2024-01-15",
      lastActive: "2024-03-10",
      balance: "$1,250",
    },
    {
      id: 2,
      userId: "USR002",
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      status: "active",
      role: "admin",
      joinDate: "2024-01-10",
      lastActive: "2024-03-10",
      balance: "$3,420",
    },
    {
      id: 3,
      userId: "USR003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      status: "inactive",
      role: "user",
      joinDate: "2024-01-05",
      lastActive: "2024-02-28",
      balance: "$0",
    },
    {
      id: 4,
      userId: "USR004",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+1 234 567 8903",
      status: "active",
      role: "editor",
      joinDate: "2024-01-20",
      lastActive: "2024-03-09",
      balance: "$2,150",
    },
    {
      id: 5,
      userId: "USR005",
      name: "Alex Brown",
      email: "alex@example.com",
      phone: "+1 234 567 8904",
      status: "suspended",
      role: "user",
      joinDate: "2024-01-25",
      lastActive: "2024-02-15",
      balance: "$500",
    },
    {
      id: 6,
      userId: "USR006",
      name: "Lisa Taylor",
      email: "lisa@example.com",
      phone: "+1 234 567 8905",
      status: "active",
      role: "user",
      joinDate: "2024-02-01",
      lastActive: "2024-03-10",
      balance: "$3,750",
    },
    {
      id: 7,
      userId: "USR007",
      name: "David Lee",
      email: "david@example.com",
      phone: "+1 234 567 8906",
      status: "inactive",
      role: "user",
      joinDate: "2024-02-05",
      lastActive: "2024-02-25",
      balance: "$0",
    },
    {
      id: 8,
      userId: "USR008",
      name: "Rachel Green",
      email: "rachel@example.com",
      phone: "+1 234 567 8907",
      status: "active",
      role: "user",
      joinDate: "2024-02-10",
      lastActive: "2024-03-10",
      balance: "$1,800",
    },
    {
      id: 9,
      userId: "USR009",
      name: "Kevin White",
      email: "kevin@example.com",
      phone: "+1 234 567 8908",
      status: "active",
      role: "user",
      joinDate: "2024-02-15",
      lastActive: "2024-03-09",
      balance: "$2,900",
    },
    {
      id: 10,
      userId: "USR010",
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1 234 567 8909",
      status: "suspended",
      role: "user",
      joinDate: "2024-02-20",
      lastActive: "2024-02-20",
      balance: "$150",
    },
    {
      id: 11,
      userId: "USR011",
      name: "Tom Clark",
      email: "tom@example.com",
      phone: "+1 234 567 8910",
      status: "active",
      role: "user",
      joinDate: "2024-02-25",
      lastActive: "2024-03-10",
      balance: "$4,200",
    },
    {
      id: 12,
      userId: "USR012",
      name: "Sophia Lewis",
      email: "sophia@example.com",
      phone: "+1 234 567 8911",
      status: "active",
      role: "editor",
      joinDate: "2024-03-01",
      lastActive: "2024-03-10",
      balance: "$1,600",
    },
    // Add more users to test scrolling
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 13,
      userId: `USR${(i + 13).toString().padStart(3, "0")}`,
      name: `User ${i + 13}`,
      email: `user${i + 13}@example.com`,
      phone: `+1 234 567 8${(900 + i).toString().padStart(3, "0")}`,
      status: ["active", "inactive", "suspended"][
        Math.floor(Math.random() * 3)
      ],
      role: ["user", "admin", "editor"][Math.floor(Math.random() * 3)],
      joinDate: "2024-03-01",
      lastActive: "2024-03-10",
      balance: `$${Math.floor(Math.random() * 5000)}`,
    })),
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(sampleUsers);
      setFilteredUsers(sampleUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((user) => user.status === filterStatus);
    }

    if (filterRole !== "all") {
      result = result.filter((user) => user.role === filterRole);
    }

    setFilteredUsers(result);
  }, [searchTerm, filterStatus, filterRole, users]);

  // Auto-scroll to top when data changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [filteredUsers]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const deleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setFilteredUsers(filteredUsers.filter((u) => u.id !== userToDelete.id));
      setToggleCleared(!toggleCleared);
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const deleteSelected = () => {
    const selectedIds = selectedRows.map((row) => row.id);
    setUsers(users.filter((u) => !selectedIds.includes(u.id)));
    setFilteredUsers(filteredUsers.filter((u) => !selectedIds.includes(u.id)));
    setSelectedRows([]);
    setToggleCleared(!toggleCleared);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          colors[status] || colors.inactive
        }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Custom columns for DataTable
  const columns = [
    {
      name: "User ID",
      selector: (row) => row.userId,
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-gray-900">{row.userId}</div>
      ),
      //       width: '120px',
    },
    {
      name: "User",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-gray-900">{row.name}</div>
      ),
      //       minWidth: '250px',
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
      //       width: '110px',
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : row.role === "editor"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}>
          {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
        </span>
      ),
      //       width: '90px',
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-gray-900">{row.balance}</div>
      ),
      //       width: '100px',
    },
    {
      name: "Join Date",
      selector: (row) => row.joinDate,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-900">
          {new Date(row.joinDate).toLocaleDateString()}
        </div>
      ),
      //       width: '110px',
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View">
            <FiEye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit">
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
            onClick={() => confirmDeleteUser(row)}>
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      //       width: '120px',
      ignoreRowClick: true,
    },
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottomWidth: "1px",
        borderColor: "#e5e7eb",
        fontWeight: "600",
        minHeight: "56px",
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
        textTransform: "uppercase",
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
        minHeight: "60px",
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

  // Context actions for selected rows
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedRows.length} user(s)?`
        )
      ) {
        deleteSelected();
      }
    };

    const handleEmail = () => {
      const emails = selectedRows.map((row) => row.email).join(", ");
      alert(`Would send email to: ${emails}`);
    };

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleEmail}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
          <FiMail className="w-4 h-4" />
          Email ({selectedRows.length})
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors">
          <FiTrash2 className="w-4 h-4" />
          Delete ({selectedRows.length})
        </button>
      </div>
    );
  }, [selectedRows]);

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        //         maxHeight: 'calc(100vh - 64px)', // Adjust based on your header height
        scrollBehavior: "smooth",
      }}>
      <div className="p-4 md:p-6">
        {/* Header - Fixed position for better scrolling */}
        <div className="mb-6 md:mb-8 bg-gray-50 sticky top-0 z-10 pt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                All Users
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and monitor all registered users
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base">
                <FiUserPlus className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Add User</span>
              </button>
              <button className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base">
                <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiUser className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Users</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {users.filter((u) => u.status === "inactive").length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <FiX className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Selected</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {selectedRows.length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiSend className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* DataTable Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <DataTable
            title="User Management"
            columns={columns}
            data={filteredUsers}
            progressPending={loading}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
            }}
            selectableRows
            selectableRowsHighlight
            selectableRowsVisibleOnly={false}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            contextActions={contextActions}
            customStyles={customStyles}
            noDataComponent={
              <div className="py-12 text-center">
                <div className="text-gray-500 text-lg mb-2">No users found</div>
                <div className="text-gray-400">
                  Try adjusting your search or filters
                </div>
              </div>
            }
            progressComponent={
              <div className="py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent inline-block"></div>
                <div className="text-gray-500 mt-4">Loading users...</div>
              </div>
            }
            dense
            fixedHeader
            //   fixedHeaderScrollHeight="calc(100vh - 400px)" // Adjust based on your layout
          />
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-8"></div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user{" "}
              <span className="font-semibold">{userToDelete.name}</span> (
              {userToDelete.userId})? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                onClick={deleteUser}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
