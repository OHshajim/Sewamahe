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
import { useEffect, useState } from "react";

export const AppRoutes = () => {
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setToken(token);
    }, []);
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={token !== null ? <Navigate to="/" /> : <Login />} />
            <Route path="/forgot-password" element={token !== null ? <Navigate to="/" /> : <ForgetPassword />} />

            <Route path="/*" element={<PrivetRoutes />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
