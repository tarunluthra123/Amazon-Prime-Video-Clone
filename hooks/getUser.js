import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveUser } from "../api/user";
import { login } from "../redux/auth";

export default function getUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const fetchUser = async () => {
    const response = await retrieveUser();
    // if (response.user) {
    //   dispatch(login(response));
    // }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user) return user;

  return null;
}
