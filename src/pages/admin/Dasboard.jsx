import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";

const Dasboard = () => {
  return (
    <div className="flex flex-row gap-5">
      <div className="">
        <SideBarAdmin />
      </div>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dasboard;
