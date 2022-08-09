import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import Sidebar from "../sidebar/Sidebar";
import SidebarMapDetail from "../sidebar/SidebarMapDetail";
import SidebarMyPageDetail from "../sidebar/SidebarMyPageDetail";
import SidebarSearchDetail from "../sidebar/SidebarSearchDetail";
import Map from "./Sections/Map";
import "./LandingPage.css";

export interface propsType {
  searchKeyword: string;
}

export interface AccomodationList {
  name: string;
  yanolja: number;
  yeogiattae: number;
  stars: number;
  img_src: string;
}

const LandingPage = (): JSX.Element => {
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState("");

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  // const keywordChange = (e: {
  //     preventDefault: () => void;
  //     target: { value: string };
  // }) => {
  //     e.preventDefault();
  //     setValue(e.target.value);
  // };

  // 제출한 검색어 state에 담아주는 함수
  // const submitKeyword = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //     setKeyword(Value);
  // };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  // const valueChecker = () => {
  //     if (Value === '') {
  //         alert('검색어를 입력해주세요.');
  //     }
  // };

  return (
    <>
      <HeaderComponent />
      <SearchComponent />
      <Sidebar AccomodationList={AccomodationList} />
      <div className="landing-page">
        <div className="landing-page__inner">
          <Map AccomodationList={AccomodationList}/>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

const AccomodationList = [
  {
    "id": 867,
    "name": "삼성 디에이스",
    "type": "MOTEL",
    "addressFullName": "서울 강남구 테헤란로77길 11-5",
    "region1DepthName": "서울",
    "region2DepthName": "강남구",
    "region3DepthName": "삼성동",
    "addressCode": "1168010500",
    "latitude": 37.5069797742866,
    "longitude": 127.054033368231,
    "price":15443
  },
  {
    "id": 1805,
    "name": "역삼 브라운도트",
    "type": "HOTEL",
    "addressFullName": "서울 강남구 테헤란로37길 13-5",
    "region1DepthName": "서울",
    "region2DepthName": "강남구",
    "region3DepthName": "역삼동",
    "addressCode": "1168010100",
    "latitude": 37.5028451432202,
    "longitude": 127.040286199577,
    "price":12341
  },
  {
    "id": 1876,
    "name": "대치 컬리넌",
    "type": "MOTEL",
    "addressFullName": "서울 강남구 테헤란로78길 14-16",
    "region1DepthName": "서울",
    "region2DepthName": "강남구",
    "region3DepthName": "대치동",
    "addressCode": "1168010600",
    "latitude": 37.5051075694305,
    "longitude": 127.054243850146,
    "price":1521000
  },
  {
    "id": 3119,
    "name": "삼성 캘리포니아",
    "type": "PENSION",
    "addressFullName": "서울 강남구 선릉로100길 52",
    "region1DepthName": "서울",
    "region2DepthName": "강남구",
    "region3DepthName": "삼성동",
    "addressCode": "1168010500",
    "latitude": 37.5066491822084,
    "longitude": 127.051439642145,
    "price":1032400
  },
  {
    "id": 3566,
    "name": "역삼 CF호텔",
    "type": "MOTEL",
    "addressFullName": "서울 강남구 언주로85길 10",
    "region1DepthName": "서울",
    "region2DepthName": "강남구",
    "region3DepthName": "역삼동",
    "addressCode": "1168010100",
    "latitude": 37.5012576880318,
    "longitude": 127.042272138321,
    "price":1123000
  }
];
