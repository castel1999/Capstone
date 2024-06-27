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
import { get } from "firebase/database";
import { database } from "../../../firebase";
import { getDatabase, ref, onValue, off } from 'firebase/database';
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
  const [notifications, setNotifications] = useState([]);
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

  useEffect(() => {
    const notificationsRef = ref(database, `notifications/${userId}`);
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      const notificationsList = data ? Object.values(data) : [];
      setNotifications(notificationsList);
    });
    return () => {
      unsubscribe();
    };
  }, [userId]);

  // Function Caculate the time 
  function formatTimeSince(createdAt) {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const diffInMillis = now - createdAtDate; // Sự khác biệt tổng cộng trong miligiây

    const diffInSeconds = Math.floor(diffInMillis / 1000);
    const seconds = diffInSeconds % 60;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const minutes = diffInMinutes % 60;
    const diffInHours = Math.floor(diffInMinutes / 60);
    const hours = diffInHours % 24;
    const days = Math.floor(diffInHours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }
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

  // Handle click on notification
  const handleOnclickNoti = async (notificationId) => {
    if (!userId || !notificationId) {
      return;
    }
    try {
      const data = { userId, notificationId };
      const response = await UserAPI.makeReadNotification(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                ref={notiImgRef}
                onClick={() => setOpenNoti(!openNoti)}
                src={notify}
                alt="Notify"
                className="object-cover size-6 rounded-md cursor-pointer"
              />
              <div className="absolute p-2 top-0 right-0 trnasform translate-x-1/2 -trnaslate-y-1/2 flex justify-center items-center bg-red-500 text-white rounded-full h-3 w-3">
                <span className="text-xs">1</span>
              </div>
            </div>
            {openNoti && (
              <div
                ref={notiMenuRef}
                // style={{ width: "400px" }}
                className="absolute w-[400px] mr-4 bg-white p-3 shadow-lg right-3 top-24 border border-gray-300 rounded-lg"
              >
                {/* Thông báo title và nút close */}
                <div class="flex items-center mb-3 pb-3 border-b border-gray-300">
                  <div className="pl-3 font-bold text-2xl">
                    Thông báo
                  </div>
                  <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
                <ul className="w-full my-5 border-none overflow-y-auto max-h-[600px]">
                  {/* {noti &&
                    noti?.map((item) => (
                      <li
                        onClick={() => setOpenNoti(false)}
                        className="p-2 text-lg cursor-pointer rounded-md hover:bg-theme hover:text-white w-[400px]"
                        key={item.id}
                      >
                        <div className="line-clamp-1">{item.mess} </div>
                        Hello ta nè ta nè
                      </li>
                    ))} */}
                  {
                    notifications.length > 0 ? (
                      notifications.slice(0, 7).map((item, index) => (
                        <li key={index} onClick={handleOnclickNoti(item.NotificationId)} className="w-full cursor-pointer  border-none hover:bg-gray-300">
                          <div id="toast-notification" className="w-full p-4  text-gray-900 bg-white rounded-xs shadow dark:bg-gray-800 dark:text-gray-300" role="alert">
                            <div class="flex items-center">
                              <div class="relative inline-block shrink-0">
                                <img class="w-12 h-12 rounded-full" src={ava} alt="Jese Leos image" />
                                <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600">
                                  <svg class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                                  </svg>
                                  <span class="sr-only">Message icon</span>
                                </span>
                              </div>
                              <div class="ms-3 text-sm font-normal">
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">{item.Title}</div>
                                <div class="text-sm font-normal">{item.Content}</div>
                                <span class="text-xs font-medium text-blue-600 dark:text-blue-500">{formatTimeSince(item.CreatedAt)}</span>
                              </div>
                              {item.Status !== 2 && (
                                <div
                                  className="w-2.5 h-2.5 bg-blue-600 rounded-full ml-auto"
                                ></div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>Không ghi nhận thông báo</li>
                    )
                  }
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
