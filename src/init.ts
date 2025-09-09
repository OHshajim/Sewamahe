import { setGlobal } from "reactn";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import configuration from "./config/configuration";
import setAuthToken from "./actions/setAuthToken";
import store from "./store";
import initIO from "./actions/initIO";
import { GlobalState } from "./types/global";

const init = async () => {
    if (localStorage.getItem("app") !== "Clover 2.x.x") {
        localStorage.clear();
        localStorage.setItem("app", "Clover 2.x.x");
    }

    let token = localStorage.getItem("token");
    let userString = localStorage.getItem("user");
    let user = userString ? JSON.parse(userString) : null;

    if (token) {
        const decoded = jwtDecode(token, { complete: true }) as any;
        const isExpired = decoded.exp * 1000 < Date.now();

        let result;
        if (!isExpired) {
            try {
                const res = await axios.post(
                    `${configuration.url}/api/check-user`,
                    { id: decoded.id }
                );
                result = res.data;
            } catch {
                result = null;
            }
        }

        if (!result || result.error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            token = null;
            user = null;
        }
    }

    if (token) {
        setAuthToken(token);
        store.dispatch(initIO(token));
    }

    const state: GlobalState = {
        version: "2.9.2",
        entryPath: window.location.pathname,
        token,
        user: user || (token ? jwtDecode(token) : null),
        rooms: [],
        searchResults: [],
        favorites: [],
        meetings: [],
        nav: "rooms",
        search: "",
        over: null,
        isPicker: false,
        messages: [],
        streams: [],
        inCall: false,
        video: true,
        audio: true,
        audioStream: null,
        videoStream: null,
        screenStream: null,
        callStatus: null,
        counterpart: null,
        callDirection: null,
        meeting: null,
        showPanel: true,
        panel: "standard",
        newGroupUsers: [],
    };

    await setGlobal<GlobalState>(state);
    console.log("Global state initialized", state);
};

export default init;
