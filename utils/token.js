import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import { getUser } from "./user";

export function getAuthToken() {
    const cookies = parseCookies();
    const access = cookies["hulu-access"];
    return access;
}

export function getRefreshToken() {
    const cookies = parseCookies();
    const userCookie = cookies["hulu-user"];
    if (userCookie) {
        const refresh = userCookie;
        return refresh;
    }
    return null;
}
