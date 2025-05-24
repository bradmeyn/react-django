interface Practice {
  id: string;
  name: string;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  practice: Practice;
  role: string;
  phone: string;
}

interface AuthTokens {
  refresh: string;
  access: string;
}

interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export const AUTH_TOKENS_KEY = "auth_tokens";
export const USER_KEY = "user";

export const storeAuth = (authResponse: AuthResponse) => {
  localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authResponse.tokens));
  localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
};

export const getTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem(AUTH_TOKENS_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKENS_KEY);
  localStorage.removeItem(USER_KEY);
};
