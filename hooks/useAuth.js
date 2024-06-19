"use client";
import React, { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/authToken";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toekn = getToken();

  useEffect(() => {
    if (!toekn || toekn === undefined) {
      router.push("/auth/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      router.push("/");
    }
  }, [toekn, router]);

  return { isAuthenticated };
};

export default useAuth;
