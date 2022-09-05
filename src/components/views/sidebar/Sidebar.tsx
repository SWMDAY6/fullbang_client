import styled from "styled-components";
import "./Sidebar.css";
import yanolja from "../../../assets/logo_yanolja.png";
import yeogiattae from "../../../assets/logo_yeogiattae.png";
import { AccomodationList } from "../LandingPage/LandingPage";
import axios from "axios";
import { useState } from "react";

const Sidebar = (props: any) => {
  const [keyword, setKeyword] = useState("");
  const [placeList, setPlaceList] = useState([
    // {
    //   addressCode: "123",
    //   addressFullName: "",
    //   latitude: 0,
    //   longitude: 0,
    //   placeId: 0,
    //   placeName: "",
    //   placeType: "",
    //   region1DepthName: "",
    //   region2DepthName: "",
    //   region3DepthName: "",
    // },
  ]);

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const url = "http://fullbang.kr:8080/search/" + keyword;
      axios
        .get(url)
        .then(function (response) {
          // console.log("URL : ", url, "response:", response);
          setPlaceList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = (e: any) => {
    setKeyword(e.target.value);

    console.log("value is:", e.target.value);
  };
  return (
    <aside className="sidebar show-sidebar">
      <input
        type="textbox"
        id="searchTextbox"
        placeholder="업체명을 입력해주세요."
        onKeyPress={onKeyPress}
        onChange={handleChange}
      />
      <AccommodationWrap>
        {placeList.map((data: any) => {
          console.log(data);
          return (
            <AccommodationBox>
              <div className="accomodationName">{data.placeName} </div>
            </AccommodationBox>
          );
        })}
        {/* {props.AccomodationList.map((data: any) => {
          return (
            <AccommodationBox>
              <img
                className="accomodationImg"
                alt="숙소 사진"
                src={data.img_src}
              />

              <div className="accomodationName">{data.name}</div>
            </AccommodationBox>
          );
        })} */}
      </AccommodationWrap>
    </aside>
  );
};

const AccommodationWrap = styled.div`
  height: calc(100% - 74px);
  margin-top: 26px;
  text-align: center;
  overflow: auto;
`;

const AccommodationBox = styled.div`
  border: 1px solid #d0d0d0;
  height: 163px;
  width: 349px;
  margin-top: 9px;
  margin-left: 10px;
`;

export default Sidebar;
