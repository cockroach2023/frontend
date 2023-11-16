import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { titleState } from "../state/atoms.js";

function calculateTimeDifference(dateString) {
  // 주어진 날짜 문자열을 Date 객체로 변환
  var targetDate = new Date(dateString);
  var currentDate = new Date();

  // 두 날짜의 차이를 밀리초로 계산
  var timeDifference = currentDate - targetDate;

  // 차이를 초, 분, 시간, 일로 변환
  var seconds = Math.floor(timeDifference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  // 결과 반환
  if (seconds < 60) {
    return seconds + "초 전";
  } else if (minutes < 60) {
    return minutes + "분 전";
  } else if (hours < 24) {
    return hours + "시간 전";
  } else {
    return days + "일 전";
  }
}

const AlertDetail = ({ value }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useRecoilState(titleState);
  const clickAlert = () => {
    setTitle(value.keyword_content);
    navigate("/");
  };

  return (
    <div
      onClick={clickAlert}
      className="flex justify-between px-3 flex-col gap-1 border-b pb-1 hover:bg-slate-100 text-sm"
    >
      <div className="pt-1">
        <span className="text-red-500">•</span>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span className="text-red-500">{value.keyword_content}</span>
        <span> 관련 키워드의 게시물이 올라왔어요.</span>
      </div>
      <div className="text-sm text-slate-400">
        {calculateTimeDifference(value.created_at)}
      </div>
    </div>
  );
};

export default AlertDetail;
