const HULU_REFRESH_TOKEN = 'hulu-refresh-token';
const HULU_AUTH_TOKEN = 'hulu-auth-token';

export function setRefreshToken(refresh) {
  localStorage.setItem(HULU_REFRESH_TOKEN, refresh);
}

export function removeRefreshToken() {
  localStorage.removeItem(HULU_REFRESH_TOKEN);
}

export function getRefreshToken() {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(HULU_REFRESH_TOKEN);
}

export function setAuthToken(access) {
  localStorage.setItem(HULU_AUTH_TOKEN, access);
}

export function getAuthToken() {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(HULU_AUTH_TOKEN);
}