import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";

const ProductCreatePage = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setProductData((prevData) => ({
      ...prevData,
      image: "image sample",
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProductCreate = async () => {
    try {
      const priceFloat = parseFloat(productData.price);

      const requestData = {
        title: productData.title,
        description: productData.description,
        price: priceFloat,
        // Assuming productData.image is a URL or base64-encoded image data
        image: productData.image,
      };

      const token = sessionStorage.getItem("access_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/product",
        requestData,
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Product created successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-screen h-screen px-60">
        <div className="w-full h-full border-x pt-10">
          <div className="w-full h-full flex justify-center items-center pt-60 overflow-y-scroll pb-20">
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">상품 등록</div>
              <div>
                <div>상품 명</div>
                <div className="text-sm text-gray-400">
                  상품 종류와 특징이 명확히 드러나도록 해주세요
                </div>
              </div>
              <input
                className="border"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
              />

              <div>
                <div>상품 설명</div>
                <textarea
                  className="w-full border min-h-[100px]"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div>이미지 등록</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  </div>
                )}
              </div>
              <div>
                <div>가격 설정</div>
                <input
                  type="text"
                  className="border w-full"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                />
              </div>

              <button className="border mt-3" onClick={handleProductCreate}>
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;
