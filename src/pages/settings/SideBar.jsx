import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-44">
      <div className="flex flex-col gap-3">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme hover:bg-gray-100 hover:rounded-r pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="email"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Email
        </NavLink>

        <NavLink
          to="reset-pass"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Đổi mật khẩu
        </NavLink>

        <NavLink
          to="wallet"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Quản lý ví
        </NavLink>

        <NavLink
          to="upgrade"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-3"
              : " hover:bg-gray-100 rounded-md pl-3"
          }
        >
          Nâng cấp tài khoản
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
