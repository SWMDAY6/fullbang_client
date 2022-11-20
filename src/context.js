import React, { useState, useContext } from "react";
import axiosGetRoomDetail from "./components/helper/axiosGetRoomDetail";

const AppContext = React.createContext();

// 여러 component에서 사용할 수 있는 Provider생성
const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchDetailSidebarOpen, setSearchDetailSidebarOpen] =
    useState(true);
  const [isMapDetailOpen, setMapDetailOpen] = useState(false);
  const [isMyPageDetailOpen, setMyPageDetailOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    sido: 11,
    sigungu: 680,
    dong: 101,
  });
  const [selectedboxAddress, setSelectedBoxAddress] = useState();
  const [mapCenter, setMapCenter] = useState({
    lng: 127.0447333,
    lat: 37.5036883,
    zoomLevel: 2,
  });
  const [productList, setProductList] = useState([]);
  const [sidebarMapDetailId, setSidebarMapDetailId] = useState();
  const [sidebarMapDetailData, setSidebarMapDetailData] = useState({
    labels: [],
    datasets: [],
    yanolja: [],
  });
  const [sidebarMapDetailRawData, setSidebarMapDetailRawData] = useState([]);

  const openModal = () => {
    // console.log("modalopen");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    // console.log("modalclose");
    setIsModalOpen(false);
  };
  const openSearchDetail = () => {
    setSearchDetailSidebarOpen(true);
  };
  const closeSearchDetail = () => {
    setSearchDetailSidebarOpen(false);
  };
  const switchSearchDetail = () => {
    if (isSearchDetailSidebarOpen === true) {
      setSearchDetailSidebarOpen(false);
    } else {
      setSearchDetailSidebarOpen(true);
    }
  };
  const openMapDetail = () => {
    setMapDetailOpen(true);
  };
  const closeMapDetail = () => {
    setMapDetailOpen(false);
  };
  const switchMapDetail = () => {
    if (isMapDetailOpen === true) {
      setMapDetailOpen(false);
    } else {
      setMapDetailOpen(true);
    }
  };

  const openMyPageDetail = () => {
    setMyPageDetailOpen(true);
  };
  const closeMyPageDetail = () => {
    setMyPageDetailOpen(false);
  };
  const switchMyPageDetail = () => {
    if (isMyPageDetailOpen === true) {
      closeMyPageDetail();
    } else {
      openMyPageDetail();
    }
  };
  const setSelectedAddressDetail = (props) => {
    setSelectedAddress({
      sido: props.sido,
      sigungu: props.sigungu,
      dong: props.dong,
    });
    // console.log("in context : " + props.sido + props.sigungu +props.dong);
  };
  const setSelectedBoxAddressDetail = (props) => {
    setSelectedBoxAddress({
      sido: props.sido,
      sigungu: props.sigungu,
      dong: props.dong,
    });
  };
  const setProductLists = (props) => {
    setProductList(props);
  };
  const setSidebarMapDetail = async (idx, name) => {
    const params = {
      checkInDate: "2022-11-07",
    };
    const url = "http://fullbang.kr:8080/room/" + idx;
    const response = await axiosGetRoomDetail(url, params);
    // console.log("setSidebarMapDetail");
    // console.log(response.data[0]);
    setSidebarMapDetailRawData(response.data);
    setSidebarMapDetailId(name);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isMapDetailOpen,
        isSearchDetailSidebarOpen,
        isMyPageDetailOpen,
        selectedAddress,
        selectedboxAddress,
        mapCenter,
        productList,
        sidebarMapDetailId,
        sidebarMapDetailData,
        sidebarMapDetailRawData,
        setProductLists,
        setMapCenter,
        switchSearchDetail,
        openSearchDetail,
        closeSearchDetail,
        openMapDetail,
        closeMapDetail,
        switchMapDetail,
        switchMyPageDetail,
        openModal,
        closeModal,
        setSelectedAddressDetail,
        setSelectedBoxAddressDetail,
        setSidebarMapDetailId,
        setSidebarMapDetail,
        setSidebarMapDetailData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
