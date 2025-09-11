import Div100vh from "react-div-100vh";
import { Route, Routes,useNavigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { DashBoard } from "@/pages/Authorisation/User/DashBoard";
import DashboardNav from "@/pages/Authorisation/components/DashboardNav";
import { useEffect, useState } from "react";

function PrivetRoutes() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        setLoading(true)
        const token = localStorage.getItem("token");
        setLoading(false)
        if(token && !loading){
            navigate("/login")
        }
    },[])

    return (
        <Div100vh className="flex">
            <DashboardNav/>
            <div className=" flex-1">
                {/* {showPanel && getPanel()} */}
                <Routes>
                    <Route path="/dashboard" element={<DashBoard />} />
                    {/* <Route path="/" element={<Welcome />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route
                            path="/admin/transaction"
                            element={<AdminTransaction />}
                        />
                        <Route
                            path="/admin/transaction/view/:id"
                            element={<ViewAdminTransaction />}
                        />
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/consultant"
                            element={<AdminConsultant />}
                        /> */}
                    {/* <Route
                            path="/admin/withdrawal-request"
                            element={<WithdrawalRequest />}
                        />
                        <Route
                            path="/admin/withdrawal-request/view/:id"
                            element={<WithdrawalRequestView />}
                        />
                        <Route
                            path="/admin/commission"
                            element={<Commission />}
                        />
                        <Route path="/admin/aboutAs" element={<AboutAs />} />
                        <Route
                            path="/admin/contact"
                            element={<AdminContact />}
                        />
                        <Route
                            path="/admin/privacy"
                            element={<AdminPrivacy />}
                        /> */}
                    {/* <Route path="/admin/terms" element={<AdminTerms />} />
                        <Route path="/meeting/:id" element={<Meeting />} />
                        <Route path="/room/:id" element={<Conversation />} />
                        <Route path="/room/:id/info" element={<Details />} />
                        <Route
                            path="/monetization"
                            element={<Monetization />}
                        />
                        <Route
                            path="/monetization/success"
                            element={<PaymentSuccess />}
                        />
                        <Route
                            path="/monetization/failed"
                            element={<PaymentFailed />}
                        /> */}
                    <Route path="/*" element={<NotFound />} />{" "}
                    {/* Comment this line when Electron build */}
                    {/* <Route path="/" element={Welcome} />  Uncomment this line when Electron build */}
                </Routes>
            </div>
            {/* {!location.pathname.endsWith("/info") &&
                    (showDetails ||
                        !location.pathname.startsWith("/meeting")) && (
                        <Details />
                    )} */}
            <div>

            </div>
        </Div100vh>
    );
}

export default PrivetRoutes;
