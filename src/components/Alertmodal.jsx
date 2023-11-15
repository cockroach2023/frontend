import React from "react";

const Alertmodal = () => {
  return (
    <div className="absolute w-80 h-96 flex flex-col items-center z-10 bg-white translate-x-[-46%] translate-y-[15px]">
      <div className="w-10 h-10 bg-white rounded-10 rotate-[135deg] top-6"></div>
      <div
        className="text-black flex flex-col gap-3 overflow-scroll-y"
        style={{ zIndex: "2" }}
      >
        <div className="flex justify-between px-3 flex-col gap-1 border-b pb-1">
          <div>
            <span className="text-red-500">•</span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className="text-red-500">"냉장고"</span>
            <span>관련 키워드의 게시물이 올라왔어요.</span>
          </div>
          <div className="text-sm text-slate-400">3시간 전</div>
        </div>
        <div className="flex justify-between px-3 flex-col gap-1 border-b pb-1">
          <div>
            <span className="text-red-500">•</span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className="text-red-500">"냉장고"</span>
            <span>관련 키워드의 게시물이 올라왔어요.</span>
          </div>
          <div className="text-sm text-slate-400">3시간 전</div>
        </div>
      </div>
    </div>
  );
};

export default Alertmodal;
