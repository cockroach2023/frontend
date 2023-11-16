import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EachProduct = ({ value }) => {
  const navigate = useNavigate();
  const moveProductPage = () => {
    navigate(`/product/${value.product_id}`);
  };

  const [isMouseIn, setIsMouseIn] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
      className="relative w-60 h-60 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80 flex flex-col p-4 cursor-pointer ring-2 ring-slate-200"
    >
      <div className="w-full h-full justify-center items-center flex">
        <img src={value.image} alt="image" />
      </div>
      <div className="border-b pb-2">{value.title}</div>
      <div className="pt-2">가격 : {value.price}</div>
      {isMouseIn ? (
        <div
          onClick={moveProductPage}
          className="absolute w-full h-full bg-black left-0 top-0 opacity-70 flex justify-center items-center"
        >
          <div className="text-white">페이지 이동하기</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EachProduct;
