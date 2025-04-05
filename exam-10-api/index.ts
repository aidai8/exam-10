import express from "express";
import cors from "cors";
import postRouter from "./routers/posts";
import mysqlDb from "./mysqlDb";
import commentRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(console.error);

