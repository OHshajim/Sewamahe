import { useEffect, useState } from "react";
import { FiPhone, FiMoreHorizontal } from "react-icons/fi";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Picture from "@/components/Picture";
// import getMeetingRoom from "@/actions/getMeetingRoom";
// import postCall from "@/actions/postCall";
// import removeRoom from "@/actions/removeRoom";
// import getRooms from "@/actions/getRooms";
// import myData from "@/actions/myData";
import Actions from "@/constants/Actions";
import { useAppSelector } from "@/hooks/useDispatch";
import { myData } from "@/actions/auth";
import { getRooms, removeRoom } from "@/actions/Rooms";
import { setRooms } from "@/features/chat/chatSlice";

export default function Room({ room }) {
    const roomsWithNewMessages = useAppSelector((state) => state.chat.messages);
    const onlineUsers = useAppSelector((state) => state.chat.onlineUsers);
    const typing = useAppSelector((state) => state.chat.typing[room?._id] || []);
    const currentRoom = useAppSelector((state) => state.chat.room);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useAppSelector((state) => state.auth.user);
    // const setAudio = useGlobal("audio")[1];
    // const setVideo = useGlobal("video")[1];
    // const setCallDirection = useGlobal("callDirection")[1];
    // const setMeeting = useGlobal("meeting")[1];

    const [hover, setHover] = useState(false);
    const [info, setInfo] = useState(null);

    const width = window.innerWidth;
    const isMobile = width < 700;

    let other ;
    room.people.forEach((person) => {
        if (user._id !== person._id) other = person;
    });
    if (!other.firstName)
        other = { ...other, firstName: "Deleted", lastName: "User" };

    const title = (
        room.isGroup ? room.title : `${other.firstName} ${other.lastName}`
    ).substring(0, 22);

    let { lastMessage } = room;
    let text = "";
    if (!lastMessage && room.isGroup) text = "New group created.";
    if (!lastMessage && !room.isGroup)
        text = `No messages with ${other.firstName} yet.`;
    if (!lastMessage) lastMessage = {};

    if (lastMessage.author === user._id && !room.isGroup) text += "You: ";
    
    switch (lastMessage.type) {
        case "file":
            text += "Sent a file.";
            break;
        case "image":
            text += "Sent a picture.";
            break;
        default:
            text += lastMessage.content || "";
    }

    const date = lastMessage?.date
        ? moment(lastMessage.date).format("MMM D")
        : "";
    const time = lastMessage?.date
        ? moment(lastMessage.date).format("h:mm A")
        : "";

    const getStatus = () => {
        if (room.isGroup) return null;
        if (onlineUsers.some((u) => u.id === other._id && u.status === "busy"))
            return "busy";
        if (
            onlineUsers.some((u) => u.id === other._id && u.status === "online")
        )
            return "online";
        if (onlineUsers.some((u) => u.id === other._id && u.status === "away"))
            return "away";
        return null;
    };

    const call = async (callee, isVideo) => {
        // if (info?.balance.amount <= 4 && user.type === "user")
        //     return toast.warning("Low balance! Please top up your account.");
        // if (info?.consultantStatus === "Pending" && user.type === "Consultant")
        //     return toast.warning("You are unverified consultant");
        // if (
        //     onlineUsers.filter((u) => u.id === other._id).length === 0 &&
        //     !room.isGroup
        // )
        //     return toast.warning("User is offline!");

        // await setAudio(true);
        // await setVideo(isVideo);
        // await setCallDirection("outgoing");
        // dispatch({ type: Actions.RTC_SET_COUNTERPART, counterpart: callee });

        // try {
        //     const res = await getMeetingRoom({
        //         startedAsCall: true,
        //         caller: user.id,
        //         callee: other._id,
        //         callToGroup: room.isGroup,
        //         group: room._id,
        //     });
        //     await setMeeting(res.data);
        //     navigate(`/meeting/${res.data._id}`, { replace: true });
        //     await postCall({ roomID: room._id, meetingID: res.data._id });
        // } catch (e) {
        //     toast.error("Server error. Unable to initiate call.");
        // }
    };

    const remove = async () => {
        try {
            await removeRoom({ roomId: room._id });
            toast.success("Room deleted successfully.");
            const res = await getRooms();
            dispatch(setRooms(res.rooms));
            navigate("/dashboard", { replace: true });
        } catch (e) {
            toast.error("Error while removing room. Please try again.");
        }
    };

    useEffect(() => {
        const fetchInfo = async () => {
            if (user?._id) {
                try {
                    const res = await myData();
                    setInfo(res.data);
                } catch (e) {
                    console.error("Error fetching user info:", e);
                }
            }
        };
        fetchInfo();
    }, [user?._id]);

    const status = getStatus();

    return (
        <Card
            className={`flex items-center text-gray-500  text-xs justify-between rounded-none py-2 px-3 h-14 hover:bg-muted transition cursor-pointer group ${
                location.pathname.includes(room._id) ? "bg-muted/60" : ""
            }`}
            onClick={() => {
                const target = `/room/${room._id}`;
                if (location.pathname !== target)
                    navigate(target, { replace: true });
            }}
        >
            {/* Left - Picture + Info */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Picture user={other} size={38} />
                    {status && (
                        <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                                status === "online"
                                    ? "bg-green-500"
                                    : status === "away"
                                    ? "bg-yellow-400"
                                    : "bg-gray-400"
                            }`}
                        ></span>
                    )}
                </div>

                <div>
                    <div className="font-bold">
                        {title}
                        {title.length > 22 && "..."}
                    </div>
                    <div className="truncate max-w-[180px]">
                        {typing.length > 0 ? "typing..." : text}
                    </div>
                </div>
            </div>

            {/* Right - Hover actions */}
            <div className="flex items-center">
                {hover || (
                    <div className="text-right leading-tight group-hover:hidden">
                        {date && (
                            <>
                                {date}
                                <br />
                                {time}
                            </>
                        )}
                    </div>
                )}
                <div
                    className={` ${
                        hover ? "group-hover:flex " : "group-hover:flex hidden"
                    } items-center"`}
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            call(other, false);
                        }}
                    >
                        <FiPhone className="h-4 w-4" />
                    </Button>
                    <DropdownMenu
                        open={hover}
                        onOpenChange={() => setHover(!hover)}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <FiMoreHorizontal className="h-4 w-4 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className=" hover:bg-slate-50"
                        >
                            <DropdownMenuItem onClick={remove}>
                                Remove
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}
