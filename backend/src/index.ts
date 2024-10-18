import express from "express";
import cors from "cors";
import trackerRouter from "./Routes/tracker";
import userRouter from "./Routes/user";
import auth from "./Routes/auth";
import log from "./logger";

const app = express();
const port = (process.env.PORT && parseInt(process.env.PORT.trim())) || 8080;

const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(trackerRouter);
app.use(userRouter);
app.use(auth);

app.listen(port, () => {
    log.info(`The server is running on ${port}`);
});

export default app;