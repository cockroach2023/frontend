import React, { useState } from "react";

const ProductComponent = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative"
    >
      {" "}
      {!isHover ? (
        <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
          <div className="border-b">냉장고 팝니다..!</div>
          <div>가격 : 300000</div>
        </div>
      ) : (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3 cursor-pointer">
          해당 페이지로 이동하기
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
