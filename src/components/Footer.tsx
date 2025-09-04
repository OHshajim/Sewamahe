import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";

const Footer = ()=> {
    return (
        <div className="bg-[#0a1327]">
            <footer className="w-11/12 mx-auto text-[#e0e1dd] flex flex-wrap justify-between gap-8 py-10 px-6">
                {/* Brand Section */}
                <div className="max-w-xs flex flex-col items-start md:items-start text-left">
                    <img
                        src="/logo.png"
                        alt="Sawamahe Logo"
                        className="w-16 mb-2"
                    />
                    <p className="text-xl font-bold text-[#4f85d6] mb-2">
                        Sawamahe
                    </p>
                    <p className="text-sm opacity-85 leading-relaxed">
                        Tara Tower, Polytechnic Crossing, Jaunpur (UP) 222002
                        <br />
                        +91-8299065387
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <a
                            href="#"
                            className="text-xl hover:text-[#4f85d6] transition-transform transform hover:scale-110"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-[#4f85d6] transition-transform transform hover:scale-110"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-[#4f85d6] transition-transform transform hover:scale-110"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-[#4f85d6] transition-transform transform hover:scale-110"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Services */}
                <div className="flex flex-col min-w-[180px]">
                    <h6 className="text-lg font-bold text-[#4f85d6] mb-3">
                        Services
                    </h6>
                    <Link
                        to=""
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        We build Branded Android App for You.
                    </Link>
                    <Link
                        to=""
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        We provide Complete solution for corporate
                    </Link>
                </div>

                {/* Navigate */}
                <div className="flex flex-col min-w-[180px]">
                    <h6 className="text-lg font-bold text-[#4f85d6] mb-3">
                        Navigate
                    </h6>
                    <Link
                        to="/about"
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        About us
                    </Link>
                    <Link
                        to="/contact"
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        Contact us
                    </Link>
                    <Link
                        to="/privacy"
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/terms"
                        className="mb-1 hover:text-[#6fa5f0] transition-colors"
                    >
                        Terms of use
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
