import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Comment, CommentMutation} from "../../types";

export const fetchAllComments = createAsyncThunk<Comment[], void>(
    'comments/fetchAllComments',
    async () => {
        const response = await axiosAPI.get<Comment[]>('/comments');
        return response.data;
    }
);

export const createComment = createAsyncThunk<void, CommentMutation>(
    'comments/createComment',
    async (commentToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(commentToAdd) as (keyof CommentMutation)[];

        keys.forEach(key => {
            const value = commentToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/comments', formData);
    }
);