import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { LikeIcon, CheckIcon, WriteIcon } from "../components/Icons.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  // 판매자인지 아닌지 확인
  const [isSeller, setIsSeller] = useState(false);
  const [data, setData] = useState({});
  const [dealData, setDealData] = useState([]);

  // 모달 관련 변수
  const [approvePurchaseModal, setApprovePurchaseModal] = useState(false);

  useEffect(() => {
    if (data !== {}) {
      const user_id = sessionStorage.getItem("user_id");
      if (user_id == data?.owner?.user_id) {
        setIsSeller(true);
      }
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = sessionStorage.getItem("access_token");

        const response = await axios.get(
          `http://localhost:8000/product/${params.product_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // 구매 요청하기
  const purchaseRequest = async () => {
    const isLogin = sessionStorage.getItem("is_login");
    if (isLogin !== "true") {
      navigate("/login");
    }
    try {
      const access_token = sessionStorage.getItem("access_token");

      const response = await axios.post(
        `http://localhost:8000/deal/?product_id=${data?.product_id}`,
        {},
        {
          // 헤더 설정
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      // 응답 데이터에 대한 처리
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.detail === "You already requested deal") {
        alert("이미 구매 요청을 하셨습니다.");
      }
    }
  };

  // 구매 승인하기
  const approvePurchase = async () => {
    setApprovePurchaseModal(true);

    try {
      const access_token = sessionStorage.getItem("access_token");

      const response = await axios.get(`http://localhost:8000/deal`, {
        // 헤더 설정
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setDealData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 버튼 누르기
  const pushLike = async () => {
    try {
      const access_token = sessionStorage.getItem("access_token");

      const response = await axios.post(
        `http://localhost:8000/product/${data?.product_id}/like`,
        {},
        {
          // 헤더 설정
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      // 응답 데이터에 대한 처리
      console.log(response.data);
    } catch (error) {
      alert("이미 좋아요를 눌렀습니다.");
      console.error(error);
    }
  };
  console.log(data);
  return (
    <div>
      <Header />
      <div className="my-16 h-full flex justify-center font-['JeonjuCraftGoR']">
        <div className="mx-56 p-8 w-full border-x-2">
          <div className="flex flex-col gap-6">
            {/* 상품사진 */}
            <div className="w-full h-96 flex justify-center items-center border-b">
              <img src={data?.image} />
            </div>

            <div className="flex mx-3 items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 판매자 프로필 */}
                <div className="rounded-full bg-gray-400 w-16 h-16" />
                <span>
                  <div className="font-bold">{data?.owner?.username}</div>
                  <div className="text-sm">({data?.owner?.activity_area})</div>
                </span>
              </div>
              <div className="flex justify-end gap-8 items-center">
                {/* 가격 */}
                <div className="text-2xl font-bold">{data?.price}원</div>
                {/* 관심 버튼 */}
                <div
                  className="rounded-full border-black border-2 h-full p-2 hover:bg-gray-300"
                  onClick={pushLike}
                >
                  <LikeIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-20 mx-3 my-16">
            {/* 상품이름 */}
            <div className="text-xl font-bold">{data?.title}</div>
            {/* 상품 설명 */}
            <div>{data?.description}</div>

            <div className="flex justify-between">
              <div>2020년 11월 15일</div>
              <div className="text-gray-500">관심 {data?.like_count}</div>
            </div>

            {isSeller ? (
              <div
                className="flex justify-end cursor-pointer"
                onClick={approvePurchase}
              >
                <div
                  className="flex justify-center items-center gap-3
              rounded-lg border-black border-2 w-48 h-12 hover:bg-gray-300"
                >
                  {/* 구매 요청 / 구매자 확정 */}
                  <CheckIcon />
                  <div>구매 승인</div>
                </div>
              </div>
            ) : (
              <div
                className="flex justify-end cursor-pointer"
                onClick={purchaseRequest}
              >
                <div
                  className="flex justify-center items-center gap-3
              rounded-lg border-black border-2 w-48 h-12 hover:bg-gray-300"
                >
                  {/* 구매 요청 / 구매자 확정 */}
                  <CheckIcon />
                  <div>구매 요청</div>
                </div>
              </div>
            )}
          </div>

          <div className="my-32 border-t">
            <div className="my-6 text-lg font-bold">댓글</div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="font-bold">byronna</div>
                <div>거래장소는 어디 희망하시나요</div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold">byronna</div>
                <div>거래장소는 어디 희망하시나요</div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold">byronna</div>
                <div>거래장소는 어디 희망하시나요</div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-20 gap-4">
            <textarea className="resize-none w-full h-20 border-2 p-1"></textarea>
            <div className="flex items-center justify-center rounded-lg border-2 w-16 h-full hover:bg-gray-300">
              <WriteIcon />
            </div>
          </div>
        </div>
      </div>
      {approvePurchaseModal ? (
        <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0">
          <div className="w-80 h-96 border bg-slate-100 p-3 flex flox-col justify-center items-center">
            {dealData?.map((value, index) => (
              <div key={index} className="border-b w-full">
                여기에 거래 승인
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductPage;
