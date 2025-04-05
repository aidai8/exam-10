import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {Post} from "../../types";
import {createPost, fetchAllPosts, fetchPostById} from "./postsThunks.ts";

interface PostsState {
    items: Post[];
    item: Post | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
                state.items = posts;
                state.fetchLoading = false;
            })

            .addCase(fetchPostById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchPostById.fulfilled, (state, {payload: post}) => {
                state.item = post;
                state.fetchLoading = false;
            })

            .addCase(createPost.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const postsReducer = postSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectOnePost = (state: RootState) => state.posts.item;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;