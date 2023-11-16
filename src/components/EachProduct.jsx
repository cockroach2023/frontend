import React from "react";

const EachProduct = ({ value }) => {
  return (
    <div className="w-60 h-60 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80 border flex flex-col p-4">
      <div className="bg-black w-full h-full"></div>
      <div className="border-b">{value.title}</div>
      <div>{value.price}</div>
    </div>
  );
};

export default EachProduct;
