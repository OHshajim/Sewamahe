import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    // Login state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keep, setKeep] = useState(true);
    const [loginErrors, setLoginErrors] = useState({});

    // Register state
    const [activeForm, setActiveForm] = useState<"login" | "register">("login");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerUserType, setRegisterUserType] = useState("user");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
    const [registerErrors, setRegisterErrors] = useState({});

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(e.target);
        
    };

    const onRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 p-4">
            {/* <Toaster position="top-right" /> */}
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    {activeForm === "login" ? "Login" : "Register"}
                </h2>

                {activeForm === "login" ? (
                    <form onSubmit={onLogin} className="flex flex-col gap-4">
                        {loginErrors.generic && (
                            <p className="text-red-500 text-center">
                                {loginErrors.generic}
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <label className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                checked={keep}
                                onChange={(e) => setKeep(e.target.checked)}
                                className="accent-blue-600"
                            />
                            Keep me logged in
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            Need an account?{" "}
                            <button
                                type="button"
                                className="text-blue-600 font-medium hover:underline"
                                onClick={() => setActiveForm("register")}
                            >
                                Register
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={onRegister} className="flex flex-col gap-4">
                        {registerErrors.generic && (
                            <p className="text-red-500 text-center">
                                {registerErrors.generic}
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerUsername}
                            onChange={(e) =>
                                setRegisterUsername(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={registerFirstName}
                            onChange={(e) =>
                                setRegisterFirstName(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={registerLastName}
                            onChange={(e) =>
                                setRegisterLastName(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <select
                            value={registerUserType}
                            onChange={(e) =>
                                setRegisterUserType(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="user">User</option>
                            <option value="consultant">Consultant</option>
                        </select>
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) =>
                                setRegisterPassword(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            value={registerRepeatPassword}
                            onChange={(e) =>
                                setRegisterRepeatPassword(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-blue-600 font-medium hover:underline"
                                onClick={() => setActiveForm("login")}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
