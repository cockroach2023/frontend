import React from "react";
import Header from "../components/Header.jsx";
import { LikeIcon, CheckIcon, WriteIcon } from "../components/Icons.jsx";

const ProductPage = () => {
  return (
    <div>
      <Header />
      <div className="my-16 h-full flex justify-center">
        <div className="mx-56 p-8 w-full border-x-2">
          <div className="flex flex-col gap-6">
            {/* 상품사진 */}
            <div className="bg-black w-full h-96" />

            <div className="flex mx-3 items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 판매자 프로필 */}
                <div className="rounded-full bg-gray-400 w-16 h-16" />
                <span>
                  <div className="font-bold">byronna</div>
                  <div className="text-sm">(송파구 방이1동)</div>
                </span>
              </div>
              <div className="flex justify-end gap-8 items-center">
                {/* 가격 */}
                <div className="text-2xl font-bold">20,000원</div>
                {/* 관심 버튼 */}
                <div className="rounded-full border-black border-2 h-full p-2 hover:bg-gray-300">
                  <LikeIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12 mx-3 my-16">
            {/* 상품이름 */}
            <div className="text-xl font-bold">
              스피드랙 5단 철제 선반 (11/15일 내려드려요)
            </div>
            {/* 상품 설명 */}
            <div>
              가로 600 세로 400 높이 1800 철제 선반 정리 합니다. 11월 15일에
              내려드려요.
            </div>

            <div className="flex justify-between">
              <div>2020년 11월 15일</div>
              <div className="text-gray-500">조회 3 관심 8</div>
            </div>

            <div className="flex justify-center">
              <div
                className="flex justify-center items-center gap-3
              rounded-lg border-black border-2 w-48 h-12 hover:bg-gray-300"
              >
                {/* 구매 요청 / 구매자 확정 */}
                <CheckIcon />
                <div>구매 요청</div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <div className="my-4 text-lg font-bold">댓글</div>
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

          <div className="flex w-full h-20 gap-4">
            <textarea className="resize-none w-full h-20 border-2 p-1"></textarea>
            <div className="flex items-center justify-center rounded-lg border-2 w-16 h-full hover:bg-gray-300">
              <WriteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
