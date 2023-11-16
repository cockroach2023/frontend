import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const form_data = new FormData();

    form_data.append("username", formData.username);
    form_data.append("password", formData.password);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/login",
        form_data,
      );

      const { access_token } = response.data;

      // 세션 스토리지 내 저장
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("is_login", "true");
      getUserId(access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserId = async (access_token) => {
    try {
      const response = await axios.get("http://localhost:8000/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      sessionStorage.setItem("user_id", response.data.user_id);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex justify-center items-center w-screen h-screen bg-neutral-100 font-['JeonjuCraftGoR']">
        <div className="flex flex-row w-1/2 h-2/3 relative">
          <div className="w-2/3 h-full absolute bg-white flex justify-center items-center">
            <div className="gap-10 flex flex-col justify-center items-center w-1/2">
              <div className="text-5xl">Welcome!</div>
              <div className="w-full">
                <div className="text-gray-400 w-full">아이디</div>
                <input
                  className="border-b w-full"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <div className="w-full text-gray-400">비밀번호</div>
                <input
                  className="w-full border-b"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <button
                className="rounded-3xl bg-slate-400 w-full h-10 text-white"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="w-1/3 absolute right-0 h-full">
            <div className="w-full h-full absolute bg-[url('./assets/login_pic.jpg')] bg-containe bg-center"></div>
            <div className="w-full h-full relative top-0 right-0 bg-black opacity-50">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
