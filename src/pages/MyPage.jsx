import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ProductRequest from "../components/ProductRequest.jsx";
import ProductComponent from "../components/ProductComponent.jsx";
import axios from "axios";
import useSWR from "swr";
import { fetcher_with_user } from "../utils/fetchers.js";
import KeywordComponent from "../components/KeywordComponent.jsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [keyword, setKeyword] = useState();

  const { data, mutate } = useSWR(
    "http://localhost:8000/keyword",
    fetcher_with_user,
  );
  const addKeyword = () => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json", // You may need to adjust the content type based on your API requirements
    };
    axios
      .post(
        "http://localhost:8000/keyword",
        {
          content: keyword,
        },
        { headers },
      )
      .then((response) => {
        console.log(response);
        mutate();
      });
  };
  return (
    <div>
      <Header />

      <div className="w-screen h-screen font-['JeonjuCraftGoR'] flex w-inherit">
        <div className="w-80 h-full border-r flex flex-col pt-28 items-center gap-4 overflow-y-scroll">
          <div className="text-2xl">Profile</div>
          <div className="w-60 h-60 bg-slate-100 rounded-lg"></div>
          <div className="w-60 flex gap-2 border-b pb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div>홍길동</div>
          </div>
          <div className="w-60 flex gap-2 border-b pb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <div>서울광역시 성수동</div>
          </div>
          <div className="text-xl w-60 border p-2 rounded-md text-center mt-10">
            관심 키워드 추가하기
          </div>
          <div className="flex gap-2 w-60 justify-between border-b pb-3">
            <input
              placeholder="키워드 입력..."
              className="border p-1"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="border p-1" onClick={addKeyword}>
              추가
            </button>
          </div>

          <div className="w-60 flex gap-1 flex-wrap">
            {data?.data.map((value, index) => (
              <KeywordComponent key={index} value={value} />
            ))}
          </div>
        </div>

        <div className="h-full flex-1 pt-28 p-28 overflow-y-scroll gap-6">
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">관심 내역</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              <ProductComponent />
              <ProductComponent />
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">판매 내역</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">구매 내역</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
              <div className="w-48 h-48 bg-slate-100 inline-block m-4 snap-center relative">
                <div className="absolute bottom-0 flex flex-col justify-center items-center w-full bg-black text-white opacity-50">
                  <div className="border-b">냉장고 팝니다..!</div>
                  <div>가격 : 300000</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-80 border-l flex flex-col pt-28 items-center gap-4 overflow-y-scroll">
          <div className="text-2xl">구매 요청</div>
          <ProductRequest />
          <ProductRequest />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
