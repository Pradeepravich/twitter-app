import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../utils";

const useLogout = () => {
  const navigate = useNavigate();
  const logoutUser = useCallback(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      localStorage.removeItem("userData");
      navigate(PATHS.frontpage);
      return true;
    }
    return false;
  }, [navigate]);
  return {
    logoutUser: logoutUser,
  };
};

export default useLogout;
