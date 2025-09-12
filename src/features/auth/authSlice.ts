import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Your full User type
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    tagLine: string;
    consultantStatus: string;
    createdAt: string;
    lastOnline: string;
    level: string;
    type: string;
    price: number;
    balance: {
        minute: number;
        amount: number;
    };
    favorites: string[];
    history: string[];
    __v: number;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
