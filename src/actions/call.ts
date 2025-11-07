import API from "@/lib/axios";

export const getMeetingRoom = async (data) => {
    const res = await API.post("/api/meeting/get", data);
    return res.data;
};

export const postCall = async ({roomID, meetingID}) => {
    const res = await API.post("/api/meeting/call", { roomID, meetingID });
    return res.data;
};
