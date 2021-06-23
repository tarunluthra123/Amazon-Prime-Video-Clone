import { parseCookies } from "nookies";

export function getAuthToken() {
    const cookies = parseCookies();
    console.log({ cookies });
    const access = cookies["hulu-access"];
    console.log({ access });
    return access;
}

export function getRefreshToken() {
    const cookies = parseCookies();
    console.log({ cookies });
    const userCookie = cookies["hulu-user"];
    if (userCookie) {
        const refresh = userCookie;
        return refresh;
    }
    return null;
}
