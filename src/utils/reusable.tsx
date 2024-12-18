
import { PATHS } from "../utils";

export const logout = (navigate:(path:string)=>void) => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      localStorage.removeItem("userData");
      navigate(PATHS.frontpage);
      return true;
    }
    return false;
};


