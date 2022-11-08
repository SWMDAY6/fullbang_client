import React from "react";
import { useGlobalContext } from "../../../context";

const SidebarMapDetail = () => {
  const { isMapDetailOpen } = useGlobalContext();

  return (
    <aside
      className={`${
        isMapDetailOpen ? "detailsidebar show-detailsidebar" : "detailsidebar"
      }`}
      // style={{ backgroundImage: background_modal }}
    >
      {/* <div className="sidebar-header">지도</div> */}
    </aside>
  );
};

export default SidebarMapDetail;
