import { useGlobalContext } from "../../../context";
import Card from "react-bootstrap/Card";

import { Line } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { useState } from "react";

const SidebarMapDetail = () => {
  const {
    isMapDetailOpen,
    sidebarMapDetailId,
    sidebarMapDetailData,
    switchMapDetail,
    sidebarMapDetailRawData,
    setSidebarMapDetailData,
  } = useGlobalContext();
  const [selectItem, setSelectItem] = useState();

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

  return (
    <Card
      className={`${
        isMapDetailOpen ? "detailsidebar show-detailsidebar" : "detailsidebar"
      }`}
    >
      <Card.Body>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          style={{ top: 20, right: 20, position: "fixed" }}
          onClick={switchMapDetail}
        />
        <h4>{sidebarMapDetailId}</h4>
        <RoomDetail>
          {sidebarMapDetailRawData.map((data, idx) => {
            return (
              <RoomDetailBox
                onClick={() => setChartData(data, idx)}
                selected={idx === selectItem}
              >
                {data.roomName}
                <br />
                {data.stayPriceYeogieottae}
              </RoomDetailBox>
            );
          })}
        </RoomDetail>
        <ChartDetail>
          <Line
            data={sidebarMapDetailData}
            width={600}
            height={300}
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

const RoomDetailBox = styled.div`
  border: 1px solid #d0d0d0;
  height: 60px;
  width: 250px;
  margin-top: 9px;
  margin-left: 10px;
  clear: both;

  &:hover {
    background-color: #bababa;
  }

  background-color: ${(props) => (props.selected ? "#bababa" : "#ffffff")};
`;
