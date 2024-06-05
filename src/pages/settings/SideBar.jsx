import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";

const SideBar = ({ data }) => {
  const logout = () => {
    localStorage.clear();
    Navigate("/login");
  };

  return (
    <div className="min-w-52 max-w-80">
      <div className="flex gap-4 ml-2">
        <div>
          <img
            src={data?.imageUrl}
            alt=""
            className="object-cover size-12 rounded-full border-2 border-black"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <div className="font-bold text-clip overflow-hidden line-clamp-1 max-w-52">
            {data?.fullName}
          </div>
          <div className="text-sm text-gray-400">
            {localStorage.getItem("role")}
          </div>
        </div>
      </div>
      <hr className="mt-3 mb-3 border-[1px] border-gray-200" />
      <div className="flex flex-col gap-5">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-2"
              : "transition ease-in-out delay-150 cursor-pointer pl-2 hover:border-l-2 hover:font-semibold hover:border-theme hover:text-theme hover:-translate-y-0 hover:scale-110 duration-300"
          }
        >
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="email"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-2"
              : "transition ease-in-out delay-150 cursor-pointer pl-2 hover:border-l-2 hover:font-semibold hover:border-theme hover:text-theme hover:-translate-y-0 hover:scale-110 duration-300"
          }
        >
          Email
        </NavLink>

        <NavLink
          to="reset-pass"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-2"
              : "transition ease-in-out delay-150 cursor-pointer pl-2 hover:border-l-2 hover:font-semibold hover:border-theme hover:text-theme hover:-translate-y-0 hover:scale-110 duration-300"
          }
        >
          Đổi mật khẩu
        </NavLink>

        <NavLink
          to="wallet"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-2"
              : "transition ease-in-out delay-150 cursor-pointer pl-2 hover:border-l-2 hover:font-semibold hover:border-theme hover:text-theme hover:-translate-y-0 hover:scale-110 duration-300"
          }
        >
          Quản lý ví
        </NavLink>

        <NavLink
          to="upgrade"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-theme font-semibold text-theme pl-2"
              : "transition ease-in-out delay-150 cursor-pointer pl-2 hover:border-l-2 hover:font-semibold hover:border-theme hover:text-theme hover:-translate-y-0 hover:scale-110 duration-300"
          }
        >
          Nâng cấp tài khoản
        </NavLink>

        <Link
          onClick={logout}
          to="/login"
          className="max-w-36 border rounded-lg p-3 bg-red-500 text-white text-center font-bold hover:opacity-80"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
