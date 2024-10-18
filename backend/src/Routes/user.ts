import express from "express";

import {
    forgotPassword,
    redisTest,
    register,
    resetPasswordHandler,
    verify,
} from "../Controllers/user";
const use = require("../util.ts").use;
const userRouter = express.Router();

userRouter.get("/api/check", async (req, res) => {
    res.send("Hii");
});
userRouter.post("/api/v1/register", use(register));
userRouter.get("/api/v1/:id", use(redisTest));
userRouter.post("/api/v1/verify/:id/:verificationCode", use(verify));
userRouter.post("/api/v1/forgotPassword", use(forgotPassword));
userRouter.put("/api/v1/:id/:passwordResetCode", use(resetPasswordHandler));

export default userRouter;
