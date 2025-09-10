import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    id: number;
    title: string;
}

interface PostsState {
    list: Post[];
}

const initialState: PostsState = {
    list: [],
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.list.push(action.payload);
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(
                (post) => post.id !== action.payload
            );
        },
    },
});

export const { addPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
