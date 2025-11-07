import API from "@/lib/axios";

export const Message = (data) => {
    return API.post(`/api/message`, data);
};