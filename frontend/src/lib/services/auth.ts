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
}

export async function register(data: z.infer<typeof registerSchema>) {
  try {
    const response = await api.post<AuthResponse>("/register/", data);

    // Store user data
    if (response.data && response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

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
    console.log("login data", data);

    const response = await api.post<AuthResponse>("/login/", data);
    console.log("login response", response.data);

    // Store user data only (tokens are in HTTP-only cookies)
    if (response.data && response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
}

export async function logout() {
  try {
    // Call the logout endpoint to clear cookies on the server
    await api.post("/logout/");
    // Clear local storage
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear local storage even if the API call fails
    localStorage.removeItem("user");
    throw error;
  }
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
