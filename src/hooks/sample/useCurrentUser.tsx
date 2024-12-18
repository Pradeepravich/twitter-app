import { useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_SERVER_URL } from "../../config";

interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}

const useCurrentUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get(`${LOCAL_SERVER_URL}/current-user`);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    currentUser();
  }, []);
  return user;
};

export default useCurrentUser;
