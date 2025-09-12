import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Picture from "./Picture";
import { Ellipsis, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const DashboardNav = ({ setShowSettings, showSettings, Logout, user }) => {
    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <div className="px-4 py-2 flex justify-between items-center h-20 w-full shadow-md">
            <Link to={"/dashboard"}>
                <Picture size={50} user={user} />
            </Link>
            <div className="flex gap-2">
                {/* Settings Button */}
                <Button
                    variant="ghost"
                    onClick={() => setShowSettings(!showSettings)}
                    className="hover:bg-transparent text-black hover:text-primary"
                >
                    <Settings className="scale-150" />
                </Button>

                {/* Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent text-black hover:text-primary"
                        >
                            <Ellipsis className="scale-150" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {links.map((l) => (
                            <Link key={l.name} to={l.path}>
                                <DropdownMenuItem>{l.name}</DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
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

export default DashboardNav;
