import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {Comment} from "../../types";
import {createComment, fetchAllComments} from "./commentsThunks.ts";

interface CommentsState {
    items: Comment[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })
            .addCase(createComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;