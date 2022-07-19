import { useSelector, useDispatch } from "react-redux";
import { refreshAuthToken, getUserDetails } from '../api';
import { loginUser } from '../utils/user';
import { removeRefreshToken, getRefreshToken } from '../utils/storage';

export default function getUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (user) return user;

  const refreshToken = getRefreshToken();

  if (!refreshToken)
    return null;
    
  refreshAuthToken(refreshToken)
      .then(async (response) => {
          const { access } = response;
          const user = await getUserDetails(access);
          if (user.error) {
              console.error(user.error);
              return;
          }

          loginUser(dispatch, access, refreshToken, user);
      })
      .catch((error) => {
          console.error(error);
          removeRefreshToken();
      });
}