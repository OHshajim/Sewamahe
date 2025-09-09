import configuration from "@/config/configuration";
import axios from "axios";

const register = (data) => {
    return axios({
        method: "post",
        url: `${configuration.url || ""}/api/register`,
        data,
    });
};

export default register;
