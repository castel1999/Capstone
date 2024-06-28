import React from "react";
import { NavLink } from "react-router-dom";

const MyLessonNavbar = () => {
  return (
    <div className="w-full border-b-2">
      <div className="flex flex-row gap-5 p-2 font-semibold">
        <NavLink
          to="/vn/my-lessons"
          className={({ isActive }) =>
            isActive
              ? "p-2 border-b-2 border-theme font-semibold text-theme hover:bg-gray-100 rounded-t-xl"
              : "p-2 hover:bg-gray-100 rounded-lg"
          }
        >
          Buổi học của tôi
        </NavLink>
        <NavLink
          to="/vn/settings/profile"
          className={({ isActive }) =>
            isActive
              ? "p-2 border-b-2 border-theme font-semibold text-theme hover:bg-gray-100 rounded-t-xl"
              : "p-2 hover:bg-gray-100 rounded-lg"
          }
        >
          Cài đặt tài khoản
        </NavLink>
      </div>
    </div>
  );
};

export default MyLessonNavbar;
