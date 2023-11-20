import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { titleState } from "../state/atoms.js";

function calculateTimeDifference(inputDate) {
  const inputDateTime = new Date(inputDate);
  const currentDateTime = new Date();
  const timeDifference = currentDateTime - inputDateTime;
  console.log(timeDifference);

  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutesDifference < 60) {
    return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
  }
}

const AlertDetail = ({ value }) => {
  console.log(value.created_at);
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
