import supabase from "../utils/supabase";

export async function retrieveUser() {
  const response = await supabase.auth.getSession();
  return response;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function signInUser({ email, password }) {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function signUpUser({ email, password, name }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      }
    }
  });
  return { data, error };
}
