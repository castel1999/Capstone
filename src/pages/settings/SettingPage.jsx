import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { Outlet } from "react-router-dom";

const SettingPage = () => {
  return (
    <div>
      <div className="flex gap-5">
        <div>
          <SideBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
