import {
  getAllUsers,
  getPayGicInfo,
  getWebData,
  updatePaygic,
  updateRazorpay,
  updateWebData,
} from "@/actions/admin";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiSearch, FiSave } from "react-icons/fi";
import { toast } from "sonner";

function Settings() {
  const [settings, setSettings] = useState({
    withdrawalCharge: "",
    rechargeAmount: "",
    paymentMethod: {
      paygic: true,
      razorPay: true,
    },
  });
  const [paymentCredentials, setPaymentCredentials] = useState({
    razorpay: {
      key: "",
      secret: "",
      razorpayId: "",
    },
    paygic: {
      mid: "",
      password: "",
    },
  });

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data: users } = await getAllUsers();
      setUsers(users);
      setFilteredUsers(users);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(value) ||
          user.lastName?.toLowerCase().includes(value) ||
          user.email?.toLowerCase().includes(value) ||
          user.username?.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  // Handle commission update (mock)
  const handleCommissionUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commission = formData.get("commission");
    try {
      const { data } = await updateWebData({
        withdrawalCharge: parseFloat(String(commission)),
      });
      if (data.success) {
        toast.success(
          `Withdrawal commission updated to ${commission}% successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle recharge amount update (mock)
  const handleRechargeUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rechargeAmount = formData.get("rechargeAmount");
    try {
      const { data } = await updateWebData({
        rechargeAmount: parseFloat(String(rechargeAmount)),
      });
      if (data.success) {
        toast.success(
          `Recharge amount updated to ₹${rechargeAmount} successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle payment methods toggle (mock)
  const handlePaymentToggle = async (method) => {
    const updatedMethods = {
      ...settings.paymentMethod,
      [method]: !settings.paymentMethod[method],
    };
    try {
      const { data } = await updateWebData({
        paymentMethod: updatedMethods,
      });
      setSettings((prev) => ({
        ...prev,
        paymentMethod: updatedMethods,
      }));
      if (data.success) {
        toast.success(
          `${method === "paygic" ? "PayGic" : "Razorpay"} payment method ${
            updatedMethods[method] ? "enabled" : "disabled"
          } successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Razorpay credentials update (mock)
  const handleRazorpayUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = {
      key: String(formData.get("razorpayKey") ?? ""),
      secret: String(formData.get("razorpaySecret") ?? ""),
      razorpayId: String(formData.get("razorpayId") ?? ""),
    };

    try {
      const { data } = await updateRazorpay(credentials);
      if (data.success) {
        toast.success("Razorpay credentials updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle PayGic credentials update (mock)
  const handlePayGicUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const credentials = {
        mid: String(formData.get("paygicMid") ?? ""),
        password: String(formData.get("paygicPassword") ?? ""),
      };
      const { data } = await updatePaygic(credentials);
      if (data.success) {
        toast.success("PayGic credentials updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle user credit (mock)
  const handleCreditUser = (user) => {
    setSelectedUser(user);
    setShowCreditModal(true);
  };

  const handleCreditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Mock credit
    alert(
      `Credited ₹${creditAmount} to ${selectedUser.firstName} ${selectedUser.lastName} (mock update)`
    );
    setShowCreditModal(false);
    setSelectedUser(null);
    setCreditAmount(0);
  };

  // DataTable columns
  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-gray-900">
          {row.firstName || ""} {row.lastName || ""}
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
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-500 text-sm">@{row.username}</div>
      ),
    },
    {
      name: "Balance",
      selector: (row) => row.balance?.amount || 0,
      sortable: true,
      cell: (row) => (
        <div className="font-semibold text-gray-900">
          ₹ {(row.balance?.amount || 0).toFixed(2)}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleCreditUser(row)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
          Credit
        </button>
      ),
      width: "90px",
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

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getWebData();
      if (data.success) {
        setSettings({
          withdrawalCharge: data.data.withdrawalCharge,
          rechargeAmount: data.data.rechargeAmount,
          paymentMethod: {
            paygic: data.data.paymentMethod.paygic,
            razorPay: data.data.paymentMethod.razorPay,
          }, // Retain the existing paymentMethod
        });
        // setPaymentCredentials({
        //   razorpay: {
        //     key: data.data.razorpayKey || "",
        //     secret: data.data.razorpaySecret || "",
        //     razorpayId: data.data.razorpayId || "",
        //   },
        //   paygic: {
        //     mid: data.data.paygicMid || "",
        //     password: data.data.paygicPassword || "",
        //   },
        // });
      }

      const paygicRes = await getPayGicInfo();
      if (paygicRes.data.success) {
        setPaymentCredentials((prev) => ({
          ...prev,
          paygic: {
            mid: paygicRes.data.data.mid,
            password: paygicRes.data.data.password,
          },
        }));
      }
    };
    fetch();
  }, []);

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)", // Adjust based on your header height
        scrollBehavior: "smooth",
      }}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage system configuration and user settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Commission Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Withdrawal Commission
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Set commission percentage for withdrawals
            </p>

            <form onSubmit={handleCommissionUpdate}>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <input
                  type="number"
                  name="commission"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={settings.withdrawalCharge}
                  placeholder="Enter commission %"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update
                </button>
              </div>
            </form>
          </div>

          {/* Recharge Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Recharge Amount
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Set default recharge amount
            </p>

            <form onSubmit={handleRechargeUpdate}>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <input
                  type="number"
                  name="rechargeAmount"
                  step="0.01"
                  min="0"
                  defaultValue={settings.rechargeAmount}
                  placeholder="Enter recharge amount"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Payment Methods Toggle */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Methods
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enable or disable payment gateways
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    PayGic
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    Enable PayGic payment gateway
                  </p>
                </div>
                <button
                  onClick={() => handlePaymentToggle("paygic")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paymentMethod.paygic
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paymentMethod.paygic
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Razorpay
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    Enable Razorpay payment gateway
                  </p>
                </div>
                <button
                  onClick={() => handlePaymentToggle("razorPay")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paymentMethod.razorPay
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paymentMethod.razorPay
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Razorpay Credentials */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Razorpay Credentials
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Update Razorpay API credentials
            </p>

            <form onSubmit={handleRazorpayUpdate}>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    name="razorpayKey"
                    defaultValue={paymentCredentials.razorpay.key}
                    placeholder="Enter API key"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    API Secret
                  </label>
                  <input
                    type="password"
                    name="razorpaySecret"
                    defaultValue={paymentCredentials.razorpay.secret}
                    placeholder="Enter API secret"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Razorpay ID
                  </label>
                  <input
                    type="text"
                    name="razorpayId"
                    defaultValue={paymentCredentials.razorpay.razorpayId}
                    placeholder="Enter Razorpay ID"
                    className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base">
                  <FiSave className="w-4 h-4" />
                  Update Credentials
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* PayGic Credentials */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm mb-6 md:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            PayGic Credentials
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Update PayGic API credentials
          </p>

          <form onSubmit={handlePayGicUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Merchant ID (MID)
                </label>
                <input
                  type="text"
                  name="paygicMid"
                  defaultValue={paymentCredentials.paygic.mid}
                  placeholder="Enter Merchant ID"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="paygicPassword"
                  defaultValue={paymentCredentials.paygic.password}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base">
                <FiSave className="w-4 h-4" />
                Update Credentials
              </button>
            </div>
          </form>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  User Management
                </h2>
                <p className="text-gray-500 text-xs md:text-sm">
                  Manage user balances and credit
                </p>
              </div>
              <div className="relative w-full md:w-auto">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm md:text-base"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
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
                  No users found
                </div>
                <div className="text-gray-400 text-sm">
                  Try adjusting your search
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
            fixedHeaderScrollHeight="calc(100vh - 400px)" // Adjust based on your layout
          />
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>

      {/* Credit Modal */}
      {showCreditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Credit User: {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <p className="text-gray-600 text-sm mb-4 md:mb-6">
              Current Balance: ₹{" "}
              {(selectedUser.balance?.amount || 0).toFixed(2)}
            </p>

            <form onSubmit={handleCreditSubmit}>
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
                  placeholder="Enter amount to credit"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                  onClick={() => {
                    setShowCreditModal(false);
                    setSelectedUser(null);
                    setCreditAmount(0);
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                  Credit User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
