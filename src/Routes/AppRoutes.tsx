import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "@/actions/setAuthToken";
import initIO from "@/actions/initIO";
import { getGlobal, useGlobal, setGlobal } from "reactn";
import { RootState } from "@/store";
import { GlobalState } from "@/types/global";
import ForgetPassword from "@/pages/Authentication/ForgotPassword";

export const AppRoutes = () => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const io = useSelector((state: RootState) => state.io.io);

    const [token, setToken] = useGlobal<GlobalState, "token">("token");
    const [entryPath, setStartingPoint] = useGlobal<GlobalState, "entryPath">(
        "entryPath"
    );

    useEffect(() => {
        if (!io || !getGlobal<GlobalState>().user || !token) return;
        let focusCount = 0;
        const interval = setInterval(() => {
            if (!document.hasFocus()) {
                focusCount++;
                if (focusCount === 10) {
                    io.emit("status", { status: "away" });
                }
            } else if (focusCount !== 0) {
                focusCount = 0;
                io.emit("status", { status: "online" });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [io, token]);

    useEffect(() => {
        return () => {
            try {
                getGlobal<GlobalState>()
                    .audioStream?.getTracks()
                    .forEach((track) => track.stop());
            } catch (e) {
                console.log(e);
            }
            try {
                getGlobal<GlobalState>()
                    .videoStream?.getTracks()
                    .forEach((track) => track.stop());
            } catch (e) {
                console.log(e);
            }
        };
    }, []);

    // Handle token in URL on first load
    if (!window.loaded) {
        setStartingPoint(window.location.pathname);
        const splitPath = window.location.pathname.split("/");
        const route = splitPath[1];
        const tokenFromUrl = splitPath[2];
        if (route === "login" && tokenFromUrl && tokenFromUrl.length > 20) {
            try {
                const decoded = jwtDecode(tokenFromUrl);
                if (
                    typeof decoded !== "object" ||
                    typeof (decoded as any).id !== "string"
                )
                    return;
                setAuthToken(tokenFromUrl);
                localStorage.setItem("token", tokenFromUrl);
                localStorage.setItem("user", JSON.stringify(decoded));
                setGlobal<GlobalState>({
                    user: decoded,
                    token: tokenFromUrl,
                }).then(() => {
                    dispatch(initIO(tokenFromUrl));
                });
            } catch (e) {
                addToast("Invalid token in URL. Login manually.", {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
        window.loaded = true;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route path="/forgot-password" element={token ? <Navigate to="/" /> : <ForgetPassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
