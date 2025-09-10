import Div100vh from "react-div-100vh";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import DashBoard from "@/pages/Authorisation/User/DashBoard";

function PrivetRoutes() {
    const location = useLocation();


    return (
        <Div100vh>
            <div className="app">
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
        </Div100vh>
    );
}

export default PrivetRoutes;
