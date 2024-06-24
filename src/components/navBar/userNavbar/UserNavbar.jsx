import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import ava from "../../../assets/DefaultAva.png";
import notify from "../../../assets/notify.png";
import { CiHeart } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { useAuth } from "../../../hooks/AuthContext";
import { useQuery } from "@tanstack/react-query";
import * as UserAPI from "../../../api/UserAPI";

const UserNavbar = ({ data }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const role = localStorage.getItem("role");

  const { user } = useAuth();
  const userId = user?.decodedToken?.UserId;

  const studentMenu = [
    { path: "Trang cá Nhân", route: "/settings/profile" },
    { path: "Bài học của tôi", route: "/my-lessons" },
    { path: "Giáo viên Yêu thích", route: "/favorite" },
  ];
  const TutorMenu = [{ path: "Trang cá Nhân", route: "/settings/profile" }];

  let menu = [];
  if (role === "Student") menu = studentMenu;
  else if (role === "Tutor") menu = TutorMenu;

  const noti = data?.noti?.map((item) => item);

  const [openNoti, setOpenNoti] = useState(false);

  const profileMenuRef = useRef();
  const profileImgRef = useRef();

  const notiMenuRef = useRef();
  const notiImgRef = useRef();

  window.addEventListener("click", (e) => {
    if (
      e.target !== profileMenuRef.current &&
      e.target !== profileImgRef.current
    ) {
      setOpenProfile(false);
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target !== notiMenuRef.current && e.target !== notiImgRef.current) {
      setOpenNoti(false);
    }
  });

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
    error,
  } = useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => UserAPI.getWallet(userId),
  });

  if (isWalletLoading) {
    return <div>...Loading</div>;
  }

  if (isWalletError) {
    return <div>{error.message}</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const logout = () => {
    localStorage.clear();
    location.reload();
    Navigate("/login");
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-4">
      {/* profile */}
      <div className="flex flex-col items-center ">
        <div className="relative">
          <img
            ref={profileImgRef}
            onClick={() => setOpenProfile(!openProfile)}
            src={data?.imageUrl}
            alt="Avatar"
            className="object-cover size-8 rounded-md cursor-pointer"
          />
        </div>
        {openProfile && (
          <div
            ref={profileMenuRef}
            className="absolute bg-white p-3 w-52 shadow-lg right-3 top-24"
          >
            <ul>
              {menu &&
                menu?.map((menu, index) => (
                  <Link
                    to={menu.route}
                    onClick={() => setOpenProfile(false)}
                    className="p-2 text-lg cursor-pointer rounded-md hover:bg-theme hover:text-white block"
                    key={index}
                  >
                    {menu.path}
                  </Link>
                ))}
            </ul>
            <Link
              onClick={logout}
              to="/login"
              className="p-2 text-lg cursor-pointer rounded-md hover:bg-theme hover:text-white block"
            >
              Đăng xuất
            </Link>
          </div>
        )}
      </div>
      {role === "Admin" || role === "Moderator" ? (
        ""
      ) : (
        <div className="flex flex-row-reverse justify-center items-center gap-4">
          <div className="flex flex-col items-center ">
            <div className="relative">
              <img
                ref={notiImgRef}
                onClick={() => setOpenNoti(!openNoti)}
                src={notify}
                alt="Notify"
                className="object-cover size-6 rounded-md cursor-pointer"
              />
            </div>
            {openNoti && (
              <div
                ref={notiMenuRef}
                className="absolute bg-white p-3  shadow-lg right-3 top-24"
              >
                <ul className="">
                  {noti &&
                    noti?.map((item) => (
                      <li
                        onClick={() => setOpenNoti(false)}
                        className="p-2 text-lg cursor-pointer rounded-md hover:bg-theme hover:text-white w-[400px]"
                        key={item.id}
                      >
                        <div className="line-clamp-1">{item.mess}</div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/favorite">
            <CiHeart className="size-6 object-cover self-center hover:text-theme cursor-pointer" />
          </Link>

          <Link
            to="/settings/wallet"
            className="flex justify-center items-center gap-2 cursor-pointer hover:text-theme"
          >
            <CiWallet className="size-6 object-cover self-center" />
            <div>{formatCurrency(walletData?.amount)}</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
