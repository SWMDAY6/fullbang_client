import React, { useState } from "react";
import {
  bubjungdong_sido,
  bubjungdong_sigungu,
  bubjungdong_dong,
} from "../../helper/bubjungdong";
import button_minus from "../../../assets/button_minus.png";
import button_plus from "../../../assets/button_plus.png";
import { useGlobalContext } from "../../../context";

const SearchComponent = () => {
  const [sido, setSido] = useState("11");
  const [sigungu, setSigungu] = useState("680");
  const [dong, setDong] = useState("101");
  const [peopleNum, setPeopleNum] = useState(2);
  const [parkingAble, setParkingAble] = useState(false);
  const [parkingUnable, setParkingUnable] = useState(false);
  const {
    selectedAddress,
    setSelectedAddressDetail,
    setSelectedBoxAddressDetail,
    setMapCenter,
  } = useGlobalContext();

  const handleSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSido(e.target.value);
    setSelectedAddressDetail({
      sido: e.target.value,
      sigungu: null,
      dong: null,
    });

    const v = bubjungdong_sido.find((v) => v.sido === e.target.value);
    setSelectedBoxAddressDetail({
      sido: v?.sido,
      sigungu: null,
      dong: null,
    });
    setMapCenter({
      lat: v?.latitude,
      lng: v?.longitude,
      zoomLevel: zoomLevelSido,
    });
  };
  const zoomLevelSido = 10,
    zoomLevelSigungu = 7;
  const handleSigungu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSigungu(e.target.value);
    setSelectedAddressDetail({
      sido: selectedAddress.sido,
      sigungu: e.target.value,
      dong: 0,
    });

    const v = bubjungdong_sigungu.find(
      (v) => v.sido === sido && v.sigungu === e.target.value
    );
    setSelectedBoxAddressDetail({
      sido: v?.sido,
      sigungu: v?.sigungu,
      dong: null,
    });
    setMapCenter({ lat: v?.latitude, lng: v?.longitude, zoomLevel: 7 });
  };

  const handleDong = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDong(e.target.value);
    setSelectedAddressDetail({
      sido: selectedAddress.sido,
      sigungu: selectedAddress.sigungu,
      dong: e.target.value,
    });

    const v = bubjungdong_dong.find(
      (v) =>
        v.sido === sido && v.sigungu === sigungu && v.dong === e.target.value
    );
    setSelectedBoxAddressDetail({
      sido: v?.sido,
      sigungu: v?.sigungu,
      dong: v?.dong,
    });
    setMapCenter({ lat: v?.latitude, lng: v?.longitude, zoomLevel: 5 });
  };
  const parkingAbleHandler = () => {
    // setParkingAble(!parkingAble);
    if (parkingAble == true) setParkingAble(false);
    else setParkingAble(true);
  };
  const parkingUnableHandler = () => {
    setParkingUnable(!parkingUnable);
  };
  const clearHandler = () => {
    setSido("0");
    setSigungu("0");
    setDong("0");
    setPeopleNum(2);
    setParkingAble(false);
    setParkingUnable(false);
  };
  return (
    <div className="SearchComponent">
      <div id="selectAddress">
        <select id="sido" onChange={handleSido} value={selectedAddress.sido}>
          <option value="0">시/도</option>
          {bubjungdong_sido.map((data) => {
            return <option value={data.sido}>{data.codeNM}</option>;
          })}
        </select>
        <select
          id="sigugun"
          onChange={handleSigungu}
          value={selectedAddress.sigungu}
        >
          <option value="0">시/군/구</option>
          {bubjungdong_sigungu.map((data) => {
            if (data.sido === selectedAddress.sido)
              return <option value={data.sigungu}>{data.codeNM}</option>;
          })}
        </select>
        <select id="dong" onChange={handleDong} value={selectedAddress.dong}>
          <option value="0">읍/면/동</option>
          {bubjungdong_dong.map((data) => {
            if (
              data.sido === selectedAddress.sido &&
              data.sigungu === selectedAddress.sigungu
            )
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
          onChange={(e) => parkingAbleHandler()}
        />
        <label htmlFor="parkingAble">주차가능</label>
        <input
          type="checkbox"
          checked={parkingUnable}
          id="parkingUnable"
          onChange={(e) => parkingUnableHandler()}
        />
        <label htmlFor="parkingUnable">주차불가</label>
      </div>
      {/* <button id="clear" onClick={clearHandler}>
        필터초기화
      </button> */}
    </div>
  );
};

export default SearchComponent;
