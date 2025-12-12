import API from "@/lib/axios";

export const getAllUsers = () => {
    return API.get("/api/admin/users/all");
};
export const deleteUser = (data) => {
  return API.delete("/api/admin/user", data);
};
