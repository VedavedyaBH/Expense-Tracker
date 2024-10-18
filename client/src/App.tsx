import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp"; // Assuming you have this page
import { AnimatePresence } from "framer-motion";
import VerifyAccount from "./pages/VerifyAccount";
import { UserContextProvider } from "./context/userContex";
import Home from "./pages/Home";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Suggestions from "./components/Suggestions";
import SavingsInfo from "./components/SavingsInfo";
import MajorExpense from "./components/MajorExpense";

function App() {
    return (
        <UserContextProvider>
            <AnimatePresence>
                <Router>
                    <Routes>
                        <Route path="/verify/:id" element={<VerifyAccount />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/home"
                            element={
                                <div className="lg:flex justify-between p-4 lg:p-16">
                                    <Header />
                                    <div>
                                        <div className="my-8">
                                            <Overview />
                                        </div>
                                        <div className="lg:flex lg:justify-between">
                                            <Suggestions />
                                            <div className="flex flex-col items-center lg:block">
                                                <SavingsInfo />
                                                <div className="mt-4">
                                                    <MajorExpense />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </Routes>
                </Router>
            </AnimatePresence>
        </UserContextProvider>
    );
}

export default App;
