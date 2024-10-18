import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Secret";

export function signAccessToken(id: string) {
    const SignUpJWT = jwt.sign(id, JWT_SECRET, {
        expiresIn: "10h",
    });
    return SignUpJWT;
}
