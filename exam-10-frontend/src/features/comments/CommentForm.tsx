import {Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {commentSchema} from "../../zodSchemas/productsSchemas.ts";

interface Props {
    post_id: number;
    onSubmitComment: (comment: { post_id: number; author: string; text: string }) => void;
}

const CommentForm: React.FC<Props> = ({ post_id, onSubmitComment }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            post_id,
            author: "",
            text: ""
        }
    });

    const onSubmit = (data: { post_id: number; author: string; text: string }) => {
        onSubmitComment(data);
        reset({ post_id, author: "", text: "" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Your Name"
                {...register("author")}
                error={!!errors.author}
                helperText={errors.author?.message}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                multiline
                rows={3}
                label="Your Comment"
                {...register("text")}
                error={!!errors.text}
                helperText={errors.text?.message}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Post Comment
            </Button>
        </form>
    );
};

export default CommentForm;