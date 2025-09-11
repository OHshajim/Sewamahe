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
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "@/actions/auth";
import { useAppDispatch } from "@/hooks/useDispatch";
import { setCredentials } from "@/features/auth/authSlice";

const DashboardNav = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];
    

    const Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setCredentials({ token: null, user: null }));
        setAuthToken(null)
        navigate("/")
        return;
    }

    return (
        <div className="px-4 py-2 flex justify-between items-center h-20 max-w-xs w-full shadow-lg">
            <Picture size={50} />
            <div className="flex gap-2">
                {/* Settings Button */}
                <Button
                    variant="ghost"
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
