import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductComponent = ({ product }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-48 h-48 bg-slate-100 m-4 inline-block snap-center relative"
    >
      {!isHover ? (
        <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
          <div className="border-b">{product.title}</div>
          <div>가격 : {product.price}</div>
        </div>
      ) : (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3 cursor-pointer">
          해당 페이지로 이동하기
        </div>
      )}
      <div>
        <img src={product.image} className="w-full h-full" />
      </div>
    </div>
  );
};
ProductComponent.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default ProductComponent;
