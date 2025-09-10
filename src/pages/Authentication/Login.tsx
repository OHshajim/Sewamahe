import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Div100vh from "react-div-100vh";
import { FaLock, FaUser, FaPencilAlt, FaEnvelope } from "react-icons/fa";

import Credits from "./components/Credits";
import Logo from "./components/Logo";
import Input from "./components/Input";

import configuration from "@/config/configuration";
import AuthNav from "./components/AuthNav";
import backgroundImage from "../../assets/background.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { login, register, setAuthToken } from "@/actions/auth";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useDispatch";

function Login() {
    const dispatch = useAppDispatch();
    const { addToast } = useToasts();
    const navigate = useNavigate();

    // --- Login state ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keep, setKeep] = useState(true);
    const [loginErrors, setLoginErrors] = useState({});

    // --- Register state ---
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerUserType, setRegisterUserType] = useState("user");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
    const [registerErrors, setRegisterErrors] = useState({});

    // Toggle forms
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (window.self !== window.top) {
            addToast(
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.top.location.href = configuration.url;
                    }}
                >
                    <b>
                        Click here to remove the Envato frame or meetings will
                        not work properly.
                    </b>
                </a>,
                { appearance: "warning", autoDismiss: false }
            );
        }
    }, []);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);

            // Save JWT in localStorage if "keep me logged in"
            if (keep) localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user) // or decode JWT if needed
            );
            dispatch(
                setCredentials({ token: res.data.token, user: res.data.user })
            );

            setAuthToken(res.data.token); // set default header

            addToast("Login successful!", { appearance: "success" });
            setLoginErrors({});
            navigate("/dashboard"); // redirect to dashboard or home page
        } catch (err) {
            setLoginErrors(err.response?.data || { general: "Login failed" });
            addToast("Login failed!", { appearance: "error" });
        }
    };

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            const reg = await register({
                username: registerUsername,
                email: registerEmail,
                firstName: registerFirstName,
                lastName: registerLastName,
                type: registerUserType,
                password: registerPassword,
                repeatPassword: registerRepeatPassword,
            });
            
            const res = await login(registerEmail, registerPassword);

            if (keep) localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
            setAuthToken(res.data.token);

            addToast("Registration successful!", { appearance: "success" });
            setRegisterErrors({});
            navigate("/dashboard");

        } catch (err) {
            setRegisterErrors(
                err.response?.data || { general: "Registration failed" }
            );
            addToast("Registration failed!", { appearance: "error" });
        }
    };

    const loginInfo = Object.keys(loginErrors).map((key) => (
        <div className="text-center text-red-500 text-sm" key={key}>
            {loginErrors[key]}
        </div>
    ));

    const registerInfo = Object.keys(registerErrors).map((key) => (
        <div className="text-center text-red-500 text-sm" key={key}>
            {registerErrors[key]}
        </div>
    ));

    return (
        <Div100vh>
            <AuthNav />
            <div
                className="w-screen h-full relative flex items-center justify-center bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-blue-900/65 transition-colors duration-500" />
                <Credits />

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4">
                    <Logo />

                    {/* Forms */}
                    <div className="transition-all duration-500 max-w-[300px] w-full mx-auto">
                        {step == 1 && (
                            <form
                                onSubmit={onLogin}
                                className="w-full space-y-4  transition-all duration-500"
                            >   
                                <p>
                                    {loginInfo}
                                </p>

                                <Input
                                    icon={<FaUser />}
                                    placeholder="Username or email"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    icon={<FaLock />}
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={keep}
                                        onChange={(e) =>
                                            setKeep(e.target.checked)
                                        }
                                        className="w-4 h-4 rounded transition-all"
                                    />
                                    <span>Keep me logged in</span>
                                </label>

                                <button className="w-full py-1.5 rounded-full bg-white text-black hover:bg-gray-200 active:scale-95 transition-all">
                                    LOG IN
                                </button>

                                <div className="text-center mt-2 flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        Need an account? Register now!
                                    </button>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </form>
                        )}
                        {step == 2 && (
                            <form
                                onSubmit={onRegister}
                                className="w-full space-y-4 transition-all duration-500"
                            >
                                <p className="flex flex-wrap">
                                    {registerInfo}
                                </p>
                                <Input
                                    icon={<FaUser />}
                                    placeholder="Username"
                                    type="text"
                                    onChange={(e) =>
                                        setRegisterUsername(e.target.value)
                                    }
                                />
                                <Input
                                    icon={<FaEnvelope />}
                                    placeholder="Email"
                                    type="email"
                                    onChange={(e) =>
                                        setRegisterEmail(e.target.value)
                                    }
                                />
                                <Input
                                    icon={<FaPencilAlt />}
                                    placeholder="First Name"
                                    type="text"
                                    onChange={(e) =>
                                        setRegisterFirstName(e.target.value)
                                    }
                                />
                                <Input
                                    icon={<FaPencilAlt />}
                                    placeholder="Last Name"
                                    type="text"
                                    onChange={(e) =>
                                        setRegisterLastName(e.target.value)
                                    }
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setRegisterUserType(value)
                                    }
                                    defaultValue="User"
                                >
                                    <SelectTrigger className="w-full rounded-full border border-gray-400 bg-transparent text-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-300">
                                        <SelectValue placeholder="Select user type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="User">
                                            User
                                        </SelectItem>
                                        <SelectItem value="Consultant">
                                            Consultant
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    icon={<FaLock />}
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) =>
                                        setRegisterPassword(e.target.value)
                                    }
                                />
                                <Input
                                    icon={<FaLock />}
                                    placeholder="Repeat Password"
                                    type="password"
                                    onChange={(e) =>
                                        setRegisterRepeatPassword(
                                            e.target.value
                                        )
                                    }
                                />
                                <button className="w-full py-1.5 rounded-full bg-white text-black hover:bg-gray-200 active:scale-95 transition-all">
                                    Register
                                </button>

                                <div className="text-center mt-2 flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        Back to login
                                    </button>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Div100vh>
    );
}

export default Login;
