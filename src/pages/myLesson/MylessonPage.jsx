import React from "react";
import MyLessonNavbar from "./MyLessonNavbar";
import MyLessonSideBar from "./MyLessonSideBar";
import { Outlet } from "react-router-dom";

const MylessonPage = () => {
  return (
    <div>
      <MyLessonNavbar />
      <div className="flex flex-row gap-28 p-5">
        <div>
          <MyLessonSideBar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MylessonPage;
