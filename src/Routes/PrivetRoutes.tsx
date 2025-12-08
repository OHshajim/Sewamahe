import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useDispatch";
import { DashBoard } from "@/pages/DashBoard";
import Sidebar from "@/pages/DashboardSidebar/Sidebar";
import DetailsPanel from "@/pages/DashboardSidebar/DetailsPanel";
import NotFound from "@/pages/NotFound";
import Conversation from "@/pages/Conversation/Conversation";
import Meeting from "@/pages/Meeting/Meeting";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AllUsers from "@/pages/Admin/AllUsers";
import Settings from "@/pages/Admin/Setting";
import AdminConsultant from "@/pages/Admin/Consultant";
import WithdrawalRequest from "@/pages/Admin/WithdrawalRequest";

function PrivetRoutes() {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const user = useAppSelector((state) => state.auth.user);
  const call = useAppSelector((state) => state.call);

  useEffect(() => {
    if (!call.incoming) return;
    navigate(`/meeting/${call.roomId}`, { replace: true });
  }, [call, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex overflow-hidden h-screen">
      {call.status !== "in-call" && (
        <Sidebar className="max-w-[360px] w-full border-r max-md:hidden" />
      )}

      <div className="flex-1 border-r">
        <Routes>
          {/* user */}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/room/:id" element={<Conversation />} />
          <Route path="/room/:id/info" element={<DetailsPanel />} />
          <Route path="/meeting/:roomId" element={<Meeting />} />
          {/* not found page */}
          <Route path="/*" element={<NotFound />} />

          {/* admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/consultant" element={<AdminConsultant />} />
          <Route path="/admin/withdrawal-request" element={<WithdrawalRequest />} />
        </Routes>
      </div>
      {location.includes("/info") || location.includes("/meeting") || (
        <DetailsPanel className="hidden xl:flex max-w-72 w-full" />
      )}
    </div>
  );
}

export default PrivetRoutes;
