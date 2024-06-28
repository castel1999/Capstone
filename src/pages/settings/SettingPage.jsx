import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import * as UserAPI from "../../api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../utils/Loading";
import SettingNavBar from "./SettingNavBar";

const SettingPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: UserAPI.getCurrentUser,
  });

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen mx-auto">
        <Loading size={100} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="w-full">
        <div>
          <SettingNavBar />
        </div>
        <div className="flex p-5 gap-28">
          <SideBar />

          <div className="flex-1">
            <Outlet context={data?.value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
