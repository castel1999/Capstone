import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import ava from "../../../assets/DefaultAva.png";
import notify from "../../../assets/notify.png";
import { CiHeart } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";

const UserNavbar = ({ data }) => {
  const [img, setImg] = useState(data?.avatar);
  const [openProfile, setOpenProfile] = useState(false);
  const role = localStorage.getItem("role");
  const studentMenu = [
    { path: "Trang cá Nhân", route: "/settings/profile" },
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

  const logout = () => {
    localStorage.clear();
    location.reload();
    Navigate('/login')
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-4">
      {/* profile */}
      <div className="flex flex-col items-center ">
        <div className="relative">
          <img
            ref={profileImgRef}
            onClick={() => setOpenProfile(!openProfile)}
            src={img ? img : ava}
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

      {/* notifi */}
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

      <div className="flex justify-center items-center gap-2 cursor-pointer hover:text-theme">
        <CiWallet className="size-6 object-cover self-center" />
        <div>200$</div>
      </div>
    </div>
  );
};

export default UserNavbar;
