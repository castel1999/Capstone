import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import * as UserAPI from "../../api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../utils/Loading";

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
      <div className="flex gap-10 p-5">
        <div>
          <SideBar data={data?.value} />
        </div>
        <div className="flex-1">
          <Outlet context={data?.value} />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
