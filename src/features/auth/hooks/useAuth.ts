import { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: !!user,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      console.error(error);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const user = await authService.login(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Échec de la connexion",
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const user = await authService.register(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Échec de l'inscription",
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Échec de la déconnexion",
      }));
      throw error;
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
  };
};
