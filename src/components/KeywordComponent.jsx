import React from "react";
import axios from 'axios';

const KeywordComponent = ({ value, mutate }) => {

  const removeKeyword = () => {
    const access_token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    axios
      .delete(
        `/api/keyword?keyword_id=${value.keyword_id}`
        ,{ headers }
      )
      .then((response) => {
        alert("키워드가 정상적으로 삭제되었습니다.");
        mutate();
      });
  }
  
  return (
    <div className="flex gap-2 border w-fit rounded-2xl p-1 items-center justify-center cursor-pointer" onClick={removeKeyword}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h.008v.008H6V6z"
        />
      </svg>
      <span className="text-sm">{value.content}</span>
    </div>
  );
};

export default KeywordComponent;
