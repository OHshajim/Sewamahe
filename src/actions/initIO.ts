import {
    addMessage,
    setOnlineUsers,
    setRooms,
    setTyping,
} from "@/features/chat/chatSlice";
import { getRooms } from "./Rooms";
import { logout } from "@/features/auth/authSlice";
import messageSound from "../assets/message.mp3";
import { store } from "@/store";
import { initSocket } from "@/lib/socket";

const initIO = (token: string) => {
    const socket = initSocket(token);
    socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
    });
    socket.on("disconnect", (reason: string) => {
        console.warn("❌ Socket disconnected:", reason);
    });

    socket.on("message-in", async (data) => {
        const { room, message } = data;
        const currentRoom = store.getState().chat.room;

        // Play message sound
        const audio = new Audio(messageSound);
        audio.play().catch(() => {});

        // Add message if in the current room
        // if (currentRoom && currentRoom._id === room._id) {
        //     store.dispatch(addMessage(message));
        // }

        // Refresh room list
        try {
            const res = await getRooms();
            store.dispatch(setRooms(res.rooms));
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("onlineUsers", (users) => {
        store.dispatch(setOnlineUsers(users));
    });
    
    socket.on("user-deleted", async () => {
        localStorage.removeItem("token");
        await store.dispatch(logout());
    });

    return socket;
};

export default initIO;
