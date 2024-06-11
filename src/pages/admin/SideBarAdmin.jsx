import React, { useState } from "react";
import control from "../../assets/img/control.png";
import Chart_fill from "../../assets/img/Chart_fill.png";
import User from "../../assets/img/User.png";
import Chat from "../../assets/img/Chat.png";
import Calendar from "../../assets/img/Calendar.png";
import Search from "../../assets/img/Search.png";
import Chart from "../../assets/img/Chart.png";
import Folder from "../../assets/img/Folder.png";
import Setting from "../../assets/img/Setting.png";
import { CiLogout } from "react-icons/ci";
import { Navigate, NavLink } from "react-router-dom";

const SideBarAdmin = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Thống kê", src: Chart_fill, path: "/dashboard/home" },
    { title: "Inbox", src: Chat, path: "/dashboard/inbox" },
    { title: "Tài khoản", src: User, path: "/dashboard/accounts", gap: true },
    {
      title: "Đăng ký giảng viên",
      src: Calendar,
      path: "/dashboard/tutor-request",
    },
    { title: "Giao dịch", src: Chart, path: "/dashboard/analytics" },
    { title: "Cài Đặt", src: Setting, path: "/dashboard/setting", gap: true },
  ];

  const logout = () => {
    localStorage.clear();
    location.reload();
    Navigate("/login");
  };

  return (
    <div className="flex sticky top-0 left-0 right-0">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple  rounded-r-3xl  h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src=""
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left text-3xl font-bold duration-200 ${
              !open && "scale-0"
            }`}
          >
            ODTutor
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              to={Menu.path}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `flex rounded-md p-2 cursor-pointer bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                      Menu.gap ? "mt-9" : "mt-2"
                    }  `
                  : `flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                      Menu.gap ? "mt-9" : "mt-2"
                    }  `
              }
            >
              <img src={Menu.src} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
        <div
          onClick={logout}
          className="flex rounded-md p-2 cursor-pointer hover:bg-red-400 text-gray-300 text-sm items-center gap-x-4 mt-9"
        >
          <CiLogout className="size-6" />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
