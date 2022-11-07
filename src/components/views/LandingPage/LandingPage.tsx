import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import Sidebar from "../sidebar/Sidebar";
import SidebarMapDetail from "../sidebar/SidebarMapDetail";
import Map from "./Sections/Map";
import "./LandingPage.css";

export interface propsType {
  searchKeyword: string;
}

export interface AccomodationList {
  placeId: number;
  placeName: string;
  placeType: string;
  addressFullName: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  addressCode: string;
  latitude: number;
  longitude: number;
  price: number;
}

const LandingPage = (): JSX.Element => {
  return (
    <>
      <HeaderComponent />
      <SearchComponent />
      <Sidebar />
      <SidebarMapDetail />
      <div className="landing-page">
        <div className="landing-page__inner">
          <Map />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
