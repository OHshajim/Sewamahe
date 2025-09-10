import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersState {
    list: User[];
}

const initialState: UsersState = {
    list: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.list.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(
                (user) => user.id !== action.payload
            );
        },
    },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
