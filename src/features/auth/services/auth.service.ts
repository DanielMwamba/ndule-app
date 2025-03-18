import { API_ROUTES } from "@/constants";
import { LoginCredentials, RegisterCredentials, User } from "../types";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const response = await fetch(API_ROUTES.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(API_ROUTES.AUTH.LOGOUT, {
        method: "POST",
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        return null;
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
