import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { callEnded, setCallToken } from "@/features/call/callSlice";
import API from "@/lib/axios";

import { ControlBar, LiveKitRoom, RoomAudioRenderer, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import Ringing from "./components/Ringing";
import { closeCall } from "@/actions/call";

const Meeting = () => {
    const { roomId, token, type, status, callee, caller } = useAppSelector((s) => s.call);
    const user = useAppSelector((s) => s.auth.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function join() {
            if (token) return;
            const { data } = await API.post("/api/livekit/token", {
                roomName: roomId,
                userId: user._id,
                calleeId: callee._id,
            });
            dispatch(setCallToken(data.token));
        }
        join();
    }, []);

    const handleDisconnect = async() => {
        await closeCall({
            userID: caller._id === user._id ? callee._id : caller._id,
        });
        dispatch(callEnded());
        navigate("/dashboard", { replace: true });
        return;
    };

    // 🔔 Incoming Call Screen
    if (status === "ringing" || status === "calling") return <Ringing />;
    if (status === "idle"){
        dispatch(callEnded());
        navigate("/dashboard", { replace: true })
        return null;
    };
    
    // 🔌 Connecting Screen
    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen ">
                <div className="text-center animate-pulse">
                    <h1 className="text-white text-2xl font-semibold">
                        Joining room…
                    </h1>
                    <p className="text-gray-300 mt-2">
                        Setting up your audio and video
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full text-white bg-black">
            <LiveKitRoom
                token={token}
                serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                connect
                audio
                video={type === "video"}
                onDisconnected={handleDisconnect}
                data-lk-theme="default"
                style={{ height: "100%" }}
            >
                <VideoConference />
                <RoomAudioRenderer />
                <ControlBar />
            </LiveKitRoom>
        </div>
    );
}

export default Meeting;