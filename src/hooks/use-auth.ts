import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Constants } from "../utils/constants";
import { Routes } from "../utils/routes";
import { User } from "../utils/types";
import axiosInterceptorInstance from "../config/api-interceptor";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (
      [Routes.auth.login, Routes.auth.register].includes(
        window.location.pathname
      )
    ) {
      return;
    }
    const token = localStorage.getItem(Constants.ACCESS_TOKEN_KEY);

    if (token) {
      axiosInterceptorInstance
        .get("/auth/check")
        .then((response) => {
          // setUser(response.data.user);
        })
        .catch(() => {
          // logout();
        })
        .finally(() => setLoading(false));
    } else {
      logout();
      setLoading(false);
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInterceptorInstance.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem(Constants.ACCESS_TOKEN_KEY, token);
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
    setUser(null);
    router.push(Routes.auth.login);
  };

  return { user, userLoading, login, logout };
};

export default useAuth;
