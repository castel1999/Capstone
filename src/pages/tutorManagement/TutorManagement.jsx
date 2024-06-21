import React, { useState } from "react";
import MyLessons from "./MyLessons";
import Calendar from "./Calendar";
import Statistic from "./Statistic";
import MyProfile from "./MyProfile";

const TutorManagement = () => {
  const [selectedTab, setSelectedTab] = useState("lessons");

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full gap-8 bg-[#32363A] px-12 py-4 text-[#898F97]">
        <div
          className={
            selectedTab === "lessons"
              ? "text-white border-b-2 border-white"
              : "cursor-pointer"
          }
          onClick={() => setSelectedTab("lessons")}
        >
          My lessons
        </div>
        <div
          className={
            selectedTab === "calendar"
              ? "text-white border-b-2 border-white"
              : "cursor-pointer"
          }
          onClick={() => setSelectedTab("calendar")}
        >
          Calendar
        </div>
        <div
          className={
            selectedTab === "statistic"
              ? "text-white border-b-2 border-white"
              : "cursor-pointer"
          }
          onClick={() => setSelectedTab("statistic")}
        >
          Statistic
        </div>
        <div
          className={
            selectedTab === "profile"
              ? "text-white border-b-2 border-white"
              : "cursor-pointer"
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
