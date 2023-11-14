import React from "react";
import Header from "../components/Header.jsx";

const RegisterPage = () => {
  return (
    <div>
      <Header />

      <div className="flex justify-center items-center w-screen h-screen bg-neutral-100 font-['JeonjuCraftGoR']">
        <div className="flex flex-row w-1/2 h-3/4 relative">
          <div className="w-1/3 absolute left-0 h-full">
            <div className="w-full h-full absolute bg-[url('./assets/login_pic.jpg')] bg-containe bg-center"></div>
            <div className="w-full h-full relative top-0 right-0 bg-black opacity-50">
              <div></div>
            </div>
          </div>
          <div className="w-2/3 h-full absolute bg-white flex justify-center items-center right-0">
            <div className="gap-10 flex flex-col justify-center items-center w-1/2">
              <div className="text-5xl">Welcome!</div>
              <div className="w-full">
                <div className="text-gray-400 w-full">아이디</div>
                <input className="border-b w-full" />
              </div>
              <div className="w-full">
                <div className="w-full text-gray-400">비밀번호</div>
                <input className="w-full border-b" />
              </div>

              <div className="w-full">
                <div className="w-full text-gray-400">활동지역</div>
                <input className="w-full border-b" />
              </div>
              <div className="w-full">
                <div className="w-full text-gray-400">닉네임</div>
                <input className="w-full border-b" />
              </div>

              <button className="rounded-3xl bg-slate-400 w-full h-10 text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
