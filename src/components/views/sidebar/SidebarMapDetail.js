import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../../context";
// import LineChart from "../../helper/LineChart";

const SidebarMapDetail = () => {
  const { isMapDetailOpen } = useGlobalContext();
  // const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const data = [
    {
      date: "1/1/2017",
      high: 46,
      avg: 44,
      low: 41,
    },
    {
      date: "1/2/2017",
      high: 39,
      avg: 38,
      low: 37,
    },
    {
      date: "1/3/2017",
      high: 43,
      avg: 41,
      low: 39,
    },
    {
      date: "1/4/2017",
      high: 52,
      avg: 44,
      low: 34,
    },
    {
      date: "1/5/2017",
      high: 33,
      avg: 30,
      low: 27,
    },
  ];

  useEffect(() => {}, []);

  return (
    <aside
      className={`${
        isMapDetailOpen ? "detailsidebar show-detailsidebar" : "detailsidebar"
      }`}
      // style={{ backgroundImage: background_modal }}
    >
      {/* <div id="chart" /> */}
      {/* <LineChart data={data} /> */}
      {/* <div className="sidebar-header">지도</div> */}
    </aside>
  );
};

export default SidebarMapDetail;
