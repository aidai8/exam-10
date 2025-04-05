import express from 'express';
import mysqlDb from "../mysqlDb";
import {Comment} from "../types";

const commentRouter = express.Router();


commentRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM comments');
        const comments = result as Comment[];
        res.send(comments);
    } catch (e) {
        next(e);
    }

});

export default commentRouter;