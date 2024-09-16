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
    const token = localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
    console.log("TOKEN hook:" + token);

    if (token) {
      axiosInterceptorInstance
        .get("/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
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
      router.push(Routes.private.lessons);
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
