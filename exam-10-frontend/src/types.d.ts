export interface Post {
    id: string;
    title: string;
    description: string;
    image: string | null;
    created_at?: string;
}

export interface Comment {
    id: string;
    post_id: number;
    author: string;
    text: string;
}

export interface PostMutation {
    title: string;
    description: string;
    image: File | string | null;
}

export interface CommentMutation {
    post_id: number;
    author: string;
    text: string;
}