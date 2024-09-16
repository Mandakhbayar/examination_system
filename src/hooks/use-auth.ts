import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInterceptorInstance from "../config/api-interceptor";
import { Constants } from "../utils/constants";
import { Routes } from "../utils/routes";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInterceptorInstance
        .get("/auth/protected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInterceptorInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem(Constants.ACCESS_TOKEN_KEY, response.data.token);
      setUser(response.data.user);
      router.push(Routes.private.lessons);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
    setUser(null);
    router.push(Routes.auth.login); // Redirect to login page
  };

  return { user, userLoading, login, logout };
};

export default useAuth;
