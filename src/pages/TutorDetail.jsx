import React, { useEffect, useRef, useState } from "react";
import * as TutorApi from "../api/TutorApi";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import Timetable from "../components/timetable/Timetable";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

const TutorDetail = () => {
  const id = useParams().id;
  const [isShowMore, setIsShowMore] = useState(false);
  const [resumetab, setResumetab] = useState("education");
  const [section, setSection] = useState("introduction");
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    day: "",
    time: "",
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tutorDetail"],
    queryFn: () => TutorApi.getTutorDetail2(3),
  });

  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("Scrolling begins to", to);
    });

    Events.scrollEvent.register("end", (to, element) => {
      console.log("Scrolling ends to", to);
      setSection(to); // This confirms the section has been scrolled to and visible
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    const handleCloseModal = (event) => {
      // Check if the click is outside the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleCloseModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [showModal]);

  const modalRef = useRef();

  return (
    <div className="flex flex-row justify-between mx-auto max-w-[90%]">
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="flex flex-col bg-white p-5 rounded-lg shadow-lg w-[40%] h-[80%]"
          >
            <div className="flex flex-row justify-between items-center w-full flex-[0.1]">
              <div className="flex flex-row gap-3">
                <img
                  className="w-[32px] h-[32px] rounded-lg"
                  src={
                    data?.img != null
                      ? data?.img
                      : "https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
                  }
                />
                <div className="font-semibold text-[20px]">
                  Đặt một buổi học
                </div>
              </div>

              <div
                className="p-2 bg-white hover:bg-[rgba(18,17,23,.06)] rounded-lg"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.207 5.793a1 1 0 0 0-1.414 1.414L10.586 12l-4.793 4.793a1 1 0 1 0 1.414 1.414L12 13.414l4.793 4.793a1 1 0 0 0 1.414-1.414L13.414 12l4.793-4.793a1 1 0 0 0-1.414-1.414L12 10.586z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-1 h-[80%] overflow-y-auto">
              <Timetable
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </div>

            <div className="flex w-full h-fit justify-end p-4">
              <NavLink
                className={`flex ${
                  selectedTime.day === "" && selectedTime.time === ""
                    ? "bg-[#dcdce5] border-[#a8a8b6] text-[#6a697c] cursor-not-allowed"
                    : "bg-theme border-black text-white cursor-pointer"
                }  h-fit px-6 py-2 border-2  justify-center rounded-lg text-[18px]`}
                to={
                  selectedTime.day === "" && selectedTime.time === ""
                    ? ""
                    : "/payment"
                }
              >
                Xác nhận thời gian
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col w-[55%] h-[315px">
        <div className="flex flex-row py-[48px] gap-6 ">
          <img
            className="w-[160px] h-[160px] rounded-lg"
            src={
              data?.img != null
                ? data?.img
                : "https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
            }
          />
          <div className="flex flex-col">
            <div className="flex flex-col mb-3">
              <div className="h-fit text-[32px] font-semibold leading-tight">
                {data?.fullname}
              </div>
              <div className="text-[16px] font-normal">
                {data?.introduction}
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-2 text-[14px] font-light">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.514 2.126a1 1 0 0 1 .972 0l8.982 4.99A1.004 1.004 0 0 1 22 8v6a1 1 0 1 1-2 0V9.7l-7.514 4.174a1 1 0 0 1-.972 0l-9-5a1 1 0 0 1 0-1.748l9-5ZM5.06 8 12 11.856 18.94 8 12 4.144 5.06 8ZM8 15a1 1 0 1 0-2 0v1a6 6 0 0 0 12 0v-1a1 1 0 1 0-2 0v1a4 4 0 0 1-8 0v-1Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Giáo viên dạy môn {data?.subject}
              </div>
              <div className="flex flex-row gap-2 text-[14px] font-light">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.455 7.571c0 2.748-1.48 3.715-2.455 3.715-.975 0-2.455-.966-2.455-3.715C9.545 6.102 10.693 5 12 5c1.307 0 2.455 1.102 2.455 2.571Zm2 0c0 3.429-1.995 5.715-4.455 5.715S7.545 11 7.545 7.57C7.545 5.047 9.54 3 12 3s4.455 2.047 4.455 4.571ZM6 19.971c0-.508.167-1.23.895-1.844.752-.635 2.233-1.27 5.105-1.27 2.872 0 4.353.635 5.105 1.27.728.615.895 1.336.895 1.845V21a1 1 0 1 0 2 0v-1.029c0-.964-.333-2.3-1.605-3.373-1.248-1.055-3.267-1.742-6.395-1.742-3.128 0-5.147.687-6.395 1.742C4.333 17.673 4 19.009 4 19.972V21a1 1 0 1 0 2 0v-1.028Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {data?.taughtLesson} buổi học đã dạy
              </div>
              <div className="flex flex-row gap-2 text-[14px] font-light">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3a1 1 0 0 1 .91.586l2.258 4.966 5.415.451a1 1 0 0 1 .581 1.744l-4.087 3.633.91 5.456a1 1 0 0 1-1.502 1.022l-4.509-2.706-4.997 2.726a1 1 0 0 1-1.45-1.12l1.354-5.413-4.047-3.598a1 1 0 0 1 .581-1.744l5.415-.45 2.258-4.967A1 1 0 0 1 12 3Zm0 3.417-1.59 3.497a1 1 0 0 1-.827.582l-3.675.307 2.756 2.45a1 1 0 0 1 .306.99l-.947 3.787 3.498-1.908a1 1 0 0 1 .993.02l3.144 1.886-.644-3.864a1 1 0 0 1 .322-.911l2.756-2.45-3.675-.307a1 1 0 0 1-.827-.582L12 6.417Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {data?.lessonInTwoDays} học sinh liên hệ giảng viên này trong 48
                tiếng qua
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[100%] text-base font-semibold border-2 rounded-lg border-black bg-white sticky top-[90px] z-40">
          <Link
            to="introduction"
            duration={500}
            offset={-140}
            smooth={true}
            spy={true}
            onSetActive={() => setSection("introduction")}
            className={
              section === "introduction"
                ? "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1 bg-[#FECE00] rounded-s-md"
                : "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1"
            }
          >
            Giới thiệu
          </Link>
          <Link
            to="schedule"
            duration={500}
            offset={-135}
            smooth={true}
            spy={true}
            onSetActive={() => setSection("schedule")}
            className={
              section === "schedule"
                ? "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1 bg-[#FECE00]"
                : "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1"
            }
          >
            Lịch trình
          </Link>
          <Link
            to="resume"
            duration={500}
            offset={-140}
            smooth={true}
            spy={true}
            onSetActive={() => setSection("resume")}
            className={
              section === "resume"
                ? "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1 bg-[#FECE00]"
                : "flex justify-center px-5 py-2 border-r-2 border-black cursor-pointer flex-1"
            }
          >
            Resume
          </Link>
          <Link
            to="specialities"
            duration={500}
            offset={-140}
            smooth={true}
            spy={true}
            onSetActive={() => setSection("specialities")}
            className={
              section === "specialities"
                ? "flex justify-center px-5 py-2 cursor-pointer flex-1 bg-[#FECE00] rounded-e-md"
                : "flex justify-center px-5 py-2 cursor-pointer flex-1"
            }
          >
            Kỹ năng
          </Link>
        </div>

        <div id="introduction" className="flex flex-col py-12">
          <div className="text-2xl font-semibold">Giới thiệu</div>
          <div className="flex flex-col gap-3">
            <div
              className={
                !isShowMore
                  ? "text-base font-extralight whitespace-pre-wrap pt-8 h-[80%] line-clamp-4 text-ellipsis"
                  : "text-base font-extralight whitespace-pre-wrap h-[80%] pt-8"
              }
            >
              {data?.description}
            </div>
            <div
              className="text-base w-fit font-semibold underline hover:text-theme cursor-pointer"
              onClick={() => setIsShowMore(!isShowMore)}
            >
              {!isShowMore ? "Show more" : "Show less"}
            </div>
          </div>
        </div>

        <div id="schedule" className="flex flex-col">
          <div className="text-2xl font-semibold mb-4">Lịch trình</div>
          <Timetable />
        </div>

        <div id="resume" className="flex flex-col py-12">
          <div className="text-2xl font-semibold mb-4">Hồ sơ</div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 border-b border-[#dcdce5]">
              <div
                className="flex flex-col"
                onClick={() => setResumetab("education")}
              >
                <div className="flex justify-center items-center px-4 py-2 font-medium hover:bg-[#ebebf1] rounded-md cursor-pointer">
                  Học vấn
                </div>
                <div
                  className={
                    resumetab === "education" ? "bg-theme w-full h-1" : ""
                  }
                />
              </div>
              <div
                className="flex flex-col"
                onClick={() => setResumetab("work")}
              >
                <div className="flex justify-center items-center px-4 py-2 font-medium hover:bg-[#ebebf1] rounded-md cursor-pointer">
                  Kinh nghiệm làm việc
                </div>
                <div
                  className={resumetab === "work" ? "bg-theme w-full h-1" : ""}
                />
              </div>
              <div
                className="flex flex-col"
                onClick={() => setResumetab("certificate")}
              >
                <div className="flex justify-center items-center px-4 py-2 font-medium hover:bg-[#ebebf1] rounded-md cursor-pointer">
                  Chứng chỉ
                </div>
                <div
                  className={
                    resumetab === "certificate" ? "bg-theme w-full h-1" : ""
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row pt-4 gap-6">
                <div className="text-[#4d4c5c] font-normal">2015 — 2018</div>
                <div className="flex flex-col gap-1">
                  <div className="text-[#121117] font-normal">
                    Drahomanov National Pedagogical University
                  </div>
                  <div className="text-[#4d4c5c] font-normal">
                    Master’s degree
                  </div>
                  <div className="flex flex-row items-center text-[#067560] font-semibold gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="h-4 w-4 fill-[#067560]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.97 2.715a3 3 0 0 0-3.94 0l-1.142.995a3 3 0 0 1-1.43.688l-1.489.273a3 3 0 0 0-2.456 3.08l.065 1.513a3 3 0 0 1-.353 1.547l-.715 1.334a3 3 0 0 0 .877 3.842l1.223.892a3 3 0 0 1 .99 1.24l.597 1.391a3 3 0 0 0 3.55 1.71l1.46-.4a3 3 0 0 1 1.586 0l1.46.4a3 3 0 0 0 3.55-1.71l.598-1.39a3 3 0 0 1 .989-1.241l1.223-.892a3 3 0 0 0 .877-3.842l-.715-1.334a3 3 0 0 1-.353-1.547l.065-1.513a3 3 0 0 0-2.456-3.08l-1.49-.273a3 3 0 0 1-1.43-.688l-1.14-.995Zm1.878 6.815a1 1 0 0 0-1.696-1.06l-2.977 4.763L9.8 11.4a1 1 0 1 0-1.6 1.2l2.25 3a1 1 0 0 0 1.648-.07z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Diploma verified
                  </div>
                </div>
              </div>
              <div className="flex flex-row pt-4 gap-6">
                <div className="text-[#4d4c5c] font-normal">2015 — 2018</div>
                <div className="flex flex-col">
                  <div className="text-[#121117] font-normal">
                    Drahomanov National Pedagogical University
                  </div>
                  <div className="text-[#4d4c5c] font-normal">
                    Master’s degree
                  </div>
                  <div className="flex flex-row items-center text-[#067560] font-semibold gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="h-4 w-4 fill-[#067560]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.97 2.715a3 3 0 0 0-3.94 0l-1.142.995a3 3 0 0 1-1.43.688l-1.489.273a3 3 0 0 0-2.456 3.08l.065 1.513a3 3 0 0 1-.353 1.547l-.715 1.334a3 3 0 0 0 .877 3.842l1.223.892a3 3 0 0 1 .99 1.24l.597 1.391a3 3 0 0 0 3.55 1.71l1.46-.4a3 3 0 0 1 1.586 0l1.46.4a3 3 0 0 0 3.55-1.71l.598-1.39a3 3 0 0 1 .989-1.241l1.223-.892a3 3 0 0 0 .877-3.842l-.715-1.334a3 3 0 0 1-.353-1.547l.065-1.513a3 3 0 0 0-2.456-3.08l-1.49-.273a3 3 0 0 1-1.43-.688l-1.14-.995Zm1.878 6.815a1 1 0 0 0-1.696-1.06l-2.977 4.763L9.8 11.4a1 1 0 1 0-1.6 1.2l2.25 3a1 1 0 0 0 1.648-.07z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Diploma verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="specialities" className="flex flex-col ">
          <div className="text-2xl font-semibold mb-4">Kỹ năng</div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-[#121117]">
                Conversational English
              </div>
              <div className="font-normal text-[#121117]">
                If you speak English like a 'textbook' and feel dejected because
                you lack fluency and eloquence, I am the guy to help you out. I
                will set you on a path to eloquence far beyond your wildest
                dreams. You will learn to speak and enunciate like a
                well-educated American! And yes, eloquence is a skill that can
                be coached, trained, and mastered. My method is entirely
                different from that of conventional teachers of English. I will
                make you learn spoken English the same way you would if you
                resided in an English-speaking environment. The lessons are 100%
                conversational. You will acquire the language most naturally,
                effortlessly, and confidently. As a perk, you will be paired
                with an English speaker to practice on a daily basis. Get ready
                to be blown away.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-[#121117]">
                Business English
              </div>
              <div className="font-normal text-[#121117]">
                <p>
                  My lesson plans are exclusively tailored to suit your needs
                  and objectives, but will regularly include:
                </p>
                <p>- tips for your first job interview;</p>
                <p>- meetings and communication strategies;</p>
                <p>- tips for making successful presentations;</p>
                <p>- business language fluency;</p>
                <p>- diplomatic and direct language;</p>
                <p>- understanding cultural differences;</p>
                <p>- negotiation strategy;</p>
                <p>- tips for conducting telephone and conference calls;</p>
                <p>- dealing with problem people;</p>
                <p>- working in multicultural teams;</p>
                <p>- writing business communications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-[88px] flex mt-[48px] flex-col w-[40%] h-fit p-6 border-2 border-black rounded-lg gap-6">
        <div className="relative w-full overflow-hidden pt-[56.25%] rounded-md">
          <iframe
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
            src="https://www.youtube.com/embed/phuiiNCxRMg?si=Sf0dc7lVBDz-SCjb"
            title="YouTube video player"
            frameBorder="0"
            allow=""
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div
          className="flex justify-center font-medium px-5 py-3 bg-[#F0631C] text-white shadow-buyButton rounded-lg border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none duration-500"
          onClick={() => {
            setShowModal(true),
              setSelectedTime({
                day: "",
                time: "",
              });
          }}
        >
          Thuê ngay
        </div>
        <div className="flex justify-center font-medium px-5 py-3 bg-[#ffffff] text-black shadow-button rounded-lg border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none duration-500">
          Nhắn tin
        </div>
      </div>
    </div>
  );
};

export default TutorDetail;
