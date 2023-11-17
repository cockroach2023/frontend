import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductRequest = ({ deal }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-72 h-72 bg-slate-100 relative"
    >
      {!isHover ? (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3">
          {deal.buyer.username}님이 {deal.product.title}을 사고싶어 합니다.
        </div>
      ) : (
        <div className="absolute w-full h-full bg-black opacity-50 text-white flex justify-center items-center p-3 cursor-pointer">
          <a href={`/product/${deal.product_id}`}>해당 페이지로 이동하기</a>
        </div>
      )}
      <img src={deal.product.image} alt={deal.product.title} />
    </div>
  );
};
ProductRequest.propTypes = {
  deal: PropTypes.shape({
    deal_id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    buyer_id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    buyer: PropTypes.shape({
      username: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      activity_area: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
    }),
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
};

export default ProductRequest;
