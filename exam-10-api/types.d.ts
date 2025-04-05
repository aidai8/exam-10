export interface Post {
    id: string;
    title: string;
    description: string;
    image: string | null;
    created_at?: string;
}

export type PostWithoutId = Omit<Post, 'id'>;

export interface Comment {
    id: string;
    post_id: string;
    author: string;
    text: string;
}