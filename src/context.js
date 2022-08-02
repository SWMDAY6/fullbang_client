import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

// 여러 component에서 사용할 수 있는 Provider생성
const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchDetailSidebarOpen, setSearchDetailSidebarOpen] =
    useState(false);
  const [isMapDetailOpen, setMapDetailOpen] = useState(false);
  const [isMyPageDetailOpen, setMyPageDetailOpen] = useState(false);

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
      setMyPageDetailOpen(false);
    } else {
      setMyPageDetailOpen(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isMapDetailOpen,
        isSearchDetailSidebarOpen,
        isMyPageDetailOpen,
        switchSearchDetail,
        openSearchDetail,
        closeSearchDetail,
        openMapDetail,
        closeMapDetail,
        switchMapDetail,
        switchMyPageDetail,
        openModal,
        closeModal,
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
