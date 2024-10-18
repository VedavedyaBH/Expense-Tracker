import { Request, Response, NextFunction } from "express";
import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./logger";
import crypto from "crypto";
import bcrypt from "bcrypt";

exports.use =
    (fn: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const smtp = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
};

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass },
});

export async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "Error sending email");
            return;
        }

        log.info(`Email sent`);
    });
}

export function randomEightLetters(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 8; i++) {
        const randomIndex = crypto.randomInt(0, charactersLength);
        result += characters[randomIndex];
    }

    return result;
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(hashedPassword: string, password: string) {
    return await bcrypt.compare(password, hashedPassword);
}
