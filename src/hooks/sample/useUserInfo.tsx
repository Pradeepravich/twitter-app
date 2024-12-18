import axios from "axios";
import { useEffect, useState } from "react";
import { LOCAL_SERVER_URL } from "../../config";
interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}
const useUserInfo = (userId: string) => {
  const [user, setUser] = useState<User>();
  console.log("user", user);
  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get(`${LOCAL_SERVER_URL}/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    userInfo();
  }, [userId]);
  return user;
};

export default useUserInfo;
