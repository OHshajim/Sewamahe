import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Picture from "../../../../components/Picture";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import Message from "./components/Message";
import { moreMessages, setTyping } from "@/features/chat/chatSlice";
import configuration from "@/config/configuration";
import Loader from "@/components/Loader";

export default function Content() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const messages = useAppSelector((state) => state.chat.messages);
    const room = useAppSelector((state) => state.chat.room);
    const typing = useAppSelector((state) => state.chat.typing[room?._id] || []);
    const chatRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [openImage, setOpenImage] = useState<string | null>(null);

    // Identify the other user (if not group chat)
    let other = { firstName: "A", lastName: "A" };
    if (!room?.isGroup && room?.people) {
        room.people.forEach((person) => {
            if (person._id !== user._id) other = person;
        });
    }

    // Infinite scroll for more messages
    const onScroll = async () => {
        const chat = chatRef.current;
        if (!chat) return;
        if (chat.scrollTop === 0 && !loading) {
            setLoading(true);
            try {
                // const res = await getMoreMessages({
                //     roomID: room._id,
                //     firstMessageID: messages[0]?._id,
                // });
                // dispatch(moreMessages(res.messages));
            } catch (err) {
                console.error("Error loading more messages", err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        const chat = chatRef.current;
        if (chat) chat.scrollTop = chat.scrollHeight;
    }, [messages.length, typing]);
    
    return (
        <div className="flex flex-col h-full ">
            <ScrollArea
                className="flex-1 h-full"
                onScrollCapture={onScroll}
                ref={chatRef}
            >
                <div className="flex flex-col max-w-4xl mx-auto w-full px-4">
                    {/* Lightbox Dialog */}
                    <Dialog
                        open={!!openImage}
                        onOpenChange={() => setOpenImage(null)}
                    >
                        <DialogContent className="max-h-[70%] p-0 overflow-hidden">
                            <DialogTitle></DialogTitle>
                            <img
                                src={`${configuration.url || ""}/api/image/${
                                    openImage?.content
                                }`}
                                alt={openImage?.content}
                                className="w-full h-auto object-contain"
                            />
                        </DialogContent>
                    </Dialog>

                    {/* Messages */}
                    {messages.map((message, index) => (
                        <Message
                            key={message._id}
                            message={message}
                            previous={messages[index - 1]}
                            next={messages[index + 1]}
                            onOpen={setOpenImage}
                        />
                    ))}

                    {/* Loading More */}
                    {loading && <Loader className="w-4 h-4" />}

                    {/* Typing Animation */}
                    {typing.length > 0 && (
                        <div className="flex items-end space-x-2 mt-3">
                            <Picture user={other} size={60} />
                            <div className="bg-muted text-muted-foreground px-3 py-2 rounded-2xl">
                                <div className="flex space-x-1 items-center">
                                    <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                                    <span className="dot w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
