import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Authentication/Login";
import ForgetPassword from "@/pages/Authentication/ForgotPassword";
import PrivetRoutes from "./PrivetRoutes";
import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect } from "react";
import initIO from "@/actions/initIO";

export const AppRoutes = () => {
    const user = useAppSelector((state) => state.auth.user);
    const token = localStorage.getItem("token")    
      
    useEffect(() => {
        if (!token || !user) return;
        initIO(token);
    }, [token, user]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />

            <Route
                path="/*"
                element={!user ? <Navigate to="/" /> : <PrivetRoutes />}
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
