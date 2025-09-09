import configuration from "@/config/configuration";
import axios from "axios";

const login = (email, password) => {
    return axios({
        method: "post",
        url: `${configuration.url || ""}/api/login`,
        data: { email, password },
    });
};

export default login;
