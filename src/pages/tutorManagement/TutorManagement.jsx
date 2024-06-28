import React, { useState } from "react";
import MyLessons from "./MyLessons";
import Calendar from "./Calendar";
import Statistic from "./Statistic";
import MyProfile from "./MyProfile";

const TutorManagement = () => {
  const [selectedTab, setSelectedTab] = useState("lessons");

  return (
    <div className="flex flex-col w-full" style={{ height: 'calc(100vh - 90px)' }}>
      <div className="flex flex-row w-full font-semibold border-b-2 border-[#eeeeee]">
        <div
          className={
            selectedTab === "lessons"
              ? "border-b-4 py-4 px-6 border-theme"
              : "cursor-pointer py-4 px-6"
          }
          onClick={() => setSelectedTab("lessons")}
        >
          My lessons
        </div>
        <div
          className={
            selectedTab === "calendar"
              ? "border-b-4 py-4 px-6 border-theme"
              : "cursor-pointer py-4 px-6"
          }
          onClick={() => setSelectedTab("calendar")}
        >
          Calendar
        </div>
        <div
          className={
            selectedTab === "statistic"
              ? "border-b-4 py-4 px-6 border-theme"
              : "cursor-pointer py-4 px-6"
          }
          onClick={() => setSelectedTab("statistic")}
        >
          Statistic
        </div>
        <div
          className={
            selectedTab === "profile"
              ? "border-b-4 py-4 px-6 border-theme"
              : "cursor-pointer py-4 px-6"
          }
          onClick={() => setSelectedTab("profile")}
        >
          My profile
        </div>
      </div>

      {selectedTab === "lessons" ? <MyLessons /> : ""}
      {selectedTab === "calendar" ? <Calendar /> : ""}
      {selectedTab === "statistic" ? <Statistic /> : ""}
      {selectedTab === "profile" ? <MyProfile /> : ""}
    </div>
  );
};

export default TutorManagement;
