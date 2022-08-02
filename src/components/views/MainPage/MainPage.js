import { useState } from "react";
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

const Main = () => {
  const [location, setLocation] = useState({
    latitude: 37.3595704,
    longitude: 127.105399,
  });
  const [address, setAddress] = useState("경기도 성남시 분당구 정자동");
  const [adult, setAdult] = useState(1);

  const locationToAddress = () => {
    const url =
      "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&y=" +
      location.latitude +
      "&x=" +
      location.longitude;
    console.log(url);
    return fetch(url, {
      headers: {
        Authorization:
          "KakaoAK " + process.env.REACT_APP_REST_API_KAKAO_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setAddress(json.documents[0].address_name);
      });
  };

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // console.info(
            //     `re:${position.coords.latitude} ${position.coords.longitude}`
            // );
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (error) {
            console.error(error);
            resolve({
              latitude: 37.3595704,
              longitude: 127.105399,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }).then((coords) => {
        // console.log(`coords:${JSON.stringify(coords)}`);
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        locationToAddress();
        return coords;
      });
    }
    console.info("GPS를 지원하지 않습니다");
    setLocation({
      latitude: 37.3595704,
      longitude: 127.105399,
    });
    locationToAddress();
    return {
      latitude: 37.3595704,
      longitude: 127.105399,
    };
  }

  return (
    <>
      <HeaderComponent />
      <Wrapper>
        <MainWrap>
          {/* <SearchWrap> */}
          {/* <Location
                                location={location}
                                setLocation={setLocation}
                            />
                            <Calendar
                                start={date.start}
                                end={date.end}
                                handleDateChange={handleDateChange}
                            /> */}
          {/* <CountGuest
                                adult={adult}
                                room={room}
                                incrAdultQty={incrAdultQty}
                                decrAdultQty={decrAdultQty}
                                incrRoomQty={incrRoomQty}
                                decrRoomQty={decrRoomQty}
                            /> */}
          {/* <SearchBtn onClick={goToList}>검색</SearchBtn> */}
          {/* </SearchWrap> */}
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
        {/* <PromotionBox></PromotionBox> */}
        <div>개발 중</div>
      </PromotionWrap>
      <AverageWrap>
        <div className="averageTitle">{address} 시세</div>
        <div className="placeText">
          <button onClick={getLocation}>
            <img src={place_icon} />
          </button>
          {/* {ShowLatLong} */}
          {/* {location.latitude}
                    {location.longitude}
                    <br /> */}
          {address}
        </div>
        <div>
          {AVERAGE.map((avg) => {
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
      {/* <RoomTypeWrap>
                <SecondHeader>다양한 숙소를 즐겨보세요</SecondHeader>
                <ImageBox>
                    {IMAGES.map((img, index) => {
                        return (
                            <>
                                {index < 2 && (
                                    <MainType key={index} src={img.img_url}>
                                        {img.name}
                                    </MainType>
                                )}
                            </>
                        );
                    })}
                </ImageBox>
                <ImageBox>
                    {IMAGES.map((img, index) => {
                        return (
                            <>
                                {index >= 2 && (
                                    <SubType key={index} src={img.img_url}>
                                        {img.name}
                                    </SubType>
                                )}
                            </>
                        );
                    })}
                </ImageBox>
            </RoomTypeWrap> */}
      <Footer>
        <img id="logo_copyright" src={logo_copyright} />
        <div id="copyright">
          <div>
            주소. 서울특별시 강남구 테헤란로 311 아남타워빌딩, 7층 SW마에스트로
          </div>
          <div>이메일. namesace@kakao.com</div>
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

const AVERAGE = [
  { name: "모텔 평균", price_low: 49000, price_high: 490000, people: 2 },
  { name: "호텔 평균", price_low: 49000, price_high: 490000, people: 2 },
  { name: "펜션 평균", price_low: 49000, price_high: 490000, people: 2 },
  { name: "리조트 평균", price_low: 49000, price_high: 490000, people: 2 },
];
