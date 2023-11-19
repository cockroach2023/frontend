import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import {
  Busan,
  ChungcheongNorth,
  ChungcheongSouth,
  City,
  Daegu,
  Daejeon,
  Gangwon,
  Gwangju,
  Gyeonggi,
  GyeongsangNorth,
  GyeongsangSouth,
  Incheon,
  JeollaNorth,
  JeollaSouth,
  Seoul,
  Ulsan,
} from "./MainPage.jsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [cityValue, setCityValue] = useState("서울특별시");
  const [detail, setDetail] = useState();
  const [detailValue, setDetailValue] = useState([]);

  useEffect(() => {
    if (detail) {
      const area = cityValue + " " + detail;
      setFormData((prevData) => ({
        ...prevData,
        ["activity_area"]: area,
      }));
    }
  }, [cityValue, detail]);
  console.log(detail);

  useEffect(() => {
    switch (cityValue) {
      case "서울특별시":
        setDetailValue(Seoul);
        break;
      case "부산광역시":
        setDetailValue(Busan);
        break;
      case "대구광역시":
        setDetailValue(Daegu);
        break;
      case "인천광역시":
        setDetailValue(Incheon);
        break;
      case "광주광역시":
        setDetailValue(Gwangju);
        break;
      case "대전광역시":
        setDetailValue(Daejeon);
        break;
      case "울산광역시":
        setDetailValue(Ulsan);
        break;
      case "경기도":
        setDetailValue(Gyeonggi);
        break;
      case "강원도":
        setDetailValue(Gangwon);
        break;
      case "충청북도":
        setDetailValue(ChungcheongNorth);
        break;
      case "충청남도":
        setDetailValue(ChungcheongSouth);
        break;
      case "경상북도":
        setDetailValue(GyeongsangNorth);
        break;
      case "경상남도":
        setDetailValue(GyeongsangSouth);
        break;
      case "전라북도":
        setDetailValue(JeollaNorth);
        break;
      case "전라남도":
        setDetailValue(JeollaSouth);
        break;
      default:
        setDetailValue([]); // 기본값은 빈 배열로 설정
    }
  }, [cityValue]);

  const [formDatas, setFormData] = useState({
    username: "",
    password: "",
    activity_area: "",
    nickname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const formData = new FormData();

      formData.append("username", formDatas.username);
      formData.append("password", formDatas.password);
      formData.append("activity_area", formDatas.activity_area);
      formData.append("nickname", formDatas.nickname);

      const response = await axios.post(
        "api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        console.log("User created successfully!");
        window.location.href = "/login";
      } else {
        console.error("Error creating user");
        alert("회원가입 도중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                <input
                  className="border-b w-full focus:outline-none"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <div className="w-full text-gray-400">비밀번호</div>
                <input
                  className="w-full border-b focus:outline-none"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <div className="w-full text-gray-400">활동지역</div>

                <div className="w-full flex gap-2">
                  <select
                    className="grow border focus:outline-none py-2 mt-1 rounded-md"
                    value={cityValue}
                    onChange={(e) => {
                      setCityValue(e.target.value);
                    }}
                  >
                    {City.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <select
                    className="grow border focus:outline-none py-2 mt-1 rounded-md"
                    onChange={(e) => {
                      setDetail(e.target.value);
                    }}
                  >
                    {detailValue.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full text-gray-400">닉네임</div>
                <input
                  className="w-full border-b focus:outline-none"
                  name="nickname"
                  onChange={handleChange}
                />
              </div>

              <button
                className="rounded-3xl bg-slate-400 w-full h-10 text-white"
                onClick={handleSubmit}
              >
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
