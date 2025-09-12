import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { sendMessage, fetchMessages } from "@/features/chat/chatSlice";

const ChatArea = () => {
    const dispatch = useAppDispatch();
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const currentUser = useAppSelector((state) => state.auth.user);
    const conversations = useAppSelector((state) => state.chat.conversations);
    const selectedConversationId = useAppSelector((state) => state.chat.selectedConversationId);
    const messages = useAppSelector((state) => state.chat.messages[selectedConversationId || ""] || []);
    

    

    console.log(selectedConversationId, messages, conversations);
    
    const selectedConversation = conversations.find((c) => c._id === selectedConversationId);

    // Fetch messages when conversation changes
    useEffect(() => {
        if (selectedConversationId) {
            dispatch(fetchMessages({ conversationId: selectedConversationId }));
        }
    }, [selectedConversationId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim() || !selectedConversationId) return;

        dispatch(
            sendMessage({
                conversationId: selectedConversationId,
                content: newMessage,
                // senderId: currentUser._id,
                type:"text"
            })
        );
        setNewMessage("");
    };


    // if (!selectedConversation) {
    //     return (
    //         <div className="flex flex-col items-center justify-center h-full text-gray-400">
    //             Select a conversation to start chatting
    //         </div>
    //     );
    // }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b font-semibold">
                Chat with{" "}
                {selectedConversation?.participants
                    .filter((u) => u._id !== currentUser._id)
                    .map((u) => u.firstName)
                    .join(", ")}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`p-2 rounded-lg w-max ${
                            msg.sender._id === currentUser._id
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>Send</Button>
            </div>
        </div>
    );
};

export default ChatArea;
