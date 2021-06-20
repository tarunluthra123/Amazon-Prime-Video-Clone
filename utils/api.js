import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000/api";

export const routes = {
    ping: {
        url: "/ping",
        method: "GET",
    },
};

export async function pingTest() {
    const url = `${BACKEND_URL}${routes.ping.url}`;
    try {
        const response = await axios.get(url).then((res) => res.data);
        return response;
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            pingTest();
        }, 3000);
    }
}
