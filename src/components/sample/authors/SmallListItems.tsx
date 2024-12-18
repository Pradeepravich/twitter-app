import React from "react";

const SmallListItems = ({ author }: any) => {
  const { name, age } = author;
  return (
    <div>
      <p> Name: {name} </p>
      <p> Age: {age} </p>
    </div>
  );
};

export default SmallListItems;
