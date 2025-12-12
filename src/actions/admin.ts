import API from "@/lib/axios";

export const getAllUsers = () => {
    return API.get("/api/admin/users/all");
};
export const deleteUser = (data) => {
  return API.delete("/api/admin/user", data);
};

export const updateUser = (data) => {
  return API.put("/api/admin/user/update", data);
};

export const updatePaygic = (data) => {
  return API.post("/api/admin/paygic/set", data);
};

export const updateRazorpay = (data) => {
  return API.post("/api/admin/razorpay/set", data);
};

export const updateWebData = (data) => {
  return API.put("/api/admin/website/set", data);
};

export const getWebData = () => {
  return API.get("/api/user/webData/get");
};

export const getPayGicInfo = () => {
  return API.get("/api/admin/paygic/get");
};

export const getRazorpayInfo = () => {
  return API.get("/api/admin/razorpay/get");
};


