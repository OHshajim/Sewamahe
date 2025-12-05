import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import ringSound from "../../../assets/ring.mp3";
import Picture from "@/components/Picture";
import { FiPhone, FiPhoneOff, FiVideo } from "react-icons/fi";
import { answerCall, closeCall } from "@/actions/call";
import { callEnded } from "@/features/call/callSlice";

export default function Ringing() {
    const call = useAppSelector((s) => s.call);
    const incoming = call.status === "ringing";
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const audio = new Audio(ringSound);
        audio.loop = true;
        audio.play();

        return () => audio.pause();
    }, []);

    const joinCall = async() => {
        await answerCall({userID: incoming? call.caller._id : call.callee._id});
    };

    const endCall = async() => {
        await closeCall({userID: incoming? call.caller._id : call.callee._id});
        dispatch(callEnded());
        navigate(`/dashboard`);
    }

    // const joinVideoCall = () => {

    // }

    return (
        <div className="bg-black flex items-center justify-center h-screen">
            <div className="bg-white flex flex-col justify-center items-center p-6 w-80">
                <img src="/logo.png" loading="lazy" className="w-20 mx-auto" />
                <h2 className="text-lg font-bold">Incoming Call</h2>
                <p className="text-sm mt-2 font-bold">
                    {incoming ? call.caller.fullName : call.callee.fullName}
                </p>
                <div className="w-[150px] h-[150px] rounded-full animate-ringPulse box-border flex items-center justify-center overflow-hidden">
                    <Picture
                        size={140}
                        user={incoming ? call.caller : call.callee}
                    />
                </div>

                <div
                    className="
                        flex justify-between mt-6 gap-3 flex-1 text-xl text-white
                        [&>button]:p-4
                        [&>button]:rounded-full
                        [&>button]:flex
                        [&>button]:items-center
                        [&>button]:justify-center
                        [&>button]:bg-[#da7d02]
                        [&>button]:transition
                        [&>button]:pointer-events-auto
                        [&>button]:flex-shrink-0
                        [&_svg]:pointer-events-none
                    "
                >
                    {/* Accept Call */}
                    <button
                        onClick={joinCall}
                        className={`hover:opacity-90 active:scale-95" ${incoming ? "" : "!hidden"}`}
                    >
                        <FiPhone />
                    </button>

                    {/* End Call */}
                    <button className="!bg-[#6d3e01] hover:opacity-90 active:scale-95" onClick={endCall}>
                        <FiPhoneOff />
                    </button>

                    {/* Video Call */}
                    {/* <button
                        onClick={joinVideoCall}
                        className={`hover:opacity-90 active:scale-95" ${incoming ? "" : "!hidden"}`}
                    >
                        <FiVideo />
                    </button> */}
                </div>
            </div>
        </div>
    );
}

