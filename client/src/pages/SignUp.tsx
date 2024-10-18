import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Transitions from "../components/Transitions";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        nickname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const navigate = useNavigate();

    const handleSignUp = async () => {
        setErrors({
            nickname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        });
        try {
            if (!email || !password || !passwordConfirmation || !nickname) {
                throw new Error("Please fill all the required values");
            }

            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/register`,
                {
                    email,
                    password,
                    passwordConfirmation,
                    nickname,
                }
            );

            if (response.status === 201) {
                alert("Signed Up!");
                console.log(response.data);
                navigate(`/verify/${response.data.id}`);
                console.log("SignUp successful:", response.data);
            }
        } catch (err: any) {
            const apiErrors = err.response?.data?.errors || [];
            const newErrors: any = {
                nickname: "",
                email: "",
                password: "",
                passwordConfirmation: "",
            };

            if (Array.isArray(apiErrors)) {
                apiErrors.forEach((error: any) => {
                    if (typeof error === "string") {
                        const [field, message] = error.split(": ");
                        newErrors[field] = message;
                    } else if (
                        typeof error === "object" &&
                        error.path &&
                        error.message
                    ) {
                        newErrors[error.path[0]] = error.message;
                    }
                });
            } else if (typeof apiErrors === "object") {
                Object.keys(apiErrors).forEach((key) => {
                    newErrors[key] = apiErrors[key];
                });
            }

            setErrors(newErrors);

            if (
                newErrors.nickname === "" &&
                newErrors.email === "" &&
                newErrors.password === "" &&
                newErrors.passwordConfirmation === ""
            ) {
                setErrors({ ...newErrors, general: err.message });
            }
        }
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
                        label="Log In"
                        onClick={() => navigate("/login")}
                    />
                </div>
                <div className="flex px-4 lg:px-0 justify-center items-center h-screen">
                    <div
                        className="rounded-xl p-16 lg:p-12 border border-stone-700 h-max w-full max-w-xl 
            transition duration-300 ease-in-out "
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center text-2xl md:text-4xl lg:text-4xl font-bold pb-6 space-x-4">
                                <span>Track</span>
                                <span className="font-extralight">|</span>
                                <span>Save</span>
                                <span className="font-extralight">|</span>
                                <span>Earn</span>
                                <div className="text-left text-xs m-auto font-light bg-stone-900 p-2 rounded-2xl">
                                    Ex-
                                    <span className="italic font-bold tracking-wider">
                                        Tracker
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4 text-gray-400">
                                Begin your Journey by signing up!
                            </div>
                            {errors.general && (
                                <div className="text-red-500">
                                    {errors.general}
                                </div>
                            )}
                            {errors.nickname && (
                                <div className="text-red-500">
                                    {errors.nickname}
                                </div>
                            )}{" "}
                            <div className="py-2">
                                <InputBox
                                    placeholder={"Nickname"}
                                    value={nickname}
                                    onChange={(e: any) =>
                                        setNickname(e.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
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
                            {errors.password && (
                                <div className="text-red-500">
                                    {errors.password}
                                </div>
                            )}{" "}
                            <div className="py-2">
                                <InputBox
                                    type="password"
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            {errors.passwordConfirmation && (
                                <div className="text-red-500">
                                    {errors.passwordConfirmation}
                                </div>
                            )}{" "}
                            <div className="py-2">
                                <InputBox
                                    type="password"
                                    placeholder={"Confirm Password"}
                                    value={passwordConfirmation}
                                    onChange={(e: any) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="py-2">
                                <Button
                                    onClick={handleSignUp}
                                    bg={"white"}
                                    label={"Sign Up"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Transitions>
        </>
    );
}

export default SignUp;
