const { PrismaClient } = require("@prisma/client");
import type { User } from "@prisma/client";
import { hashPassword, randomEightLetters } from "../util";
import { createClient } from "redis";

const prisma = new PrismaClient();
const redisClient = createClient();

redisClient.connect();

export async function createUser(user: Partial<User>) {
    try {
        const verificationCode = randomEightLetters();
        let hashedPassword;

        if (user.password) {
            hashedPassword = await hashPassword(user.password);
        }

        return await prisma.user.create({
            data: {
                nickname: user.nickname,
                password: hashedPassword,
                email: user.email,
                UserUtil: {
                    create: {
                        verificationCode,
                    },
                },
            },
            include: {
                UserUtil: true,
            },
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findUserById(id: string) {
    try {
        const cachedUser = await redisClient.get(id);

        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (user) {
            await redisClient.set(id, JSON.stringify(user));
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findUserUtilById(id: string) {
    try {
        const user = await prisma.userUtil.findUnique({
            where: {
                userid: Number(id),
            },
        });

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function verifyUser(id: string) {
    try {
        return await prisma.userUtil.update({
            where: {
                userid: Number(id),
            },
            data: {
                verificationCode: null,
                user: {
                    update: {
                        verified: true,
                    },
                },
            },
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findUserByEmail(email: string) {
    try {
        const cachedUser = await redisClient.get(email);
        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        await redisClient.set(email, JSON.stringify(user));

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function setForgotPasswordCode(email: string) {
    try {
        const forgotPasswordCode = randomEightLetters();

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            throw new Error("User not found.");
        }

        await prisma.userUtil.update({
            where: {
                userid: user.id,
            },
            data: {
                resetPasswordCode: forgotPasswordCode,
            },
        });

        return forgotPasswordCode;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function resetPassword(
    id: string,
    code: string,
    password: string
) {
    let hashedPassword;

    if (password) {
        hashedPassword = await hashPassword(password);
    }

    try {
        const userUtil = await prisma.userUtil.findFirst({
            where: {
                userid: Number(id),
                resetPasswordCode: code,
            },
        });

        if (!userUtil) {
            throw new Error("User not found or invalid reset code.");
        }

        return prisma.user.update({
            where: { id: userUtil.userid },
            data: {
                password: hashedPassword,
                UserUtil: {
                    update: {
                        resetPasswordCode: null,
                    },
                },
            },
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
