import { object, string, TypeOf } from "zod";

import { z } from "zod";

export const createUserSchema = z.object({
    nickname: z.string().min(3),
    password: z
        .string()
        .min(6, "Password is too short - should be at least 6 characters")
        .min(1),
    passwordConfirmation: z.string().min(1),
    email: z.string().email("Not a valid email").min(1),
});

export const verifyEmailSchema = object({
    params: object({
        id: string(),
        verificationCode: string(),
    }),
});

export type VerifyEmaiInput = TypeOf<typeof verifyEmailSchema>["params"];

export const forgotPasswordSchema = object({
    body: object({
        email: string().email("Not a valid email"),
    }),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string(),
    }),
    body: object({
        password: string({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
