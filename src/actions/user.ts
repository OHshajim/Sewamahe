import API from "@/lib/axios";

export const fetchAllUsers = async () => {
    const res = await API.get("/api/users");
    return res.data;
};
