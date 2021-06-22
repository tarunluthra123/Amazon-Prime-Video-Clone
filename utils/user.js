import { useSelector, useDispatch } from "react-redux";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { login, logout } from "../redux/auth";
import { refreshToken, getUserDetails } from "./api";

export function getUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    if (user) return user;

    const cookies = parseCookies();

    const userCookie = cookies["hulu-user"];

    if (userCookie) {
        const refresh = userCookie;
        refreshToken(refresh)
            .then(async (response) => {
                const access = response.access;
                const user = await getUserDetails(access);
                if (user.error) {
                    console.error(user.error);
                    return;
                }
                user.access = access;

                console.log("Logged in from cookie");
                dispatch(login(user));
            })
            .catch((error) => {
                console.error(error);
                destroyCookie(null, "hulu-user");
            });
    }

    return null;
}

export function logoutUser(dispatch) {
    destroyCookie(null, "hulu-user");

    dispatch(logout());
}

export function loginUser(dispatch, user, refresh) {
    dispatch(login(user));

    setCookie(null, "hulu-user", refresh, {
        maxAge: 60 * 60,
    });

    setCookie(null, "hulu-access", user.access, {
        maxAge: 60 * 15
    })
}
