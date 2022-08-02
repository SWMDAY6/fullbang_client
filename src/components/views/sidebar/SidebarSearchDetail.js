import React from 'react';
import { useGlobalContext } from '../../../context';

const SidebarSearchDetail = () => {
  const { isSearchDetailSidebarOpen } = useGlobalContext();

  return (
    <aside
      className={`${
        isSearchDetailSidebarOpen
          ? 'detailsidebar show-detailsidebar'
          : 'detailsidebar'
      }`}
    >
      <div className="sidebar-header">검색</div>
    </aside>
  );
};

export default SidebarSearchDetail;
