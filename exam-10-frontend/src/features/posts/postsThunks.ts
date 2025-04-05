import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Post, PostMutation} from "../../types";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk<Post[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosAPI.get<Post[]>('/posts');
        return response.data;
    }
);

export const fetchPostById = createAsyncThunk<Post, string>(
    'posts/fetchPostById',
    async (post_id) => {
        const response = await axiosAPI.get<Post>('/posts/' + post_id);
        return response.data || null;
    }
);


export const createPost = createAsyncThunk<void, PostMutation>(
    'posts/createPost',
    async (postToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(postToAdd) as (keyof PostMutation)[];

        keys.forEach(key => {
            const value = postToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/posts', formData);
    }
);

export const deletePost = createAsyncThunk(
    'posts/delete',
    async (id: string) => {
        await axios.delete(`/posts/${id}`);
        return id;
    }
);