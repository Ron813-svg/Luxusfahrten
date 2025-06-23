import { useCallback } from "react";

const useLoginUser = () => {
  return useCallback(async (loginData) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);
};

export default useLoginUser;