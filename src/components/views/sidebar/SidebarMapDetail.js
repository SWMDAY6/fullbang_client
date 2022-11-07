import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context";
import Card from "react-bootstrap/Card";

import { Line } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";

// import LineChart from "../../helper/LineChart";

const SidebarMapDetail = () => {
  const { isMapDetailOpen, sidebarMapDetailId, sidebarMapDetailData } =
    useGlobalContext();
  // let [data] = [];

  // useEffect(() => {
  //   [data] = useState({
  //     labels: sidebarMapDetailData.label,
  //     datasets: [
  //       {
  //         label: "야놀자",
  //         // backgroundColor: "rgba(194, 116, 161, 0.5)",
  //         borderColor: "rgb(194, 116, 161)",
  //         data: sidebarMapDetailData.yanolja,
  //       },
  //       {
  //         label: "여기어때",
  //         // backgroundColor: "rgba(71, 225, 167, 0.5)",
  //         borderColor: "rgb(71, 225, 167)",
  //         data: sidebarMapDetailData.yeogiatte,
  //       },
  //     ],
  //   });
  // }, [sidebarMapDetailData]);

  return (
    <Card
      className={`${
        isMapDetailOpen ? "detailsidebar show-detailsidebar" : "detailsidebar"
      }`}
    >
      <Card.Body>
        <CDBContainer>
          <h3>{sidebarMapDetailId}</h3>
          <Line data={sidebarMapDetailData} options={{ responsive: true }} />
        </CDBContainer>
      </Card.Body>
    </Card>
  );
};

export default SidebarMapDetail;
