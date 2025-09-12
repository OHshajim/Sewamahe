import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardNav from "./DashboardNav";
import Picture from "./Picture";
import { TableBody } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { logout } from "@/features/auth/authSlice";

const Sidebar = ({ className = "" }) => {
    const user = useAppSelector((state) => state.auth.user);
    const [tab, setTab] = useState<"rooms" | "search" | "favorites">("rooms");
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        navigate("/");
    };

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Top Section - Profile + Settings */}
            <DashboardNav
                setShowSettings={setShowSettings}
                showSettings={showSettings}
                Logout={handleLogout}
                user={user}
            />

            {/* Settings View */}
            {showSettings ? (
                <div className="p-4 space-y-2 flex flex-col items-center">
                    <div className="my-8">
                        <Picture size={150} user={user} />
                    </div>
                    <Button className="uppercase w-full bg-black hover:bg-black/30 hover:text-black">
                        Change Password
                    </Button>
                    <Button className="uppercase w-full bg-black hover:bg-black/30 hover:text-black">
                        Remove Picture
                    </Button>
                    <Button className="uppercase w-full bg-black hover:bg-black/30 hover:text-black">
                        Monetization
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="uppercase w-full"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <>
                    {/* Search Bar */}
                    <div className="p-3">
                        <Input placeholder="Search..." />
                    </div>

                    {/* Tabs */}
                    <Tabs
                        value={tab}
                        onValueChange={(val) =>
                            setTab(val as "rooms" | "search" | "favorites")
                        }
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="rooms">Rooms</TabsTrigger>
                            <TabsTrigger value="search">Search</TabsTrigger>
                            <TabsTrigger value="favorites">
                                Favorites
                            </TabsTrigger>
                        </TabsList>
                        <TableBody></TableBody>
                    </Tabs>

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {[1, 2, 3].map((id) => (
                            <div
                                key={id}
                                className="p-3 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center gap-3"
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={`https://i.pravatar.cc/150?u=${id}`}
                                    />
                                    <AvatarFallback>U{id}</AvatarFallback>
                                </Avatar>
                                <span>User {id}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
