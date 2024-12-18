import axios from "axios";
import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { LOCAL_SERVER_URL } from "../../config";


// Define the type for the user object
interface User {
  id: string;
  name: string;
  age: number;
  country: string;
  books: string[];
}

// Define props for CurrentUserLoader
interface CurrentUserLoaderProps {
  children: ReactNode;
}

const CurrentUserLoader: FC<CurrentUserLoaderProps> = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${LOCAL_SERVER_URL}/current-user`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement<any>, { user });
        }
        return child;
      })}
    </>
  );
};

export default CurrentUserLoader;
