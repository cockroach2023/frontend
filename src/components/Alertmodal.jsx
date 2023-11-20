import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher, { fetcher_with_user } from "../utils/fetchers.js";
import AlertDetail from "./AlertDetail.jsx";

const Alertmodal = () => {
  const { data } = useSWR("/api/notice/", fetcher_with_user);
  const [alertData, setAlertData] = useState([]);
  useEffect(() => {
    setAlertData(data?.data.reverse());
  }, [data]);
  return (
    <div className="absolute w-80 h-96 flex flex-col items-center z-10 bg-white translate-x-[-46%] translate-y-[15px]">
      <div className="w-10 h-10 bg-white rounded-10 rotate-[135deg] top-6"></div>
      <div
        className="text-black flex flex-col overflow-scroll-y"
        style={{ zIndex: "2" }}
      >
        {alertData?.map((value, index) => (
          <AlertDetail value={value} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Alertmodal;
