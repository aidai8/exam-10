import express from 'express';
import mysqlDb from "../mysqlDb";
import {Post, PostWithoutId} from "../types";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM posts');
    const posts = result as Post[];
    res.send(posts);
});

postRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
    const post = result as Post[];
    res.send(post[0]);
});

postRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400).send({error: 'Please enter a title and description'});
        return;
    }

    const newPost: PostWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    };

    const connection = await mysqlDb.getConnection();
    const [result]  = await connection.query(
        'INSERT INTO posts (title, description, images) VALUES (?, ?, ?)',
        [newPost.title, newPost.description, newPost.image],
    );

    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [onePost] = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
    const post = onePost as Post[];
    res.send(post[0]);
});

export default postRouter;