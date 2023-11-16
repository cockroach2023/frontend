import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import EachProduct from "../components/EachProduct.jsx";
import useSWR from "swr";
import fetcher from "../utils/fetchers.js";
import { useRecoilState } from "recoil";
import { titleState } from "../state/atoms.js";

export const City = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "경상북도",
  "경상남도",
  "전라북도",
  "전라남도",
];
export const Seoul = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

export const Busan = [
  "강서구",
  "금정구",
  "기장군",
  "남구",
  "동구",
  "동래구",
  "부산진구",
  "북구",
  "사상구",
  "사하구",
  "서구",
  "수영구",
  "연제구",
  "영도구",
  "중구",
  "해운대구",
];

export const Daegu = [
  "남구",
  "달서구",
  "달성군",
  "동구",
  "북구",
  "서구",
  "수성구",
  "중구",
];

export const Incheon = [
  "강화군",
  "계양구",
  "남구",
  "남동구",
  "동구",
  "부평구",
  "서구",
  "연수구",
  "중구",
];

export const Gwangju = ["광산구", "남구", "동구", "북구", "서구"];

export const Daejeon = ["대덕구", "동구", "서구", "유성구", "중구"];

export const Ulsan = ["남구", "동구", "북구", "중구", "울주군"];

export const Gyeonggi = [
  "가평군",
  "고양시",
  "과천시",
  "광명시",
  "광주시",
  "구리시",
  "군포시",
  "김포시",
  "남양주시",
  "동두천시",
  "부천시",
  "성남시",
  "수원시",
  "시흥시",
  "안산시",
  "안성시",
  "안양시",
  "양주시",
  "양평군",
  "여주군",
  "연천군",
  "오산시",
  "용인시",
  "의왕시",
  "의정부시",
  "이천시",
  "파주시",
  "평택시",
  "포천시",
  "하남시",
  "화성시",
];

export const Gangwon = [
  "강릉시",
  "고성군",
  "동해시",
  "삼척시",
  "속초시",
  "양구군",
  "양양군",
  "영월군",
  "원주시",
  "인제군",
  "정선군",
  "철원군",
  "춘천시",
  "평창군",
  "홍천군",
  "화천군",
  "횡성군",
];

export const ChungcheongNorth = [
  "괴산군",
  "단양군",
  "보은군",
  "영동군",
  "옥천군",
  "음성군",
  "제천시",
  "증평군",
  "진천군",
  "청원군",
  "청주시",
  "충주시",
];

export const ChungcheongSouth = [
  "계룡시",
  "공주시",
  "금산군",
  "논산시",
  "당진시",
  "보령시",
  "부여군",
  "서산시",
  "서천군",
  "아산시",
  "연기군",
  "예산군",
  "천안시",
  "청양군",
  "태안군",
  "홍성군",
];

export const GyeongsangNorth = [
  "경산시",
  "경주시",
  "고령군",
  "구미시",
  "군위군",
  "김천시",
  "문경시",
  "봉화군",
  "상주시",
  "성주군",
  "안동시",
  "영덕군",
  "영양군",
  "영주시",
  "영천시",
  "예천군",
  "울진군",
  "의성군",
  "청도군",
  "청송군",
  "칠곡군",
  "포항시",
];

export const GyeongsangSouth = [
  "거제시",
  "거창군",
  "고성군",
  "김해시",
  "남해군",
  "밀양시",
  "사천시",
  "산청군",
  "양산시",
  "의령군",
  "진주시",
  "창녕군",
  "창원시",
  "통영시",
  "하동군",
  "함안군",
  "함양군",
  "합천군",
];

export const JeollaNorth = [
  "고창군",
  "군산시",
  "김제시",
  "남원시",
  "무주군",
  "부안군",
  "순창군",
  "완주군",
  "익산시",
  "임실군",
  "장수군",
  "전주시",
  "정읍시",
  "진안군",
];

export const JeollaSouth = [
  "강진군",
  "고흥군",
  "곡성군",
  "광양시",
  "구례군",
  "나주시",
  "담양군",
];

const MainPage = () => {
  const [cityValue, setCityValue] = useState("");
  const [detail, setDetail] = useState("");
  const [detailValue, setDetailValue] = useState([]);

  const [title, setTitle] = useRecoilState(titleState);
  const [area, setArea] = useState("");
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(1000000);
  // low rendering, cache 사용을 위한 Hook
  const { data } = useSWR(
    `http://localhost:8000/product?title=${title}&area=${area}&price_start=${lowPrice}&price_end=${highPrice}`,
    fetcher,
  );

  console.log(data);
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

  useEffect(() => {
    setArea(cityValue + " " + detail);
  }, [cityValue, detail]);

  return (
    <div>
      <Header />
      <div className="min-h-screen font-['JeonjuCraftGoR'] p-28">
        {/* 상단 검색 창 */}

        <div className="mt-20 border border-slate-500 p-5 px-40">
          <div className="w-full flex flex-col gap-4">
            <div className="border-b flex justify-between items-center p-3">
              <div className="w-32 font-bold">검색어 입력</div>
              <input
                className="border w-full h-10 focus:outline-none pl-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex border-b p-3 gap-8 items-center">
              <div className="whitespace-nowrap font-bold">지역 선택</div>
              <div className="w-full flex gap-2">
                <select
                  className="grow border h-10 focus:outline-none text-center"
                  value={cityValue}
                  onChange={(e) => {
                    setCityValue(e.target.value);
                  }}
                >
                  {City.map((value, index) => (
                    <option key={index}>{value}</option>
                  ))}
                </select>
                <select
                  className="grow border h-10 focus:outline-none text-center"
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
            <div className="flex p-3 flex justify-between flex-col lg:flex-row items-center">
              <div className="font-bold">최소/최대 가격 지정</div>

              <input
                type="number"
                className="border h-10 text-center focus:outline-none"
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
              />
              <div>~</div>
              <input
                type="number"
                className="border text-center h-10 focus:outline-none"
                value={highPrice}
                onChange={(e) => setHighPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 최신 게시물 순 */}

        <div className="border-slate-500 place-items-center border grid mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pr-10 p-8">
          {data?.map((value, index) => (
            <EachProduct key={index} value={value}></EachProduct>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
