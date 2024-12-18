import React from "react";
import useUserInfo from "../../hooks/sample/useUserInfo";
import useCurrentUser from "../../hooks/sample/useCurrentUser";
import useResource from "../../hooks/sample/useResource";
import { LOCAL_SERVER_URL } from "../../config";
import useCustomUser from "../../hooks/sample/useCustomUser";

interface UserInfoDataProps {
  userId: string;
}

const UserInfoData = ({ userId }: UserInfoDataProps) => {
//   const user = useUserInfo(userId);
//   const user = useCurrentUser();
  const user = useCustomUser();
//   const user = useResource(`${LOCAL_SERVER_URL}/users/2`);
  const { name, age, country, books } = user || {};
  return (
    <div>
      <p> Name: {name} </p>
      <p> Age: {age} </p>
      <p> Country: {country} </p>
      <p>
        Books:
        <ul>
          {books?.map((book: any, index: any) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default UserInfoData;
