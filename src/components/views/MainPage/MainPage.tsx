import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import background_hotel from "../../../assets/background_hotel.png";
import motel_icon from "../../../assets/motel_icon.png";
import pension_icon from "../../../assets/pension_icon.png";
import hotel_icon from "../../../assets/hotel_icon.png";
import map_icon from "../../../assets/map_icon.png";
import logo_copyright from "../../../assets/logo_copyright.png";
import filter_icon from "../../../assets/filter_icon.png";
import place_icon from "../../../assets/place_icon.png";
import "./MainPage.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import axiosGetAverageValue from "../../helper/axiosGetAverageValue";
import MainPageSearchComponent from "./MainPageSearchComponent";

const Main = () => {
  const [address, setAddress] = useState("서울시 강남구 역삼동");
  const placeTypeList = ["MOTEL", "HOTEL", "PENSION", "CAMPING"];

  let averageTemp = [
    {
      name: "모텔 평균",
      price_low: 0,
      price_high: 0,
      people: 2,
    },
    {
      name: "호텔 평균",
      price_low: 0,
      price_high: 0,
      people: 2,
    },
    {
      name: "펜션 평균",
      price_low: 0,
      price_high: 0,
      people: 2,
    },
    {
      name: "캠핑 평균",
      price_low: 0,
      price_high: 0,
      people: 2,
    },
  ];
  const [average, setAverage] = useState(averageTemp);

  const getAverageValue = async (props: string) => {
    const now = new Date();
    const url = "http://fullbang.kr:8080/product/" + props + "/marketPrice?";
    // const date =
    //   now.getFullYear() +
    //   "-" +
    //   ("00" + (now.getMonth() + 1)).slice(-2) +
    //   "-" +
    //   ("00" + (now.getDate() - 1)).slice(-2);
    const date = "2022-08-05";

    let params = {
      capacity: 0,
      date: date,
      parkingAvailability: "true",
      placeType: "MOTEL",
    };

    for (let i = 0; i < placeTypeList.length; i++) {
      params.placeType = placeTypeList[i];
      const response = await axiosGetAverageValue(url, params);
      averageTemp[i].price_low =
        Math.floor(response.data.minMeanOfRange / 10) * 10;
      averageTemp[i].price_high =
        Math.floor(response.data.maxMeanOfRange / 10) * 10;
    }
    setAverage(averageTemp);
  };

  useEffect(() => {
    getAverageValue("11680101");
  }, []);

  return (
    <>
      <HeaderComponent />
      <Wrapper>
        <MainWrap>
          <MainPageSearchComponent />
        </MainWrap>
      </Wrapper>
      <ButtonWrap>
        <Link to="/map">
          <span className="buttonClass">
            <img src={map_icon} />
            <div>지 도</div>
          </span>
        </Link>
        <Link to="/map">
          <span className="buttonClass">
            <img src={motel_icon} />
            <div>모 텔</div>
          </span>
        </Link>
        <Link to="/map">
          <span className="buttonClass">
            <img src={hotel_icon} />
            <div>호 텔</div>
          </span>
        </Link>
        <Link to="/map">
          <span className="buttonClass">
            <img src={pension_icon} />
            <div>펜 션</div>
          </span>
        </Link>
      </ButtonWrap>
      <PromotionWrap>
        <div className="promotionTitle">프로모션 지원 대상</div>
        <div>개발 중</div>
      </PromotionWrap>
      <AverageWrap>
        <div className="averageTitle">{address} 시세</div>
        <div className="placeText">{address}</div>
        <div>
          {average.map((avg) => {
            console.log(avg);
            return (
              <AverageBox>
                <div className="avgName">{avg.name}</div>
                <div className="avgPriceText">
                  <span className="avgPriceNumber">
                    {avg.price_low
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  원 부터
                </div>
                <div className="avgPriceText">
                  <span className="avgPriceNumber">
                    {avg.price_high
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  원
                </div>
                <div className="avgPeople">최대 {avg.people}인 기준</div>
              </AverageBox>
            );
          })}
        </div>
      </AverageWrap>
      <Footer>
        <img id="logo_copyright" src={logo_copyright} />
        <div id="copyright">
          <div>
            주소. 서울특별시 강남구 테헤란로 311 아남타워빌딩, 7층 SW마에스트로
          </div>
          <div>이메일. admin@fullbang.kr</div>
          <div id="copyrightday6">copyright@데이식스</div>
        </div>
      </Footer>
    </>
  );
};

export default Main;

const Wrapper = styled.div`
  flex-direction: column;
  margin: auto;
  padding-left: 230px;
  padding-right: 230px;
`;

const MainWrap = styled.div`
  height: 400px;
  background-image: url(${background_hotel});
  background-size: cover;
  background-clip: content-box;
`;

const ButtonWrap = styled.div`
  height: 245px;
  margin: auto;
  text-align: center;
  padding-left: 230px;
  padding-right: 230px;
`;

const PromotionWrap = styled.div`
  height: 530px;
  background-color: #f4f4f4;
  padding-left: 230px;
  padding-right: 230px;
`;

const AverageWrap = styled.div`
  height: 530px;
  padding-left: calc(50% - 499.5px);
  padding-right: calc(50% - 499.5px);
`;

const AverageBox = styled.div`
  width: 228px;
  box-sizing: border-box;
  border: 1px solid #c0c0c0;
  margin-top: 40px;
  margin-left: 15px;
  float: left;
`;

const Footer = styled.div`
  font-size: 12px;
  background-color: #393939;
  color: #ffffff;
  width: 100%;
  height: 158px;
  // column-count: 2;
`;
