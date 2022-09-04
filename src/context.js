import React, { useState, useContext } from "react";

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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// custom hook
// 다른 component에서 매번 useContext(AppContext)를
// 사용하지 않고 useGlobalContext으로 사용하기 (앞에 use를 사용하지 않으면 error)
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
