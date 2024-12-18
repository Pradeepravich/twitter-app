import React from "react";

const LargeListItems = ({ author }: any) => {
  // console.log("authors..", author)
  const { name, age, country, books } = author;
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

export default LargeListItems;
