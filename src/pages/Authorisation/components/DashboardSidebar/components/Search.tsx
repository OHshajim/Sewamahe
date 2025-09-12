import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useDispatch";
import { fetchAllUsers } from "@/actions/user";
import {
    setSelectedConversation,
    fetchMessages,
} from "@/features/chat/chatSlice";
import { Input } from "@/components/ui/input";
import Picture from "../../Picture";
import { Link } from "react-router-dom";

const Search = () => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    // Fetch all users when component mounts
    useEffect(() => {
        const getUsers = async () => {
            const res = await fetchAllUsers();
            setUsers(res);
        };
        getUsers();
    }, []);

    // Filter users based on search query
    const filteredUsers = users.filter((u) =>
        `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    // Start conversation with selected user
    const handleUserClick = (user) => {
        dispatch(setSelectedConversation(user._id));
        dispatch(fetchMessages({ conversationId: user._id }));
    };

    return (
        <div className="p-3 flex flex-col h-full">
            {/* Search input */}
            <Input
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-3"
            />

            {/* Users list */}
            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Link key={user._id} to={`/room/${user._id}`}>
                            <div
                                key={user._id}
                                onClick={() => handleUserClick(user)}
                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 cursor-pointer"
                            >
                                <Picture size={40} user={user} />
                                <span>
                                    {user.firstName} {user.lastName}
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-gray-400 mt-5">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
