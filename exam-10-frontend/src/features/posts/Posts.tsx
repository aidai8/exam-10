import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {usePostsStore} from "./postsStore.ts";
import PostItem from "./components/PostItem/PostItem.tsx";


const Posts = () => {
    const {items, fetchLoading, fetchAllPosts, deletePost} = usePostsStore();


    useEffect(() => {
        void fetchAllPosts();
    }, [fetchAllPosts])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Posts
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/posts/new'>
                        Add post
                    </Button>
                </Grid>
            </Grid>
            {fetchLoading ? <Spinner /> :
                <>
                    {items.length === 0 ? <Typography variant='h4'>No posts yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {items.map(post => (
                                <PostItem
                                    key={post.id}
                                    title={post.title}
                                    description={post.description}
                                    id={post.id}
                                    image={post.image || undefined}
                                    created_at={post.created_at || ''}
                                    onDelete={deletePost}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Posts;