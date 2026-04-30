import { useEffect } from "react";
import api from "../lib/axios";
import { useAuth } from "@clerk/react";

let isInterceptorRegistered = false;

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // include token to axios request
  useEffect(() => {
    if (isInterceptorRegistered) return;
    isInterceptorRegistered = true;

    const interceptor = api.interceptors.request.use(async (config) => {
      if (!isSignedIn) {
        return config;
      }

      // add token to axios request header
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
