import Api from '../utils/client';

export async function retrieveUser() {
  const response = await Api.get('/profile');
  return response;
}

export async function signInUser({ email, password }) {
  const response = await Api.post('/auth', { email, password });
  return response;
}

export async function signUpUser({ email, password, name }) {
  const response = await Api.post('/auth/create', { email, password, name });
  return response;
}
