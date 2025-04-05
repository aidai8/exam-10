import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import NotFoundPic from '../../assets/images/notFoundPic.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";
import {fetchPostById, deletePost} from "./postsThunks.ts";
import {selectOnePost, selectPostsLoading} from "./postsSlice.ts";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "../comments/Comments.tsx";

const FullPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const post = useAppSelector(selectOnePost);
    const fetchLoading = useAppSelector(selectPostsLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
    }, [id, dispatch]);

    const onDelete = useCallback(async () => {
        if (id && window.confirm('Are you sure you want to delete this post?')) {
            try {
                await dispatch(deletePost(id)).unwrap();
                navigate('/');
            } catch (e) {
                console.error(e);
            }
        }
    }, [id, dispatch, navigate]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && post ?
                <Card sx={{ width: "50%", margin: "0 auto" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={post?.image ? apiUrl + '/' + post.image : NotFoundPic}
                            alt={post.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <strong>{post.title}</strong>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {post.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Date: {post.created_at ? (
                                dayjs(post.created_at).isToday()
                                    ? `Today at ${dayjs(post.created_at).format('HH:mm')}`
                                    : dayjs(post.created_at).format('D MMMM YYYY, HH:mm')
                            ) : 'Unknown'}
                            </Typography>
                        </CardContent>
                        <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 16px 16px'}}>
                            <IconButton component={NavLink} to='/'>
                                <ArrowBackIcon sx={{fontSize: "14px"}}/>
                                <Typography variant="body2" sx={{color: 'text.secondary', fontSize: "10px", ml: 1}}>
                                    Go back home
                                </Typography>
                            </IconButton>
                            <IconButton onClick={onDelete} color="error">
                                <DeleteIcon/>
                                <Typography variant="body2" sx={{color: 'error.main', fontSize: "10px", ml: 1}}>
                                    Delete post
                                </Typography>
                            </IconButton>
                        </div>
                    </CardActionArea>
                    {!fetchLoading && post && (
                        <Comments post_id={Number(post.id)} />
                    )}
                </Card>
                :
                <Typography variant="h6">Not found post</Typography>
            }
        </Container>
    );
};

export default FullPost;
