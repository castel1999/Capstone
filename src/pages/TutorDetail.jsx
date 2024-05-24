import React, { useState } from "react";
import * as TutorApi from "../api/TutorApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Timetable from "../components/timetable/Timetable";

const TutorDetail = () => {
  const id = useParams().id;
  const [isShowMore, setIsShowMore] = useState(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tutorDetail"],
    queryFn: TutorApi.getTutorDetail,
  });
  console.log(data);

  return (
    <div className="flex flex-row mx-auto max-w-[90%]">
      <div className="flex flex-col justify-between w-[55%]">
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
                    fill-rule="evenodd"
                    d="M11.514 2.126a1 1 0 0 1 .972 0l8.982 4.99A1.004 1.004 0 0 1 22 8v6a1 1 0 1 1-2 0V9.7l-7.514 4.174a1 1 0 0 1-.972 0l-9-5a1 1 0 0 1 0-1.748l9-5ZM5.06 8 12 11.856 18.94 8 12 4.144 5.06 8ZM8 15a1 1 0 1 0-2 0v1a6 6 0 0 0 12 0v-1a1 1 0 1 0-2 0v1a4 4 0 0 1-8 0v-1Z"
                    clip-rule="evenodd"
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
                    fill-rule="evenodd"
                    d="M14.455 7.571c0 2.748-1.48 3.715-2.455 3.715-.975 0-2.455-.966-2.455-3.715C9.545 6.102 10.693 5 12 5c1.307 0 2.455 1.102 2.455 2.571Zm2 0c0 3.429-1.995 5.715-4.455 5.715S7.545 11 7.545 7.57C7.545 5.047 9.54 3 12 3s4.455 2.047 4.455 4.571ZM6 19.971c0-.508.167-1.23.895-1.844.752-.635 2.233-1.27 5.105-1.27 2.872 0 4.353.635 5.105 1.27.728.615.895 1.336.895 1.845V21a1 1 0 1 0 2 0v-1.029c0-.964-.333-2.3-1.605-3.373-1.248-1.055-3.267-1.742-6.395-1.742-3.128 0-5.147.687-6.395 1.742C4.333 17.673 4 19.009 4 19.972V21a1 1 0 1 0 2 0v-1.028Z"
                    clip-rule="evenodd"
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
                    fill-rule="evenodd"
                    d="M12 3a1 1 0 0 1 .91.586l2.258 4.966 5.415.451a1 1 0 0 1 .581 1.744l-4.087 3.633.91 5.456a1 1 0 0 1-1.502 1.022l-4.509-2.706-4.997 2.726a1 1 0 0 1-1.45-1.12l1.354-5.413-4.047-3.598a1 1 0 0 1 .581-1.744l5.415-.45 2.258-4.967A1 1 0 0 1 12 3Zm0 3.417-1.59 3.497a1 1 0 0 1-.827.582l-3.675.307 2.756 2.45a1 1 0 0 1 .306.99l-.947 3.787 3.498-1.908a1 1 0 0 1 .993.02l3.144 1.886-.644-3.864a1 1 0 0 1 .322-.911l2.756-2.45-3.675-.307a1 1 0 0 1-.827-.582L12 6.417Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {data?.lessonInTwoDays} học sinh liên hệ giảng viên này trong 48
                tiếng qua
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row text-base font-semibold border-2 rounded-lg border-black w-fit bg-white sticky top-[88px]">
          <div className="px-5 py-2 border-r-2 border-black cursor-pointer rounded-s-lg">
            Giới thiệu
          </div>
          <div className="px-5 py-2 border-r-2 border-black cursor-pointer">
            Lịch trình
          </div>
          <div className="px-5 py-2 border-r-2 border-black cursor-pointer">
            Resume
          </div>
          <div className="px-5 py-2 cursor-pointe rounded-e-lg">Trình độ</div>
        </div>

        <div className="flex flex-col py-12">
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

        <div className="flex flex-col">
          <div className="text-2xl font-semibold mb-4">Lịch trình</div>

          <Timetable/>
        </div>
      </div>
      <div> </div>
    </div>
  );
};

export default TutorDetail;
