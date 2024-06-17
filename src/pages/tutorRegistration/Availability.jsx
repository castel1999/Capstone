import { CleanHands } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { toast } from "react-toastify";
import * as TutorApi from "../../api/TutorApi";

const Availability = (props) => {
  const setStage = props.setStage;
  const setIsStage5Completed = props.setIsStage5Completed;
  const weekSchedule = props.weekSchedule;
  const setWeekSchedule = props.setWeekSchedule;
  const tutorId = props.tutorId;
  const current = new moment();
  const [dayOfWeek, setDayOfWeek] = useState(Array(7).fill(false));
  const [total, setTotal] = useState(false);
  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayLabels = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  const [weekWarnings, setWeekWarnings] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const addTimeRange = (day) => {
    const updatedWarning = [
      ...weekWarnings[day],
      { startTime: "", endTime: "" },
    ];

    const updatedDay = [...weekSchedule[day], { startTime: "", endTime: "" }];

    setWeekWarnings((prevWarnings) => ({
      ...prevWarnings,
      [day]: updatedWarning,
    }));

    setWeekSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: updatedDay,
    }));
  };

  const toggleDay = (index) => {
    const day = dayNames[index];
    setDayOfWeek(
      dayOfWeek.map((selected, idx) => (idx === index ? !selected : selected))
    );

    if (weekSchedule[day].length === 0 && !dayOfWeek[index]) {
      addTimeRange(day);
    }
    setTotal(false);
  };

  const handleTimeChange = (day, index, newTime, field) => {
    const updatedDay = weekSchedule[day].map((timeRange, i) => {
      if (i === index) {
        return { ...timeRange, [field]: newTime };
      }
      return timeRange;
    });
    setWeekSchedule({ ...weekSchedule, [day]: updatedDay });

    const updatedWarning = weekWarnings[day].map((timeRange, i) => {
      if (i === index) {
        return { ...timeRange, [field]: "" };
      }
      return timeRange;
    });
    setWeekWarnings({ ...weekWarnings, [day]: updatedWarning });
  };

  const removeTimeRange = (day, index) => {
    const updatedDay = weekSchedule[day].filter((_, idx) => idx !== index);
    const updatedWarnings = weekWarnings[day].filter((_, idx) => idx !== index);
    setWeekSchedule({ ...weekSchedule, [day]: updatedDay });
    setWeekWarnings({ ...weekWarnings, [day]: updatedWarnings });
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleGoback = () => {
    setStage(4);
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time?.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const areAllWarningsEmpty = () => {
    return Object.values(weekWarnings).every((dayWarnings) =>
      dayWarnings.every(
        (warning) => warning.startTime === "" && warning.endTime === ""
      )
    );
  };

  const mutation = useMutation({
    mutationFn: (variables) =>
      TutorApi.registerTutorStep5(
        { request: variables.targetValue },
        variables.tutorId
      ),
    onSuccess: (data) => {
      setIsStage5Completed(true);
      toast.success("Thêm thời gian biểu thành công !");
      setStage(6);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const submitStep5 = () => {
    const targetValue = [];
    dayNames.map((day, index) => {
      if (weekSchedule[day].length !== 0)
        targetValue.push({
          dayOfWeek: index !== 6 ? index + 2 : 0,
          tutorStartTimeEndTimRegisterRequests: weekSchedule[day],
        });
    });

    mutation.mutate({ targetValue, tutorId });
  };

  const handleSubmit = () => {
    const allDaysOff = dayOfWeek.every((day) => !day);
    if (allDaysOff) {
      setTotal(true);
      return;
    }

    let newWarnings = { ...weekWarnings };
    let finalTimeTable = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    dayNames.forEach((day, index) => {
      weekSchedule[day].forEach((timeRange, i) => {
        const startMinutes = convertTimeToMinutes(timeRange.startTime);
        const endMinutes = convertTimeToMinutes(timeRange.endTime);
        let warning = {
          startTime: "",
          endTime: "",
        };

        if (dayOfWeek[index]) {
          finalTimeTable[day].push(timeRange);
          if (timeRange.startTime === "") {
            warning.startTime = "Thông tin này là bắt buộc.";
          } else if (
            i > 0 &&
            startMinutes <
              convertTimeToMinutes(weekSchedule[day][i - 1]?.endTime)
          ) {
            warning.startTime = "Giờ không hợp lệ";
          }

          if (timeRange.endTime === "") {
            warning.endTime = "Thông tin này là bắt buộc.";
          } else if (endMinutes < startMinutes) {
            warning.endTime = "Giờ không hợp lệ";
          }
        }

        newWarnings[day][i] = warning;
      });
    });
    setWeekWarnings(newWarnings);

    if (areAllWarningsEmpty()) {
      submitStep5();
      setIsStage5Completed(true);
      setStage(6);
    }
  };

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 400, smooth: true });
  }, []);

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">
        Đặt thời gian biểu của bạn
      </div>
      <div className="text-[16px]">
        Đặt giờ làm việc tiềm năng của bạn. Sinh viên có thể đặt buổi học vào
        những thời điểm này.
      </div>
      {dayOfWeek.map((day, index) => (
        <div key={index}>
          <div
            className={`flex flex-row gap-3 cursor-pointer w-fit ${
              !total ? "" : "text-[#a3120a]"
            }`}
            onClick={() => toggleDay(index)}
          >
            {dayOfWeek[index] ? (
              <div className="h-6 w-6 bg-black rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.923 17.101 6 13.18 7.179 12l2.744 2.744L17.667 7l1.178 1.179z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            ) : (
              <div
                className={`h-6 w-6 bg-white border-2 ${
                  !total ? "border-black" : "border-[#a3120a]"
                } rounded-md`}
              />
            )}
            {dayLabels[index]}
          </div>
          {dayOfWeek[index] ? (
            <div>
              {weekSchedule[dayNames[index]]?.map((timeRange, i) => (
                <>
                  <div
                    className="flex flex-row gap-2 mt-5 items-center"
                    key={i}
                  >
                    <div className="flex flex-col flex-1">
                      {i == 0 ? <div>From</div> : ""}
                      <select
                        className={
                          weekWarnings[dayNames[index]][i]?.startTime === ""
                            ? "px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                            : "px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2]  bg-[#ffe2e0]"
                        }
                        value={timeRange.startTime}
                        onChange={(e) =>
                          handleTimeChange(
                            dayNames[index],
                            i,
                            e.target.value,
                            "startTime"
                          )
                        }
                      >
                        <option key={""} value={""}>
                          --:--
                        </option>
                        {timeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col flex-1">
                      {i == 0 ? <div>To</div> : ""}
                      <select
                        className={
                          weekWarnings[dayNames[index]][i]?.endTime === ""
                            ? "px-[14px] w-full py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                            : "px-[14px] w-full py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2]  bg-[#ffe2e0]"
                        }
                        value={timeRange.endTime}
                        onChange={(e) =>
                          handleTimeChange(
                            dayNames[index],
                            i,
                            e.target.value,
                            "endTime"
                          )
                        }
                      >
                        <option key={""} value={""}>
                          --:--
                        </option>
                        {timeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {weekSchedule[dayNames[index]].length > 1 ? (
                      <div
                        className="flex w-10 hover:bg-[rgba(18,17,23,.06)] rounded-md cursor-pointer p-2"
                        onClick={() => removeTimeRange(dayNames[index], index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                          className="w-full"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16 3H8v2h8zM3 6h18v2h-2v13H5V8H3zm4 2h10v11H7zm2 2h2v7H9zm6 0h-2v7h2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="flex flex-row mt-2">
                    {weekWarnings[dayNames[index]][i]?.startTime === "" ? (
                      <div className="flex-1"></div>
                    ) : (
                      <div className="text-[#a3120a] flex-1">
                        {weekWarnings[dayNames[index]][i]?.startTime}
                      </div>
                    )}
                    {weekWarnings[dayNames[index]][i]?.endTime === "" ? (
                      ""
                    ) : (
                      <div className="ml-5 text-[#a3120a] flex-1">
                        {weekWarnings[dayNames[index]][i]?.endTime}
                      </div>
                    )}
                  </div>
                </>
              ))}
              <div
                className="font-semibold underline cursor-pointer mt-3"
                onClick={() => addTimeRange(dayNames[index])}
              >
                Thêm một khoảng thời gian khác
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}

      {!total ? (
        ""
      ) : (
        <div className="flex flex-row px-4 py-3 bg-[#ffe2e0] items-center gap-3 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M15.291 4.055 12 2 8.709 4.055l-3.78.874-.874 3.78L2 12l2.055 3.291.874 3.78 3.78.874L12 22l3.291-2.055 3.78-.874.874-3.78L22 12l-2.055-3.291-.874-3.78zM10.981 7.2l.126 6.608H12.9l.126-6.608zm.224 9.688q.336.322.798.322.463 0 .784-.322a1.1 1.1 0 0 0 .336-.798q0-.463-.336-.784a1.05 1.05 0 0 0-.784-.336 1.1 1.1 0 0 0-.798.336 1.07 1.07 0 0 0-.322.784q0 .462.322.798"
              clipRule="evenodd"
            ></path>
          </svg>
          Chọn ít nhất một ngày và thời gian để tiếp tục
        </div>
      )}

      <div className="flex flex-row-reverse items-end gap-2">
        <div
          onClick={handleSubmit}
          className="px-6 py-2 border-2 border-black rounded-md bg-theme hover:bg-[#7E5FF4] text-white font-semibold cursor-pointer"
        >
          Lưu và tiếp tục
        </div>
        <div
          onClick={handleGoback}
          className="px-6 py-2 text-center border-2 border-[#dcdce5] rounded-md w-fit hover:bg-[rgba(18,17,23,.06)] cursor-pointer"
        >
          Trở lại
        </div>
      </div>
    </div>
  );
};

export default Availability;
