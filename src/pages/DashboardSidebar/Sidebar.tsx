import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Picture from "../../components/Picture";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { logout } from "@/features/auth/authSlice";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import { getFavorite, getUsers } from "@/actions/user";
import { ResetPasswordPopup } from "./components/Popup";
import TopBar from "./components/DashboardNav";
import { getRooms } from "@/actions/Rooms";
import { setFavorites, setRooms } from "@/features/chat/chatSlice";
import Room from "./components/components/Room";
import { SearchIcon } from "lucide-react";
import { FiMessageCircle, FiSearch, FiStar } from "react-icons/fi";
import Setting from "./Setting";

const Sidebar = ({ className = "" }) => {
    const user = useAppSelector((state) => state.auth.user); 
    const rooms = useAppSelector((state) => state.chat.rooms); 
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState<"rooms" | "search" | "favorites">("rooms");
    const [showSettings, setShowSettings] = useState(false);
    const [popup, showPopup] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        navigate("/");
    };

    useEffect(() => {
        getRooms()
            .then((res) => dispatch(setRooms(res.rooms)))
            .catch((err) => console.log(err));
        getUsers({ search })
            .then((res) => setUsers(res))
            .catch((err) => console.log(err));
        getFavorite()
            .then((res) => dispatch(setFavorites(res.favorites)))
            .catch((err) => console.log(err));
    }, [search]);
    

    const tabs = [
        {
            title: "Rooms",
            value: "rooms",
            icon: <FiMessageCircle className="text-base" />,
        },
        {
            title: "Search",
            value: "search",
            icon: <FiSearch className="text-base" />,
        },
        {
            title: "Favorites",
            value: "favorites",
            icon: <FiStar className="text-base" />,
        },
    ];
    return (
        <div className={`flex flex-col ${className}`}>
            <TopBar
                setShowSettings={setShowSettings}
                showSettings={showSettings}
                Logout={handleLogout}
                user={user}
            />

            <div className="relative w-full cursor-text">
                <SearchIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 bg-background text-xs !ring-0"
                />
            </div>
            <Tabs
                value={tab}
                onValueChange={(val) =>
                    setTab(val as "rooms" | "search" | "favorites")
                }
                className="w-full overflow-hidden"
            >
                <TabsList className="grid grid-cols-3 w-full bg-white p-0">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            onClick={() => setShowSettings(false)}
                            className={` flex flex-col text-xs gap-1 ${
                                showSettings ||
                                "data-[state=active]:text-[#da7d02] "
                            }`}
                        >
                            {tab.icon}
                            {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {showSettings ? (
                    <Setting handleLogout={handleLogout} showPopup={showPopup} />
                ) : (
                    <>
                        <TabsContent value="rooms">
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <Room key={room._id} room={room} />
                                ))
                            ) : (
                                <div className="text-center text-gray-400 mt-5">
                                    No rooms found
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent
                            value="search"
                            className="overflow-y-auto h-full"
                        >
                            <Search users={users} />
                        </TabsContent>
                        <TabsContent value="favorites">
                            <Favorites />
                        </TabsContent>
                    </>
                )}
            </Tabs>

            {popup && (
                <ResetPasswordPopup
                    open={popup}
                    onClose={() => {
                        showPopup(false);
                    }}
                />
            )}
        </div>
    );
};

export default Sidebar;
