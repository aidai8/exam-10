import {create} from "zustand/react";
import axiosAPI from "../../axiosApi.ts";
import {Post, PostMutation} from "../../types";
import axios from "axios";
import {apiUrl} from "../../../globalConstants.ts";

interface PostsState {
    items: Post[];
    item: Post | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllPosts: () => Promise<void>;
    fetchPostById: (post_id: string) => Promise<void>;
    createPost: (postData: PostMutation) => Promise<void>;
    deletePost: (post_id: string) => Promise<void>;
}


export const usePostsStore = create<PostsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,

    createPost: async (postData: PostMutation) => {
        set({ createLoading: true });
        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("description", postData.description);

            if (postData.image) {
                formData.append("image", postData.image);
            }

            const response = await axiosAPI.post<Post>("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            set((state) => ({
                items: [...state.items, response.data],
            }));
        } catch (e) {
            console.error("Failed to create post:", e);
            throw e;
        } finally {
            set({ createLoading: false });
        }
    },

    fetchAllPosts: async () => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Post[]>('/posts');
            set({items: response.data || []});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    },
    fetchPostById: async (post_id: string) => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Post | null>('/posts/' + post_id);
            set({item: response.data || null});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    },

    deletePost: async (id: string) => {
        try {
            await axios.delete(`${apiUrl}/posts/${id}`);
            set((state) => ({
                items: state.items.filter((post) => post.id !== id),
            }));
        } catch (e) {
            console.error("Failed to delete post:", e);
        }
    },
}));