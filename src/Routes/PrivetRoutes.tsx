import { Route, Routes,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useDispatch";
import { DashBoard } from "@/pages/DashBoard";
import Sidebar from "@/pages/DashboardSidebar/Sidebar";
import DetailsPanel from "@/pages/DashboardSidebar/DetailsPanel";
import NotFound from "@/pages/NotFound";
import Conversation from "@/pages/Conversation/Conversation";
import Call from "@/pages/Call";

function PrivetRoutes() {
    const navigate = useNavigate()
    const location = window.location.pathname;
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar className="max-w-[360px] w-full border-r max-md:hidden" />

            <div className="flex-1 border-r">
                <Routes>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/room/:id" element={<Conversation />} />
                    <Route path="/room/:id/info" element={<DetailsPanel />} />
                    <Route path="/meeting/:roomId/:type" element={<Call />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
            {location.includes("/info") || (
                <DetailsPanel className="hidden xl:flex max-w-72 w-full" />
            )}
        </div>
    );
}

export default PrivetRoutes;
