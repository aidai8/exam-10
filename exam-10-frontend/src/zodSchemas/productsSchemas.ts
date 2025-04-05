import {z} from "zod";

export const commentSchema = z.object({
    post_id: z.number().positive("Post ID must be positive"),
    author: z.string()
        .min(1, "Author name is required")
        .max(50, "Author name must be less than 50 characters"),
    text: z.string()
        .min(1, "Comment cannot be empty")
        .max(500, "Comment must be less than 500 characters")
});

export const postSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .regex(/^[A-Za-z0-9\s]*$/, 'Title must contain only English letters'),
    description: z.string().min(5, 'Description is required. The minimum symbols must be 5'),
    image: z.instanceof(File).nullable(),
});