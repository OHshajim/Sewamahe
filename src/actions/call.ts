import API from "@/lib/axios";

export const getMeetingRoom = async (data) => {
    const res = await API.post("/api/meeting/get", data);
    return res.data;
};

export const postCall = async ({roomID, meetingID, type}) => {
    const res = await API.post("/api/meeting/call", { roomID, meetingID, type });
    return res.data;
};
export const answerCall = async ({userID}) => {
    const res = await API.post("/api/meeting/answer", { userID });
    return res.data;
};
export const closeCall = async ({userID}) => {
    const res = await API.post("/api/meeting/close", { userID });
    return res.data;
};
