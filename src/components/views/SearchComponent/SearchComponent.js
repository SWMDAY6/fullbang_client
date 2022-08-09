import React, { useState } from "react";
import {
  bubjungdong_sido,
  bubjungdong_sigungu,
  bubjungdong_dong,
} from "./bubjungdong";
import button_minus from "../../../assets/button_minus.png";
import button_plus from "../../../assets/button_plus.png";
import { useGlobalContext } from "../../../context";

const SearchComponent = () => {
  const [sido, setSido] = useState("11");
  const [sigungu, setSigungu] = useState("680");
  const [dong, setDong] = useState("101");
  const [peopleNum, setPeopleNum] = useState(2);
  const [parkingAble, setParkingAble] = useState(0);
  const [parkingUnable, setParkingUnable] = useState(0);
  const { selectedAddress,setSelectedAddressDetail,setSelectedBoxAddressDetail,setMapCenter,mapCenter } = useGlobalContext();

  const handleSido = (e) => {
    setSido(e.target.value);
    setSelectedAddressDetail({
      sido:e.target.value,
      sigungu:0,
      dong:0
    });

    const v = bubjungdong_sido.find(v => v.sido === e.target.value);
    setSelectedBoxAddressDetail({sido:v.sido, sigungu:v.sigungu, dong:v.dong});
    setMapCenter({lat:v.latitude,lng:v.longitude,zoomLevel:10});
    // console.log(mapCenter);
    // console.log(v);
  };
  const handleSigungu = (e) => {
    setSigungu(e.target.value);
    setSelectedAddressDetail({
      sido:selectedAddress.sido,
      sigungu:e.target.value,
      dong:0
    });

    const v = bubjungdong_sigungu.find(v => v.sido === sido && v.sigungu === e.target.value);
    setSelectedBoxAddressDetail({sido:v.sido, sigungu:v.sigungu, dong:null});
    setMapCenter({lat:v.latitude,lng:v.longitude,zoomLevel:7});
    // console.log(mapCenter);
    // console.log(v);
  };
  const handleDong = (e) => {
    setDong(e.target.value);
    setSelectedAddressDetail({
      sido:selectedAddress.sido,
      sigungu:selectedAddress.sigungu,
      dong:e.target.value
    })

    const v = bubjungdong_dong.find(v => v.sido === sido && v.sigungu === sigungu && v.dong === e.target.value);
    setSelectedBoxAddressDetail({sido:v.sido, sigungu:v.sigungu, dong:v.dong});
    setMapCenter({lat:v.latitude,lng:v.longitude,zoomLevel:5});
    // console.log(mapCenter);
    // console.log(v);
  };
  const parkingAbleHandler = (e) => {
    setParkingAble(!parkingAble);
  };
  const parkingUnableHandler = (e) => {
    setParkingUnable(!parkingUnable);
  };
  const clearHandler = () => {
    setSido(0);
    setSigungu(0);
    setDong(0);
    setPeopleNum(2);
    setParkingAble(0);
    setParkingUnable(0);
  };
  return (
    <div className="SearchComponent">
      <div id="selectAddress">
        <select id="sido" onChange={handleSido} value={selectedAddress.sido}>
          <option value="0">시/도</option>
          {bubjungdong_sido.map((data, idx) => {
            return <option value={data.sido}>{data.codeNM}</option>;
          })}
        </select>
        <select
          id="sigugun"
          onChange={handleSigungu}
          value={selectedAddress.sigungu}
        >
          <option value="0">시/군/구</option>
          {bubjungdong_sigungu.map((data, idx) => {
            if (data.sido === selectedAddress.sido)
              return <option value={data.sigungu}>{data.codeNM}</option>;
          })}
        </select>
        <select id="dong" onChange={handleDong} value={selectedAddress.dong}>
          <option value="0">읍/면/동</option>
          {bubjungdong_dong.map((data, idx) => {
            if (data.sido === selectedAddress.sido && data.sigungu === selectedAddress.sigungu)
              return <option value={data.dong}>{data.codeNM}</option>;
          })}
        </select>
      </div>
      <div id="peopleNumber">
        <div>최대 인원</div>
        <button
          onClick={() => {
            if (peopleNum > 1) {
              setPeopleNum(peopleNum - 1);
            }
          }}
          id="peopleMinusButton"
        >
          <img src={button_minus} />
        </button>
        <div id="peopleNum">{peopleNum}</div>
        <button
          onClick={() => {
            if (peopleNum < 9) {
              setPeopleNum(peopleNum + 1);
            }
          }}
          id="peoplePlusButton"
        >
          <img src={button_plus} />
        </button>
      </div>
      <div id="Parking">
        <input
          type="checkbox"
          checked={parkingAble}
          id="parkingAble"
          onChange={(e) => parkingAbleHandler(e)}
        />
        <label for="parkingAble">주차가능</label>
        {/*<input*/}
        {/*  type="checkbox"*/}
        {/*  checked={parkingUnable}*/}
        {/*  id="parkingUnable"*/}
        {/*  onChange={(e) => parkingUnableHandler(e)}*/}
        {/*/>*/}
        {/*<label for="parkingUnable">주차불가</label>*/}
      </div>
      {/*<button id="clear" onClick={clearHandler}>*/}
      {/*  필터초기화*/}
      {/*</button>*/}
    </div>
  );
};

export default SearchComponent;
