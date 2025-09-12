import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import {
    setSelectedConversation,
    fetchMessages,
} from "@/features/chat/chatSlice";
import UserHead from "./components/UserHead";

const Favorites = ({ users }) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.auth.user);

    const favoriteUsers = users.filter((u) =>
        currentUser?.favorites.includes(u._id)
    );

    const handleUserClick = (user) => {
        dispatch(setSelectedConversation(user._id));
        dispatch(fetchMessages({ conversationId: user._id }));
    };

    return (
        <div className="p-3 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-2">
                {favoriteUsers.length > 0 ? (
                    favoriteUsers.map((user) => (
                        <UserHead
                            key={user._id}
                            handleUserClick={handleUserClick}
                            user={user}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-400 mt-5">
                        No favorite users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
