import { z } from "zod";
import { registerSchema, loginSchema } from "@schemas/auth";

export const registerPractice = async (
  data: z.infer<typeof registerSchema>
) => {
  const response = await fetch("http://localhost:5282/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("register response", response);

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  const response = await fetch("http://localhost:5282/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
