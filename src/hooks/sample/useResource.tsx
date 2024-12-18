import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}

const useResource = (resourceUrl: string) => {
  const [resource, setResource] = useState<User>();
  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await axios.get(resourceUrl);
        const data = response.data;
        setResource(data);
      } catch (error) {
        console.error(error);
      }
    };
    currentUser();
  }, [resourceUrl]);
  return resource;
};

export default useResource;
