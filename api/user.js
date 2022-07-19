import routes from "../constants/routes";
import client from "./client";

export async function signInUser(username, password) {
  const url = routes.auth.login.url;
  try {
    const response = await client
      .post(url, JSON.stringify({ username, password }))
      .then((res) => res.data);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
}

export async function signUpUser(username, password, name) {
  const url = routes.auth.signup.url;
  try {
    const response = await client
      .post(url, { username, password, name })
      .then((res) => res.data);

    return response;
  } catch (error) {
    return {
      error,
    };
  }
}

export async function refreshAuthToken(refresh) {
  const url = routes.auth.refresh.url;
  try {
    const response = await client
      .post(url, { refresh })
      .then((res) => res.data);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getUserDetails(access) {
  const url = routes.auth.details.url;
  try {
    const response = await client
      .get(url, { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => res.data);
    return response;
  } catch (error) {
    return {
      error,
    };
  }
}
