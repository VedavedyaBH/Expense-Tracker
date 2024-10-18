import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import Transitions from "../components/Transitions";
import Footer from "../components/Footer";

interface ForgotPasswordResponse {
    message: string;
}

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [passwordResetCode, setpasswordResetCode] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [resetCodeExists, setResetCodeExists] = useState<Boolean>(false);
    const [user, setuser] = useState<any>();

    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post<ForgotPasswordResponse>(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/forgotpassword`,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setResetCodeExists(true);
                setuser(response.data);

                setMessage("Password reset code sent to your email.");
            }
        } catch (err: any) {
            setError(
                err.response?.data || "Failed to send password reset code."
            );
        }
    };

    const handleResetPassword = async () => {
        try {
            console.log(passwordResetCode);
            console.log(password);
            console.log(user.id);

            const id = user.id;
            const response = await axios.put<ForgotPasswordResponse>(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/${id}/${passwordResetCode}`,
                {
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setMessage("Password reset successfully.");
                setResetCodeExists(false);
                navigate("/login");
            }
        } catch (err: any) {
            console.log(err.response);
            setError(err.response?.data || "Failed to reset password.");
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <div className="p-4 absolute top-0 left-0 m-4 text-xl">
                Ex-
                <span className="italic font-bold tracking-wider">Tracker</span>
                <svg width="150" height="20">
                    <path
                        d="M30 20 Q 20 1, 130 20 T 270 20"
                        stroke="white"
                        strokeWidth={1}
                        fill="none"
                        style={{ strokeLinecap: "round" }}
                    />
                </svg>
            </div>
            <Transitions>
                <div className="absolute top-0 right-0 m-4 p-4">
                    <Button bg={"black"} label="Login" onClick={handleLogin} />
                </div>
                <div className="flex px-4 lg:px-0 justify-center items-center h-screen">
                    {" "}
                    <div className="border-stone-700 border rounded-xl p-12 w-full max-w-md transition duration-300 ease-in-out">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-4xl font-bold pb-6">
                                Forgot Password ?
                            </h2>
                            {message && (
                                <div className="text-green-500">{message}</div>
                            )}
                            {error && (
                                <div className="text-red-500">{error}</div>
                            )}
                            <div className="py-2">
                                <InputBox
                                    placeholder={"Enter your email to reset"}
                                    value={email}
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                            {resetCodeExists && (
                                <>
                                    <div className="py-2">
                                        <InputBox
                                            placeholder={"Reset code"}
                                            value={passwordResetCode}
                                            onChange={(e: any) =>
                                                setpasswordResetCode(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="py-2">
                                        <InputBox
                                            placeholder={"New password"}
                                            type="password"
                                            value={password}
                                            onChange={(e: any) =>
                                                setpassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            <Button
                                bg={"white"}
                                label={"Reset Password"}
                                onClick={
                                    !resetCodeExists
                                        ? handleForgotPassword
                                        : handleResetPassword
                                }
                            />
                        </div>
                    </div>
                </div>{" "}
                <Footer></Footer>
            </Transitions>
        </>
    );
}

export default ForgotPassword;
