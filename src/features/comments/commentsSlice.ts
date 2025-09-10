import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
    id: number;
    postId: number;
    text: string;
}

interface CommentsState {
    list: Comment[];
}

const initialState: CommentsState = {
    list: [],
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.list.push(action.payload);
        },
        removeComment: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(
                (comment) => comment.id !== action.payload
            );
        },
    },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
