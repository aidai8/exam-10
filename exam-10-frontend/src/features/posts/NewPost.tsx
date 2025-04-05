import {Container, Typography} from "@mui/material";
import PostForm from "./components/PostForm/PostForm.tsx";
import {useNavigate} from "react-router-dom";
import {usePostsStore} from "./postsStore.ts";
import {PostMutation} from "../../types";

const NewPost = () => {
    const navigate = useNavigate();
    const {createPost} = usePostsStore();

    const onSubmitPost = async (postData: PostMutation) => {
        try {
            await createPost(postData);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{mb: 3}}>Add new post</Typography>
            <PostForm onSubmitPost={onSubmitPost} />
        </Container>
    );
};

export default NewPost;