import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { LikeIcon, CheckIcon, WriteIcon } from "../components/Icons.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../utils/fetchers.js";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  // 판매자인지 아닌지 확인
  const [isSeller, setIsSeller] = useState(false);
  const [data, setData] = useState({});
  const [dealData, setDealData] = useState([]);
  const [productId, setProductId] = useState();

  // 댓글 변수
  const [comment, setComment] = useState("");

  // 팔렸는지(거래 되었는 지 확인하는 변수)
  const [isSold, setIsSold] = useState(false);

  // 좋아요 변수
  const [like, setLike] = useState(0);

  // 모달 관련 변수
  const [approvePurchaseModal, setApprovePurchaseModal] = useState(false);

  // 댓글 지속적으로 불러오기
  const { data: commentData, mutate } = useSWR(
    `api/product/${productId}/comment`,
    fetcher,
  );

  console.log(commentData);

  // 초기 데이터 렌더링
  useEffect(() => {
      const user_id = sessionStorage.getItem("user_id");
      if (user_id == data?.owner?.user_id) {
        setIsSeller(true);
      }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = sessionStorage.getItem("access_token");

        const response = await axios.get(
          `api/product/${params.product_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        setData(response.data);
        setLike(response.data.like_count);
        setProductId(response.data.product_id);

        if (response.data.is_sold) {
          setIsSold(true);
        }
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
        `api/deal/?product_id=${productId}`,
        {},
        {
          // 헤더 설정
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      alert("상품 구매 요청하였습니다.");

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
    if (isSold) {
      alert("이미 판매된 상품입니다.");
      return;
    }
    setApprovePurchaseModal(true);

    try {
      const access_token = sessionStorage.getItem("access_token");

      const response = await axios.get(`api/deal`, {
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
        `api/product/${productId}/like`,
        {},
        {
          // 헤더 설정
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      alert("관심 등록하였습니다.");
      setLike((prev) => prev + 1);

      // 응답 데이터에 대한 처리
      console.log(response.data);
    } catch (error) {
      alert("이미 좋아요를 눌렀습니다.");
      console.error(error);
    }
  };

  const calculateTimeElapsed = (startTime) => {
    var currentTime = new Date();
    var startDate = new Date(startTime);
    var elapsedMilliseconds = currentTime - startDate;
    var elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    var elapsedMinutes = Math.floor(elapsedSeconds / 60);
    var elapsedHours = Math.floor(elapsedMinutes / 60);
    var elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) {
      return elapsedDays + "일 전";
    } else if (elapsedHours > 0) {
      return elapsedHours + "분 전";
    } else if (elapsedMinutes > 0) {
      return elapsedMinutes + "초 전";
    } else {
      return "방금 전";
    }
  };

  const handleModalClose = () => {
    // 모달 외부를 클릭할 때 모달을 닫는 로직 추가
    if (approvePurchaseModal) {
      setApprovePurchaseModal(false);
    }
  };
  const handleModalClick = (e) => {
    // 모달 내부 클릭 시 이벤트 버블링 방지
    e.stopPropagation();
  };

  const makeDesision = async (deal_id) => {
    try {
      // Session Storage에서 access_token을 가져오기
      const access_token = sessionStorage.getItem("access_token");

      // 요청 헤더 설정
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      // axios를 사용하여 POST 요청 보내기
      const response = await axios.patch(
        `api/deal/${deal_id}/accept`,
        {},
        {
          headers,
        },
      );
      // 응답 확인
      console.log("응답 데이터:", response.data);
      alert(`${response.data.buyer.nickname}님이 거래 확정되었습니다.`);
    } catch (error) {
      // 오류 처리
      console.error("오류 발생:", error.message);
    }
  };

  // 댓글 달기
  const submitComment = async () => {
    try {
      // Session Storage에서 access_token을 가져오기
      const access_token = sessionStorage.getItem("access_token");

      // 요청 헤더 설정
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      // 요청 본문 데이터 설정
      const data = {
        content: comment,
      };

      // axios를 사용하여 POST 요청 보내기
      const response = await axios.post(
        `api/product/comment?product_id=${productId}`,
        data,
        { headers },
      );

      // 응답 확인
      mutate();
      console.log("응답 데이터:", response.data);
    } catch (error) {
      // 오류 처리
      if (error.message === "Request failed with status code 401") {
        alert("로그인을 해주세요.");
      }
      console.error("오류 발생:", error.message);
    }
  };

  console.log(data);
  return (
    <div>
      <Header />
      <div className="my-16 h-full flex justify-center font-['JeonjuCraftGoR']">
        <div className="mx-96 p-8 w-full border-x-2">
          <div className="flex flex-col gap-6 border-b pb-10">
            <div className="w-full h-96 flex flex-row gap-10">
              {/* 상품사진 */}
              <div
                className="w-96 h-96 flex justify-center items-center border-b bg-contain bg-no-repeat bg-center rounded-lg"
                style={{ backgroundImage: `url(${data?.image})` }}
              ></div>

              <div className="flex flex-col justify-between flex-1">
                {/* 상품이름 */}
                <div className="text-2xl font-bold border-b">{data?.title}</div>
                <div className="text-3xl font-bold">{data?.price}원</div>

                <div className="flex gap-1 border-b">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-400"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <div className="text-gray-500">{like}</div>
                </div>

                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="text-gray-400">• 거래지역</div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>{data?.owner?.activity_area}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isSeller ? (
                    <div
                      className="flex justify-end cursor-pointer"
                      onClick={approvePurchase}
                    >
                      <div
                        className="flex justify-center items-center gap-3
              rounded-lg bg-gray-400 text-white w-48 h-12 hover:bg-gray-500"
                      >
                        {/* 구매자 확정 */}
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
              rounded-lg bg-gray-400 text-white w-48 h-12 hover:bg-gray-500"
                      >
                        {/* 구매 요청 */}
                        <CheckIcon />
                        <div>구매 요청</div>
                      </div>
                    </div>
                  )}
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={pushLike}
                  >
                    <div
                      className="flex justify-center items-center gap-3
              rounded-lg bg-red-400 text-white w-48 h-12 hover:bg-red-500"
                    >
                      <CheckIcon />
                      <div>관심 등록</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-20">{data?.description}</div>

          <div className="flex mx-3 items-center justify-end mb-10">
            <div className="flex items-center gap-4">
              {/* 판매자 프로필 */}
              <div className="rounded-full bg-gray-400 w-16 h-16" />
              <span>
                <div className="font-bold">{data?.owner?.username}</div>
              </span>
            </div>
            <div className="flex justify-end gap-8 items-center"></div>
          </div>

          <div className="border-t">
            <div
              className="my-6 text-lg font-bold bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${data?.owner?.profile})` }}
            >
              댓글
            </div>

            <div className="flex flex-col gap-4">
              {commentData?.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="font-bold">{value?.author?.username}</div>
                  <div>{value?.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full h-20 gap-4 mt-6">
            <textarea
              className="resize-none w-full h-20 border-2 rounded-lg focus:outline-none p-2"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div
              className="flex items-center justify-center rounded-lg border-2 w-16 h-full hover:bg-gray-300"
              onClick={submitComment}
            >
              <WriteIcon />
            </div>
          </div>
        </div>
      </div>
      {approvePurchaseModal ? (
        <div
          className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 font-['JeonjuCraftGoR']"
          onClick={handleModalClose}
        >
          <div
            className="w-1/2 h-96 border bg-slate-100 p-3 flex flex-col rounded-lg"
            onClick={handleModalClick}
          >
            <div className="text-3xl font-bold border-b p-2 mb-3 fixed">
              도착한 <span className="text-yellow-400">거래 요청</span> 내역
            </div>
            <div className="mt-20 overflow-scroll-y">
              {dealData?.map((value, index) => (
                <div
                  key={index}
                  onClick={() => makeDesision(value?.deal_id)}
                  className="border-b w-full p-2 flex flex-col gap-3 hover:bg-gray-200 cursor-pointer"
                >
                  <div className="text-2xl font-bold">
                    {value?.buyer?.nickname}님이 거래를 요청하셨습니다.
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="text-gray-400">• 요청자 활동 위치</div>
                      <div>{value?.buyer?.activity_area}</div>
                    </div>
                    <div>{calculateTimeElapsed(value?.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductPage;
