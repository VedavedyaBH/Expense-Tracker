import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useNavigate, useParams } from "react-router-dom";
import Transitions from "../components/Transitions";
import Footer from "../components/Footer";

interface VerifyAccountResponse {
    message: string;
}

function VerifyAccount() {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();
    const { id } = useParams();

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post<VerifyAccountResponse>(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/verify/${id}/${verificationCode}`
            );
            if (response.status === 200) {
                setMessage("Account verified successfully.");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (err: any) {
            setError(err.response?.data || "Failed to verify account.");
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
                        label="Login"
                        onClick={() => navigate("/login")}
                    />
                </div>
                <div className="flex px-4 lg:px-0 justify-center items-center h-screen">
                    <div className="border-stone-700 border rounded-xl p-12 w-full max-w-md transition duration-300 ease-in-out">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-4xl font-bold pb-6">
                                Verify Your Account
                            </h2>
                            {message && (
                                <div className="text-green-500">{message}</div>
                            )}
                            {error && (
                                <div className="text-red-500">{error}</div>
                            )}
                            <div className="py-2">
                                <InputBox
                                    placeholder={"Enter verification code"}
                                    value={verificationCode}
                                    onChange={(e: any) =>
                                        setVerificationCode(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                bg={"white"}
                                label={"Verify Account"}
                                onClick={handleVerifyCode}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </Transitions>
        </>
    );
}

export default VerifyAccount;
