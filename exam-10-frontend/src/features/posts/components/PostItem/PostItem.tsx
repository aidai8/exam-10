import Grid from "@mui/material/Grid2";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import {apiUrl} from "../../../../../globalConstants.ts";
import NotFoundPic from "../../../../assets/images/notFoundPic.jpg";
import React from "react";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import DeleteIcon from "@mui/icons-material/Delete";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

interface Props {
    title: string;
    description: string;
    id: string;
    image: string | undefined;
    created_at: string;
    onDelete: (id: string) => void;
}

const PostItem: React.FC<Props> = ({title, id, image, created_at, onDelete}) => {
    let cameraImage = NotFoundPic;

    if (image) {
        cameraImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cameraImage}
                    alt={title}
                />
                <CardHeader title={title} />

                <CardContent>
                    <strong>
                        Date: {created_at ? (
                        dayjs(created_at).isToday()
                            ? `Today at ${dayjs(created_at).format('HH:mm')}`
                            : dayjs(created_at).format('D MMMM YYYY, HH:mm')
                    ) : 'Unknown'}
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/posts/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                    <IconButton onClick={() => onDelete(id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PostItem;