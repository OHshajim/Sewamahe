import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Picture from "../../../components/Picture";
import { Ellipsis, Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const TopBar = ({ setShowSettings, showSettings, Logout, user, setIsHome }) => {
    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <div className="px-4 py-2 flex justify-between items-center h-14 w-full shadow-md">
            <Link to={"/dashboard"} className="relative">
                <>
                    <Picture size={40} user={user} />
                    <div className="w-3.5 h-3.5 rounded-full  bg-green-500 absolute -right-0.5 bottom-0 border-2 border-white" />
                </>
            </Link>
            <div className="flex">
                {/* Settings Button */}
                <Button
                    variant="ghost"
                    onClick={() => setIsHome(true)}
                    className="md:hidden"
                >
                    <Home className="scale-110" />
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setShowSettings(!showSettings)}
                    className=""
                >
                    <Settings
                        className={`scale-110 ${
                            showSettings ? "text-[#da7d02]" : ""
                        }`}
                    />
                </Button>

                {/* Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0">
                            <Ellipsis className="scale-110" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 ">
                        {links.map((l) => (
                            <Link key={l.name} to={l.path}>
                                <DropdownMenuItem className="text-xs">
                                    {l.name}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 text-xs"
                            onClick={() => Logout()}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TopBar;
