import React from "react";

const Header = () => {
  return (
    <div className="fixed border-b-2 flex p-4 justify-between w-full top-0 bg-white">
      <div className="font-['JeonjuCraftGoR'] text-3xl">올드 투 골드</div>

      <div className="flex gap-4 font-['JeonjuCraftGoR']">
        <div>글 작성하기</div>
        <div>로그인</div>
        <div>회원가입</div>
      </div>
    </div>
  );
};

export default Header;
