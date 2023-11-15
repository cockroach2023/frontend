import React, { useState } from "react";

const ProductRequest = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-72 h-72 bg-slate-100 relative"
    >
      {!isHover ? (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3">
          등록하신 (냉장고 팝니다..!) 에 대한 구매요청이 들어왔습니다.
        </div>
      ) : (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3 cursor-pointer">
          해당 페이지로 이동하기
        </div>
      )}
    </div>
  );
};

export default ProductRequest;
