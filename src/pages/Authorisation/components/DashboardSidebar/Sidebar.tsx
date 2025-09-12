import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardNav from "../DashboardNav";
import Picture from "../Picture";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { logout } from "@/features/auth/authSlice";
import Rooms from "./components/Rooms";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import { fetchAllUsers } from "@/actions/user";

const Sidebar = ({ className = "" }) => {
    const user = useAppSelector((state) => state.auth.user);

    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState<"rooms" | "search" | "favorites">("rooms");
    const [showSettings, setShowSettings] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        navigate("/");
    };

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetchAllUsers();
            setUsers(res);
        };
        getUsers();
    }, []);

    const tabs = [
        {title:"Rooms",value:"rooms"},
        {title:"Search",value:"search"},
        {title:"Favorites",value:"favorites"},
    ]
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
                            {tabs.map(tab => <TabsTrigger key={tab.value} value={tab.value}>{tab.title}</TabsTrigger>)}
                        </TabsList>
                        <TabsContent value="rooms">
                            <Rooms/>
                        </TabsContent>
                        <TabsContent value="search">
                            <Search users={users}/>
                        </TabsContent>
                        <TabsContent value="favorites">
                            <Favorites users={users}/>
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    );
};

export default Sidebar;
