import React from 'react';
import { useGlobalContext } from '../../../context';

const SidebarMyPageDetail = () => {
  const { isMyPageDetailOpen } = useGlobalContext();

  return (
    <aside
      className={`${
        isMyPageDetailOpen
          ? 'detailsidebar show-detailsidebar'
          : 'detailsidebar'
      }`}
    >
      <div className="sidebar-header">마이페이지</div>
    </aside>
  );
};

export default SidebarMyPageDetail;
