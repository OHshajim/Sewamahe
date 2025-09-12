import { useState } from "react";
import { useAppDispatch } from "@/hooks/useDispatch";
import {
    setSelectedConversation,
    fetchMessages,
} from "@/features/chat/chatSlice";
import { Input } from "@/components/ui/input";
import UserHead from "./components/UserHead";

const Search = ({users}) => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");

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
                        <UserHead key={user._id} handleUserClick={handleUserClick} user={user}/>
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
