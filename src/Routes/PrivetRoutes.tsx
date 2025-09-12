import Div100vh from "react-div-100vh";
import { Route, Routes,useNavigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { DashBoard } from "@/pages/Authorisation/User/DashBoard";
import { useEffect, useState } from "react";
import Sidebar from "@/pages/Authorisation/components/Sidebar";
import ChatArea from "@/pages/Authorisation/components/ChatArea";
import DetailsPanel from "@/pages/Authorisation/components/DetailsPanel";

function PrivetRoutes() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        setLoading(false)
        if(!token && !loading){
            navigate("/login")
        }
    },[])

    return (
        <Div100vh className="flex">
            {/* LEFT PANEL - Sidebar */}
            <Sidebar className="max-w-sm w-full border-r" />

            {/* MIDDLE PANEL - Chat area */}
            <div className="flex-1 border-r">
                <Routes>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/dashboard/room/:id" element={<ChatArea />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>

            {/* RIGHT PANEL - Branding / User Details */}
            <DetailsPanel className="hidden xl:flex max-w-sm w-full" />
        </Div100vh>
    );
}

export default PrivetRoutes;
