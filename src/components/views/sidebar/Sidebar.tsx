import styled from "styled-components";
import "./Sidebar.css";
import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "../../../context";

const Sidebar = (props: any) => {
  const [keyword, setKeyword] = useState("");
  const { productList, setProductLists } = useGlobalContext();

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const url = "http://api.fullbang.kr:8080/search/" + keyword;
      const params = {
        inputDate: "2022-09-16",
      };
      axios
        .get(url, { params })
        .then(function (response) {
          setProductLists(response.data);
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
        {productList.map((data: any) => {
          console.log(data);
          return (
            <AccommodationBox>
              <AcoomodationImage>
                <img
                  className="accomodationImg"
                  alt="숙소 사진"
                  src={data.placeImage}
                />
              </AcoomodationImage>

              <AcoomodationName>{data.placeName} </AcoomodationName>
              <AccomodationHr />
              <AccomodationPrice>
                {data.lowestPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </AccomodationPrice>
            </AccommodationBox>
          );
        })}
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
  clear: both;
`;

const AcoomodationImage = styled.div`
  height: 100%;
  width: 138px;
  margin-top: 0px;
  margin-left: 0px;
  float: left;
`;

const AcoomodationName = styled.div`
  width: 100%;
  margin-top: 18px;
  margin-left: 145px;
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
`;

const AccomodationHr = styled.hr``;

const AccomodationPrice = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  text-align: right;
  color: #f49c00;
`;

export default Sidebar;
