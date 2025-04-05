import {create} from "zustand/react";
import axiosAPI from "../../axiosApi.ts";
import {Post} from "../../types";

interface PostsState {
    items: Post[];
    item: Post | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllPosts: () => Promise<void>;
    fetchPostById: (post_id: string) => Promise<void>;
}


export const usePostsStore = create<PostsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
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
    }
}))