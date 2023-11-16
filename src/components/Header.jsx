import React, { useEffect, useState } from "react";
import Alertmodal from "./Alertmodal.jsx";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

const Header = () => {
  // const navigate = useNavigate();
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const hoverAlarm = () => {
    setIsAlarmOpen((prev) => !prev);
  };
  const logout = () => {
    setIsLogin(false);
    sessionStorage.removeItem("access_token");
  };

  useEffect(() => {
    const is_login = sessionStorage.getItem("is_login");
    if (is_login === "true") {
      setIsLogin(true);
    }
  }, []);
  return (
    <div className="z-10 fixed border-b-2 flex p-4 justify-between items-center w-full top-0 bg-white px-32 bg-gradient-to-r from-[#556270] to-[#FF6B6B] drop-shadow-lg">
      <div className="font-['WhiteAngelica'] text-3xl text-white cursor-pointer">
        <Link to="/">Old To Gold</Link>
      </div>

      <div className="flex gap-4 font-['JeonjuCraftGoR'] text-white">
        {!isLogin ? (
          <>
            <div className="cursor-pointer">
              <Link to="/login">로그인</Link>
            </div>
            <div className="cursor-pointer">
              <Link to="/register">회원가입</Link>
            </div>
          </>
        ) : (
          <>
            <div className="cursor-pointer relative">
              <svg
                onClick={hoverAlarm}
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
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              {isAlarmOpen ? <Alertmodal /> : <></>}
            </div>

            <div className="cursor-pointer">
              <Link to="/product-create">글 작성하기</Link>
            </div>
            <div className="cursor-pointer" onClick={logout}>
              로그아웃
            </div>
            <div className="cursor-pointer">
              <Link to="/mypage">마이페이지</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
