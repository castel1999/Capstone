import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ODTlogo from "../../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import UserNavbar from "./userNavbar/UserNavbar";
import Loading from "../../utils/Loading";

const NavBar = () => {
  const Logged = localStorage.getItem("token") !== null;
  const currUser = localStorage.getItem("role");

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: UserAPI.getCurrentUser,
    enabled: Logged, // Enable the query only if the user is logged in
  });

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen mx-auto">
        <Loading size={100} />
      </div>
    );
  }

  if (isError) {
    localStorage.clear();
    location.reload();
    navigate("/login");
  }

  return (
    <div className="bg-white relative">
      <div className="flex justify-between items-center px-7 py-3">
        {currUser === "Admin" || currUser === "Moderator" ? (
          <div>{`Hi, ${currUser}: ${data?.value.fullName}`} </div>
        ) : (
          <div className="flex flex-row justify-center items-center gap-5">
            <Link to="/">
              <img
                src={ODTlogo}
                alt="ODTlogo"
                className="size-16 object-cover cursor-pointer self-center "
              />
            </Link>
            <NavLink
              to="/tutor-list"
              className={({ isActive }) =>
                isActive
                  ? "bg-theme text-white rounded-lg self-center p-3 font-semibold"
                  : "transition ease-in-out delay-150 rounded-lg p-3 cursor-pointer self-center font-semibold hover:text-white hover:bg-theme hover:-translate-y-0 hover:scale-110"
              }
            >
              Học với gia sư
            </NavLink>

            <NavLink
              to="/course"
              className={({ isActive }) =>
                isActive
                  ? "bg-theme text-white rounded-lg self-center p-3 font-semibold"
                  : "transition ease-in-out delay-150 rounded-lg p-3 cursor-pointer self-center font-semibold hover:text-white hover:bg-theme hover:-translate-y-0 hover:scale-110"
              }
            >
              Học theo lộ trình
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-theme text-white rounded-lg self-center p-3 font-semibold"
                  : "transition ease-in-out delay-150 rounded-lg p-3 cursor-pointer self-center font-semibold hover:text-white hover:bg-theme hover:-translate-y-0 hover:scale-110"
              }
            >
              Về chúng tôi
            </NavLink>

            <NavLink
              to="/become-tutor"
              className={({ isActive }) =>
                isActive
                  ? "bg-theme text-white rounded-lg self-center p-3 font-semibold"
                  : "transition ease-in-out delay-150 rounded-lg p-3 cursor-pointer self-center font-semibold hover:text-white hover:bg-theme hover:-translate-y-0 hover:scale-110"
              }
            >
              Trở thành gia sư
            </NavLink>
          </div>
        )}

        {Logged ? (
          <div>
            <UserNavbar data={data?.value} />
          </div>
        ) : (
          <Link
            className="transition ease-in-out delay-150 border-2 border-black rounded-lg text-black py-2 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-theme hover:text-white duration-300"
            to="/login"
          >
            Đăng nhập
          </Link>
        )}
      </div>
      <hr className="border" />
    </div>
  );
};

export default NavBar;
