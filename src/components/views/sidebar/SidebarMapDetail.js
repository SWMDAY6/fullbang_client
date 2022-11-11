import { useGlobalContext } from "../../../context";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useState } from "react";
import room from "../../../assets/room.png";
import logo_yanolja from "../../../assets/logo_yanolja.png";
import logo_yeogiattae from "../../../assets/logo_yeogiattae.png";

const SidebarMapDetail = () => {
  const {
    isMapDetailOpen,
    sidebarMapDetailId,
    sidebarMapDetailData,
    switchMapDetail,
    sidebarMapDetailRawData,
    setSidebarMapDetailData,
  } = useGlobalContext();
  const [selectItem, setSelectItem] = useState(-1);

  const setChartData = (props, idx) => {
    console.log(props.roomId);
    let label = [];
    let yeoggiatte = [];
    let yanolja = [];
    props.stayPriceList.map((data) => {
      label.push(data.checkInDate);
      if (data.platform === "YEOGIEOTTAE") {
        yeoggiatte.push(data.price);
        yanolja.push(null);
      } else {
        yeoggiatte.push(null);
        yanolja.push(data.price);
      }
    });
    setSidebarMapDetailData({
      labels: label,
      datasets: [
        {
          label: "야놀자",
          backgroundColor: "rgba(194, 116, 161, 0.5)",
          borderColor: "rgb(194, 116, 161)",
          data: yanolja,
        },
        {
          label: "여기어때",
          backgroundColor: "rgba(71, 225, 167, 0.5)",
          borderColor: "rgb(71, 225, 167)",
          data: yeoggiatte,
        },
      ],
    });
    setSelectItem(idx);
    console.log("selectItem", selectItem);
  };

  const CloseSidebarDetail = () => {
    switchMapDetail();
    setSidebarMapDetailData({ labels: [], datasets: [] });
    setSelectItem(-1);
  };
  return (
    <Card
      className={`${
        isMapDetailOpen ? "detailsidebar show-detailsidebar" : "detailsidebar"
      }`}
    >
      <Card.Body>
        <h4>{sidebarMapDetailId}</h4>
        <CloseButton onClick={CloseSidebarDetail} />
        <RoomDetail>
          {sidebarMapDetailRawData.map((data, idx) => {
            console.log(data);
            return (
              <RoomDetailBox
                onClick={() => setChartData(data, idx)}
                selected={idx === selectItem}
              >
                <RoomDetailBoxImg
                  src={data.imgUrl[0] === null ? { room } : data.imgUrl[0]}
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
          <ChartDetailImg
            src={
              selectItem === -1
                ? { room }
                : sidebarMapDetailRawData[selectItem].imgUrl[0]
            }
          ></ChartDetailImg>
          <ChartDetailName>
            {selectItem !== -1
              ? sidebarMapDetailRawData[selectItem].roomName
              : "-"}
          </ChartDetailName>
          <ChartDetailDayAvg>
            평일 요금 평균
            {selectItem !== -1
              ? Number.parseInt(
                  (sidebarMapDetailRawData[selectItem].weekdayStayAveragePrice *
                    10) /
                    10
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
              : "-"}
          </ChartDetailDayAvg>
          <ChartDetailWeekendAvg>
            주말 요금 평균
            {selectItem !== -1
              ? Number.parseInt(
                  (sidebarMapDetailRawData[selectItem].weekendStayAveragePrice *
                    10) /
                    10
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
              : "-"}
          </ChartDetailWeekendAvg>
          <Line
            data={sidebarMapDetailData}
            width={600}
            height={250}
            options={{ responsive: false }}
          />
        </ChartDetail>
      </Card.Body>
    </Card>
  );
};

export default SidebarMapDetail;

const RoomDetail = styled.div`
  width: 300px;
  height: 300px;
  float: left;
  overflow: auto;
`;

const ChartDetail = styled.div`
  width: 600px;
  height: 300px;
  float: left;
`;

const ChartDetailName = styled.div`
  width: 600px;
`;

const ChartDetailImg = styled.img`
  height: 50px;
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
