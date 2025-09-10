import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import Picture from "../components/Picture";

export const DashBoard = () => {
    // Get user from Redux
    const user = useAppSelector((state) => state.auth.user);
    const [info, setInfo] = useState(null);

    // Example for "over" global state
    const [over, setOver] = useState(false);
    const back = () => setOver(false);

    // Fetch user-related info once
    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) return;
            // const result = await myData(user.id);
            // setInfo(result.data);
        };
        fetchData();
    }, [user?.id]);
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* <TopBar back={back} /> */}

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
                    <div className="text-center mb-6">
                        <Picture user={user} />
                        <h2 className="mt-2 text-lg font-semibold">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-gray-500">{user?.type}</p>
                    </div>

                    {/* Sidebar Menu */}
                    <nav className="space-y-2">
                        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
                            Dashboard
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
                            Contacts
                        </button>
                        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
                            Favorites
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {/* Promotion */}
                    {user?.type === "Consultant" && info?.price > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-md mx-auto">
                            <h3 className="text-lg font-bold mb-2 text-center">
                                🔥 Promotion
                            </h3>
                            <p className="text-gray-600 text-center">
                                Your current call rate is{" "}
                                <span className="font-semibold">
                                    ₹{info?.price} per minute
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Tutorial / Info */}
                    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto text-center">
                        <p className="text-gray-700">
                            Search for someone to start a conversation,
                            <br />
                            Add contacts to your favorites to reach them faster.
                        </p>
                    </div>
                </main>
            </div>

            {/* Bottom Bar */}
            {/* <BottomBar /> */}
        </div>
    );
};