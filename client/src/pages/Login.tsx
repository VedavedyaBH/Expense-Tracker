import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Transitions from "../components/Transitions";
import Footer from "../components/Footer";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response?.data.user)
                );
                localStorage.setItem(
                    "token",
                    JSON.stringify(response?.data.accessToken)
                );
                navigate("/");
            }
        } catch (err: any) {
            setError(err.response?.data || "Login failed");
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
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
                    <Button
                        bg={"black"}
                        label="Sign Up"
                        onClick={() => navigate("/signup")}
                    />
                </div>

                <div className="flex px-4 lg:px-0 justify-center items-center h-screen">
                    <div
                        className="border-stone-700 border rounded-xl p-12 h-max w-full max-w-xl 
                    transition duration-300 ease-in-out"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center text-2xl md:text-4xl font-bold pb-6 space-x-4">
                                Log In
                                <span></span>
                                <div className="text-left text-xs m-auto font-light bg-stone-900 p-2 rounded-2xl">
                                    Ex-
                                    <span className="italic font-bold tracking-wider">
                                        Tracker
                                    </span>
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500">{error}</div>
                            )}
                            <div className="py-2">
                                <InputBox
                                    placeholder={"Email"}
                                    value={email}
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div className="py-2">
                                <InputBox
                                    placeholder={"Password"}
                                    type="password"
                                    value={password}
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="py-2">
                                <Button
                                    bg={"white"}
                                    label={"Log In"}
                                    onClick={handleLogin}
                                />
                                <div>
                                    <button
                                        className="underline text-xs text-right pt-4"
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot password ?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </Transitions>
        </>
    );
}

export default Login;
