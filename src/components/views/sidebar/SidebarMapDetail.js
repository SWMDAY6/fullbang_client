import { useGlobalContext } from "../../../context";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useState } from "react";
import room from "../../../assets/room.png";
// import logo_yanolja from "../../../assets/logo_yanolja.png";
// import logo_yeogiattae from "../../../assets/logo_yeogiattae.png";

const SidebarMapDetail = () => {
  const {
    sidebarMapDetailId,
    sidebarMapDetailData,
    switchMapDetail,
    sidebarMapDetailRawData,
    setSidebarMapDetailData,
    isMapDetailOpen,
    productList,
  } = useGlobalContext();
  const [selectItem, setSelectItem] = useState(-1);

  const setChartData = (props, idx) => {
    // console.log(props.roomId);
    let label = [];
    let yeoggiatte = [];
    let yanolja = [];
    props.stayPriceListYanolja.map((data) => {
      label.push(data.checkInDate);
      yanolja.push(data.price);
    });
    props.stayPriceListYeogieottae.map((data) => {
      label.push(data.checkInDate);
      yeoggiatte.push(data.price);
    });
    // console.log(yeoggiatte);
    // console.log(yanolja);
    if (yeoggiatte.length !== 0) {
      setSidebarMapDetailData({
        labels: label,
        datasets: [
          {
            label: "여기어때",
            backgroundColor: "rgba(71, 225, 167, 0.5)",
            borderColor: "rgb(71, 225, 167)",
            data: yeoggiatte,
          },
        ],
      });
    } else if (yanolja.length !== 0) {
      setSidebarMapDetailData({
        labels: label,
        datasets: [
          {
            label: "야놀자",
            backgroundColor: "rgba(194, 116, 161, 0.5)",
            borderColor: "rgb(194, 116, 161)",
            data: yanolja,
          },
        ],
      });
    }
    setSelectItem(idx);
    // console.log("selectItem", selectItem);
  };
  const ChartDetailImgSelector = () => {
    if (selectItem === -1) return room;
    // console.log(sidebarMapDetailRawData[selectItem].imgUrl[0]);
    return "http://" + sidebarMapDetailRawData[selectItem].imgUrl[0];
  };

  const RoomDetailBoxImgSelector = (data) => {
    if (data.imgUrl[0] === null) return room;
    return data.imgUrl[0];
  };

  const CloseSidebarDetail = () => {
    switchMapDetail();
    setSidebarMapDetailData({ labels: [], datasets: [] });
    setSelectItem(-1);
  };

  const RoomImgSelector = () => {
    // console.log(productList);
    if (productList.length === 0) return room;
    const selectedProduct = productList.find(
      (element) => element.placeName === sidebarMapDetailId
    );
    // console.log(selectedProduct);
    if (selectedProduct !== undefined && selectedProduct.placeImage !== "")
      return selectedProduct.placeImage;
    return room;
  };

  return (
    <div
      className={
        isMapDetailOpen === true
          ? "detailsidebar show-detailsidebar"
          : "detailsidebar"
      }
    >
      <CloseButton onClick={CloseSidebarDetail} className="float-right" />
      <Card.Body>
        <AccomodationName>
          <AccomodationImg src={RoomImgSelector()} />
          <span>{sidebarMapDetailId}</span>
        </AccomodationName>
        <ChartDetailTop>
          <ChartDetailImg src={ChartDetailImgSelector()} />
          <ChartDetailName>
            {selectItem !== -1
              ? sidebarMapDetailRawData[selectItem].roomName
              : "-"}
          </ChartDetailName>
          <ChartDetailAvg>
            <ChartDetailDayAvg>
              평일 요금 평균
              {selectItem !== -1
                ? Math.floor(
                    sidebarMapDetailRawData[selectItem].weekdayStayAveragePrice
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
                : "-"}
            </ChartDetailDayAvg>
            <ChartDetailWeekendAvg>
              주말 요금 평균
              {selectItem !== -1
                ? Math.floor(
                    sidebarMapDetailRawData[selectItem].weekendStayAveragePrice
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
                : "-"}
            </ChartDetailWeekendAvg>
          </ChartDetailAvg>
        </ChartDetailTop>
        <RoomDetail>
          {sidebarMapDetailRawData.map((data, idx) => {
            // console.log(data);
            return (
              <RoomDetailBox
                onClick={() => setChartData(data, idx)}
                selected={idx === selectItem}
              >
                <RoomDetailBoxImg
                  src={RoomDetailBoxImgSelector(data)}
                  // src={data.imgUrl[0] === null ? room : data.imgUrl[0]}
                ></RoomDetailBoxImg>
                <RoomDetailBoxName>{data.roomName}</RoomDetailBoxName>
                <RoomDetailBoxPrice>
                  {data.stayPriceYeogieottae == null
                    ? "-"
                    : data.stayPriceYeogieottae
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                </RoomDetailBoxPrice>
              </RoomDetailBox>
            );
          })}
        </RoomDetail>
        <ChartDetail>
          <Line
            data={sidebarMapDetailData}
            width={600}
            height={250}
            options={{ responsive: false }}
          />
        </ChartDetail>
      </Card.Body>
    </div>
  );
};

export default SidebarMapDetail;

const RoomDetail = styled.div`
  width: 330px;
  height: 300px;
  float: left;
  overflow: auto;
`;

const AccomodationName = styled.div`
  width: 530px;
  float: left;
`;
const AccomodationImg = styled.img`
  width: 92px;
  height: 70px;
`;

const ChartDetail = styled.div`
  width: 550px;
  height: 300px;
  float: left;
`;
const ChartDetailTop = styled.div`
  width: 550px;
  float: left;
  column-count: 2;
`;
const ChartDetailName = styled.span`
  width: 500px;
  float: left;
`;

const ChartDetailImg = styled.img`
  width: 75px;
  height: 51px;
  float: left;
`;

const ChartDetailAvg = styled.div`
  height: 50px;
  float: left;
`;

const ChartDetailDayAvg = styled.div``;

const ChartDetailWeekendAvg = styled.div``;

const RoomDetailBox = styled.div`
  border: 1px solid #d0d0d0;
  height: 43px;
  width: 300px;
  margin-top: 10px;
  margin-left: 10px;

  &:hover {
    background-color: #bababa;
  }

  background-color: ${(props) => (props.selected ? "#bababa" : "#ffffff")};
`;

const RoomDetailBoxName = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const RoomDetailBoxPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: right;
`;

const RoomDetailBoxImg = styled.img`
  width: 63px;
  height: 43px;
  float: left;
`;
