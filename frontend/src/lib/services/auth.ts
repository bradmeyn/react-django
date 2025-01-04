// services/auth.ts
import { z } from "zod";
import { registerSchema, loginSchema } from "@schemas/auth";
import api from "./api";
import axios from "axios";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    practice: {
      id: string;
      name: string;
    };
    role: string;
    phone: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export async function register(data: z.infer<typeof registerSchema>) {
  try {
    const response = await api.post<AuthResponse>("/register/", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw error;
  }
}

export async function login(data: z.infer<typeof loginSchema>) {
  try {
    const response = await api.post<AuthResponse>("/token/", data);

    // Store tokens and user data
    localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("tokens");
  localStorage.removeItem("user");
}

export async function refreshToken() {
  try {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    const response = await api.post<{ access: string }>("/token/refresh/", {
      refresh: tokens.refresh,
    });

    localStorage.setItem(
      "tokens",
      JSON.stringify({
        ...tokens,
        access: response.data.access,
      })
    );

    return response.data;
  } catch (error) {
    logout();
    throw error;
  }
}
