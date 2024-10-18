import {
    createUserSchema,
    ForgotPasswordInput,
    ResetPasswordInput,
    VerifyEmaiInput,
} from "../schema/user";
import {
    createUser,
    findUserByEmail,
    findUserById,
    findUserUtilById,
    resetPassword,
    setForgotPasswordCode,
    verifyUser,
} from "../services/user";
import { Request, Response } from "express";
import { sendEmail } from "../util";
import log from "../logger";

export async function register(req: Request, res: Response) {
    const body = req.body;
    try {
        const validatedBody = createUserSchema.parse(req.body);

        const user = await createUser(validatedBody);
        await sendEmail({
            to: user.email,
            from: "test@example.com",
            subject: "Verification Code | Expense tracker",
            text: `Use the below code to verify your email address:
            Verification Code: ${user.UserUtil.verificationCode}`,
        });

        res.status(201).send(user);
    } catch (error: any) {
        console.log(error.errors);

        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        log.error(error);
        res.status(500).send(error.message || "Something went wrong");
    }
}

export async function verify(req: Request<VerifyEmaiInput>, res: Response) {
    const { id, verificationCode } = req.params;
    try {
        const user = await findUserById(id);

        if (!user) {
            return res.send("Could not verify user");
        }

        if (user.verified) {
            return res.send("User is already verified");
        }
        const userUtil = await findUserUtilById(id);

        if (userUtil.verificationCode === verificationCode) {
            await verifyUser(id);
            return res.status(200).send("User successfully verified");
        }
        throw new Error("Enter valid code");
    } catch (error: any) {
        log.error(error);
        res.status(500).send(error.message || "Something went wrong");
    }
}

export async function forgotPassword(
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response
) {
    const { email } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (user === null) {
            return res.status(500).send("User does not exist");
        }
        if (!user.verified) {
            return res.send("User is not verified");
        }
        const code = await setForgotPasswordCode(email);
        await sendEmail({
            to: user.email,
            from: "test@example.com",
            subject: "password reset Code | Expense tracker",
            text: `Use the below code to reset your password:
            Reset Code: ${code}`,
        });
        return res.status(200).send(user);
    } catch (error: any) {
        log.error(error);
        res.status(500).send(error.message || "Something went wrong");
    }
}

export async function resetPasswordHandler(
    req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
    res: Response
) {
    const { id, passwordResetCode } = req.params;

    try {
        const { password } = req.body;
        const user = await findUserById(id);

        if (!user) {
            return res.status(400).send("User not Found");
        }

        const userUtil = await findUserUtilById(user.id);

        if (
            !userUtil.resetPasswordCode ||
            userUtil.resetPasswordCode !== passwordResetCode
        ) {
            return res.status(400).send("could not reset the password");
        }

        await resetPassword(id, passwordResetCode, password);
        sendEmail({
            to: user.email,
            from: "test@example.com",
            subject: "Password reset | Expense tracker",
            text: `Password is reset successfully`,
        });
        return res.send("Password is reset successfully").status(200);
    } catch (error: any) {
        log.error(error);
        res.status(500).send(error.message || "Something went wrong");
    }
}

export async function redisTest(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        return res.status(200).send(user);
    } catch (error: any) {
        log.error(error);
        res.status(500).send(error.message || "Something went wrong");
    }
}
