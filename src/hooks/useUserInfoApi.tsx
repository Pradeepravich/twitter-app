import { useCallback, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../config";

const useUserInfoApi = (email: string, password: string) => {
  const [value, setValue] = useState<any>([]);
  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}${password ? `&password=${password}` : ``} `);
      setValue(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  },[email, password])

  return {
    user: value,
    getUser: fetchUser,
  };
};

export default useUserInfoApi;
