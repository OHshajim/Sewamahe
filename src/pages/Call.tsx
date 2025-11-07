import API from "@/lib/axios";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Call() {
    const { roomId, type } = useParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const join = async () => {
            const {data} = await API.post("/api/livekit/token", {
                roomName: roomId,
                userName: "shajim",
            });
            setToken(data.token);
        };
        join();
    }, [roomId]);

    if (!token) return <div>Connecting...</div>;

    return (
        <LiveKitRoom
            token={token}
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            connect
            video={type === "video"}
            audio
        >
            <VideoConference />
        </LiveKitRoom>
    );
}
