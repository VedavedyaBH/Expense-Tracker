import { CreateSessionInput } from "../schema/auth";
import { Request, Response } from "express";
import { findUserByEmail } from "../services/user";
import { verifyPassword } from "../util";
import { signAccessToken } from "../services/auth";

export async function loginHandler(
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) {
    const message = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(500).send(message);
    }

    if (!user.verified) {
        return res.status(500).send("Please verify your email");
    }

    const isValid = await verifyPassword(user.password, password);
    if (!isValid) {
        return res.status(500).send(message);
    }

    const accessToken = signAccessToken(user);
    return res.status(200).send({ user, accessToken });
}
