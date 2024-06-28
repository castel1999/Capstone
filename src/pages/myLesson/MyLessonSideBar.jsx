import React from "react";
import { NavLink } from "react-router-dom";

const MyLessonSideBar = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <NavLink
          to="lessons"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme hover:bg-gray-100 hover:rounded-r pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Buổi học
        </NavLink>
        <NavLink
          to="calendar"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme hover:bg-gray-100 hover:rounded-r pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Lịch học
        </NavLink>
      </div>
    </div>
  );
};

export default MyLessonSideBar;
