import { useEffect, useState } from "react";
import { LOCAL_SERVER_URL } from "../../config";
import axios from "axios";

interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}

const useCustomUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const currentUser = () => {
      axios
        .get(`${LOCAL_SERVER_URL}/current-user`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    currentUser();
  }, []);
  return user;
};

export default useCustomUser;
