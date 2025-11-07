import { useState } from "react";
import Div100vh from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import Credits from "./components/Credits";
import Logo from "./components/Logo";
import Input from "./components/Input";
import backgroundImage from "../../assets/background.jpg";
import { FaLock, FaUser } from "react-icons/fa";
import { forgetPassword, sendCode } from "@/actions/auth";
import { toast } from "sonner";

const  ForgetPassword =()=> {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [password, setPassword] = useState("");
    const [codeErrors, setCodeErrors] = useState({});
    const [changeErrors, setChangeErrors] = useState({});
    const [sent, setSent] = useState(false);

    const onCode = async (e) => {
        e.preventDefault();
        try {
            await sendCode(email);
            setSent(true);
            setCodeErrors({});
        } catch (e) {
            const errors =
                !e.response || typeof e.response.data !== "object"
                    ? { generic: "Could not connect to server." }
                    : e.response.data;
            setCodeErrors(errors);
        }
    };

    const onChange = async (e) => {
        e.preventDefault();
        try {
            const { data } = await forgetPassword(email, authCode, password);
            console.log(data);
            
            navigate("/login", { replace: true });
            setSent(false);
            toast.success("Password changed! You may now sign in.");
            setChangeErrors({});
        } catch (e) {
            const errors =
                !e.response || typeof e.response.data !== "object"
                    ? { generic: "Could not connect to server." }
                    : e.response.data;
            setChangeErrors(errors);
        }
    };

    const codeInfo = Object.keys(codeErrors).map((key) => (
        <div className="text-center text-red-500 text-sm" key={key}>
            {codeErrors[key]}
        </div>
    ));

    const changeInfo = Object.keys(changeErrors).map((key) => (
        <div className="text-center text-red-500 text-sm" key={key}>
            {changeErrors[key]}
        </div>
    ));

    return (
        <Div100vh>
            <div
                className="w-screen h-full flex items-center justify-center relative text-white bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-blue-900/60"></div>

                <Credits />

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6 py-10 space-y-6">
                    <Logo />

                    {/* Send Code Form */}
                    <form
                        className={`${
                            sent ? "hidden" : "flex flex-col w-full space-y-4"
                        }`}
                        onSubmit={onCode}
                    >
                        {codeInfo}
                        <Input
                            icon={<FaUser />}
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="w-full py-1.5 rounded-full bg-white text-black hover:bg-gray-200 active:scale-95 transition-all">
                            Send Code
                        </button>
                    </form>

                    {/* Change Password Form */}
                    <form
                        className={`${
                            sent ? "flex flex-col w-full space-y-4" : "hidden"
                        }`}
                        onSubmit={onChange}
                    >
                        {changeInfo}
                        <Input
                            icon={<FaLock />}
                            placeholder="Auth Code"
                            type="text"
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                        <Input
                            icon={<FaLock />}
                            placeholder="New Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-300"
                        >
                            CHANGE PASSWORD
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-4">
                        <Link
                            to="/login"
                            className="text-sm text-blue-300 hover:text-white underline"
                        >
                            Back to Login
                        </Link>
                    </div>

                    {/* Credits Section */}
                    <div className="hidden text-center text-gray-300 text-sm mt-6 space-y-2">
                        <p>
                            Everyone has a sweet side. Everything can taste like
                            honey.
                        </p>
                        <p>
                            Special thanks to all contributors who made Sewamahe
                            possible.
                        </p>
                        <p>
                            This Login/Register page uses{" "}
                            <a
                                href="https://github.com/zzseba78/Kick-Off"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-400"
                            >
                                Kick-Off
                            </a>{" "}
                            by zzseba78
                        </p>
                        <p>
                            Background images from{" "}
                            <a
                                href="https://picsum.photos/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-400"
                            >
                                Picsum Photos
                            </a>
                        </p>
                        <p>
                            Thanks to all contributors to React, Redux,
                            Socket.IO, Emoji Mart, Axios, SASS, and Moment
                        </p>
                    </div>
                </div>
            </div>
        </Div100vh>
    );
}

export default ForgetPassword;
