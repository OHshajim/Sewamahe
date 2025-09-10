import API from "@/lib/axios";
import axios from "axios";

export const login = (email, password) => {
    return API.post("/api/auth/login", { email, password });
};

export const register = (data) => {
    return API.post("/api/auth/register", data);
};

export const sendCode = (email) => {
    return API.post("api/auth/forgot-password", { email });
};

export const changePassword = (email, authCode, password) => {
    
    return API.post("/api/auth/reset-password", {
        email,
        code: authCode,
        password,
    });
};

export const setAuthToken = (token) => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common.Authorization;
    }
};
