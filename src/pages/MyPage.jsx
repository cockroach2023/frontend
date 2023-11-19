import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ProductRequest from "../components/ProductRequest.jsx";
import ProductComponent from "../components/ProductComponent.jsx";
import axios from "axios";
import useSWR from "swr";
import { fetcher_with_user } from "../utils/fetchers.js";
import KeywordComponent from "../components/KeywordComponent.jsx";

const MyPage = () => {
  const [keyword, setKeyword] = useState([]);
  const [profile, setProfile] = useState(null);
  const [liked, setLiked] = useState([]);
  const [selling, setSelling] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json", // You may need to adjust the content type based on your API requirements
    };
    axios
      .get("api/user/me", { headers })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("api/product/user/liked", { headers })
      .then((response) => {
        setLiked(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("api/product/user/selling", { headers })
      .then((response) => {
        setSelling(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("api/product/user/purchased", { headers })
      .then((response) => {
        setPurchased(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("api/deal", { headers })
      .then((response) => {
        setDeals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { data, mutate } = useSWR(
    "api/keyword",
    fetcher_with_user
  );
  const addKeyword = () => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "api/keyword",
        {
          content: keyword,
        },
        { headers }
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
        {/* {liked && selling && purchased && ( */}
        <div className="w-80 h-full border-r flex flex-col pt-28 items-center gap-4 overflow-y-scroll">
          <div className="text-2xl">Profile</div>
          <div className="w-60 h-60 rounded-lg">
            {profile &&
              (profile.profile ? (
                <img src={profile.profile}></img>
              ) : (
                <div className="bg-slate-200 rounded-full w-full h-full" />
              ))}
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div>{profile && profile.nickname}</div>
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

            <div>{profile && profile.activity_area}</div>
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
            <div className="flex flex-col gap-3 mb-10">
              {data?.data.map((value, index) => (
                <KeywordComponent key={index} value={value} />
              ))}
            </div>
          </div>
        </div>
        {/* )} */}

        <div className="h-full flex-1 pt-28 p-28 overflow-y-scroll gap-6">
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">좋아요 누른 상품</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              {liked.map((product) => (
                <ProductComponent key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">판매 중인 상품</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              {selling.map((product) => (
                <ProductComponent key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <div className="text-2xl">구매한 상품</div>
            <div className="w-full h-60 overflow-x-scroll whitespace-nowrap snap-x overflow-y-hidden">
              {purchased.map((product) => (
                <ProductComponent key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-full w-80 border-l flex flex-col pt-28 items-center gap-4 overflow-y-scroll">
          <div className="text-2xl">구매 요청</div>
          {deals.map((deal) => (
            <ProductRequest key={deal.deal_id} deal={deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
