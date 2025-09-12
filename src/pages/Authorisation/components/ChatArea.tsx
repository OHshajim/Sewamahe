import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatArea = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b font-semibold">Chat with User</div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="bg-muted p-2 rounded-lg w-max">Hello 👋</div>
                <div className="bg-primary text-primary-foreground p-2 rounded-lg w-max ml-auto">
                    Hi there!
                </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button>Send</Button>
            </div>
        </div>
    );
};

export default ChatArea;
