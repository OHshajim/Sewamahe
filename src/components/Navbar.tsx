import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token")
    
    const isActive = (path: string) => location.pathname === path;

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
        token
            ? { name: "Dashboard", path: "/dashboard" }
            : { name: "Login", path: "/login" },
    ];

    return (
        <nav className="flex justify-between items-center bg-white px-6 py-1 shadow-md relative z-50">
            {/* Logo */}
            <Link to="/">
                <img
                    src="/favicon.ico"
                    alt="Logo"
                    className="w-20 h-auto cursor-pointer transition-transform duration-300 hover:scale-105"
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
                {links.map((l) => (
                    <Link
                        key={l.name}
                        to={l.path}
                        className={`relative font-medium transition-all duration-300 ${
                            isActive(l.path)
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                        } group`}
                    >
                        {l.name}
                        {/* underline hover effect */}
                        <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                ))}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
                <button
                    className="text-2xl text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-20 right-0 max-h-min bg-white w-64 flex flex-col gap-4 px-6 py-6 shadow-lg transform transition-transform duration-300 md:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >

                {links.map((l) => (
                    <Link
                        key={l.name}
                        to={l.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative font-medium transition-all duration-300 ${
                            isActive(l.path)
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                        } group`}
                    >
                        {l.name}
                        <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
