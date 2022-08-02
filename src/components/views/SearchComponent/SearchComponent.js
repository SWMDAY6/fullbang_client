import React, { useState } from "react";
import {
  bubjungdong_sido,
  bubjungdong_sigungu,
  bubjungdong_dong,
} from "./bubjungdong";
import button_minus from "../../../assets/button_minus.png";
import button_plus from "../../../assets/button_plus.png";

const SearchComponent = () => {
  const [sido, setSido] = useState();
  const [sigungu, setSigungu] = useState();
  const [dong, setDong] = useState();
  const [peopleNum, setPeopleNum] = useState(1);
  const [parkingAble, setParkingAble] = useState(0);
  const [parkingUnable, setParkingUnable] = useState(0);

  const handleSido = (e) => {
    setSido(e.target.value);
  };
  const handleSigungu = (e) => {
    setSigungu(e.target.value);
  };
  const handleDong = (e) => {
    setDong(e.target.value);
  };
  const parkingAbleHandler = (e) => {
    setParkingAble(!parkingAble);
  };
  const parkingUnableHandler = (e) => {
    setParkingUnable(!parkingUnable);
  };
  const clearHandler = () => {
    setSido();
    setSigungu();
    setDong();
    setPeopleNum(1);
    setParkingAble(0);
    setParkingUnable(0);
  };
  return (
    <div className="SearchComponent">
      <div id="selectAddress">
        <select id="sido" onChange={handleSido} value={sido}>
          <option value="">시/도</option>
          {bubjungdong_sido.map((data, idx) => {
            return <option value={data.sido}>{data.codeNM}</option>;
          })}
        </select>
        <select id="sigugun" onChange={handleSigungu}>
          <option value="">시/군/구</option>
          {bubjungdong_sigungu.map((data, idx) => {
            if (data.sido === sido)
              return <option value={data.sigungu}>{data.codeNM}</option>;
          })}
        </select>
        <select id="dong" onChange={handleDong}>
          <option value="">읍/면/동</option>
          {bubjungdong_dong.map((data, idx) => {
            if (data.sido === sido && data.sigungu === sigungu)
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
        <input
          type="checkbox"
          checked={parkingUnable}
          id="parkingUnable"
          onChange={(e) => parkingUnableHandler(e)}
        />
        <label for="parkingUnable">주차불가</label>
      </div>
      <button id="clear" onClick={clearHandler}>
        필터초기화
      </button>
    </div>
  );
};

export default SearchComponent;
