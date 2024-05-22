import React from "react";
import { Link, NavLink } from "react-router-dom";
import ODTlogo from "../../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import UserNavbar from "./userNavbar/UserNavbar";
import Loading from "../../utils/Loading";
import TutorNavbar from "./tutorNavbar/TutorNavbar";

const NavBar = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myData"],
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
    <div className="bg-white">
      <div className="flex justify-between items-center px-7 py-3">
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
        </div>
        {data && data?.role === "guest" ? (
          <div>
            <Link className="">Đăng nhập</Link>
          </div>
        ) : data.role === "student" ? (
          <div>
            <UserNavbar data={data} />
          </div>
        ) : (
            <div>
            <TutorNavbar data={data} />
          </div>
        )}
      </div>
      <hr className="border"/>
    </div>
  );
};

export default NavBar;
