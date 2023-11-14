import React from "react";

const EachProduct = () => {
  return (
    <div className="w-60 h-60 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80 border flex flex-col p-4">
      <div className="bg-black w-full h-full"></div>
      <div className="border-b">제목 입력</div>
      <div>가격 입력</div>
    </div>
  );
};

export default EachProduct;
