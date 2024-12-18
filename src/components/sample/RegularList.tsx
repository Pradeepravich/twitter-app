import React from "react";

const RegularList = ({ items, sourceName, ItemComponent }: any) => {
  return (
    <div>
      {items.map((item: any, index) => (
        <div key={index}>
        <ItemComponent {...{ [sourceName]: item }} />
        {/* <ItemComponent author={item} /> */}
        </div>
      ))}
    </div>
  );
};

export default RegularList;
