import React, { useState } from "react";

const Availability = (props) => {
  const setStage = props.setStage;
  const [dayOfWeek, setDayOfWeek] = useState(Array(7).fill(false));
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
  const [weekSchedule, setWeekSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [weekWarnings, setWeekWarnings] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    total: "",
  });

  const toggleDay = (index) => {
    const day = dayNames[index];
    setDayOfWeek(
      dayOfWeek.map((selected, idx) => (idx === index ? !selected : selected))
    );

    if (weekSchedule[day].length === 0 && !dayOfWeek[index]) {
      addTimeRange(day);
    }
    setWeekWarnings({ ...weekWarnings, ["total"]: "" });
  };

  const addTimeRange = (day) => {
    const updatedDay = [
      ...weekSchedule[day],
      { startingTime: "", endingTime: "" },
    ];
    const updatedWarnings = [
      ...weekWarnings[day],
      { startingTime: "", endingTime: "" },
    ];
    setWeekSchedule({ ...weekSchedule, [day]: updatedDay });
    setWeekWarnings({ ...weekWarnings, [day]: updatedWarnings });
  };

  const handleTimeChange = (day, index, newTime, field) => {
    const updatedDay = weekSchedule[day].map((timeRange, i) => {
      if (i === index) {
        return { ...timeRange, [field]: newTime };
      }
      return timeRange;
    });
    setWeekSchedule({ ...weekSchedule, [day]: updatedDay });

    const updatedWarnings = weekWarnings[day].map((warning, i) => {
      if (i === index) {
        const error = validateTimeRange(
          updatedDay[i].startingTime,
          updatedDay[i].endingTime
        );
        console.log(updatedDay[i].startingTime);
        console.log(updatedDay[i].endingTime);
        return { ...warning, [field]: error };
      }
      return warning;
    });
    setWeekWarnings({ ...weekWarnings, [day]: updatedWarnings });
  };

  const removeTimeRange = (day, index) => {
    const updatedDay = weekSchedule[day].filter((_, idx) => idx !== index);
    const updatedWarnings = weekWarnings[day].filter((_, idx) => idx !== index);
    setWeekSchedule({ ...weekSchedule, [day]: updatedDay });
    setWeekWarnings({ ...weekWarnings, [day]: updatedWarnings });
  };

  const validateTimeRange = (start, end) => {
    if (start === "" || end === "") return "Thời gian không được để trống";
    if (start >= end) return "Thời gian bắt đầu phải trước thời gian kết thúc";
    return "";
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

  const handleSubmit = () => {
    const allDaysOff = dayOfWeek.every((day) => !day);
    if (allDaysOff) {
      setWeekWarnings({
        ...weekWarnings,
        ["total"]: "Chọn ít nhất một ngày và thời gian để tiếp tục",
      });
    }
  };

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
              weekWarnings.total === "" ? "" : "text-[#a3120a]"
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
                  weekWarnings.total === ""
                    ? "border-black"
                    : "border-[#a3120a]"
                } rounded-md`}
              />
            )}
            {dayLabels[index]}
          </div>
          {dayOfWeek[index] ? (
            <div>
              {weekSchedule[dayNames[index]]?.map((timeRange, i) => (
                <div className="flex flex-row gap-2 mt-5 items-center">
                  <div className="flex flex-col flex-1">
                    {i == 0 ? <div>From</div> : ""}
                    {/* <input
                      className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                      type="time"
                      value={timeRange.startingTime}
                      onChange={() => {}}
                      step="1800"
                      required
                    /> */}
                    <select
                      className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                      value={timeRange.startingTime}
                      onChange={(e) =>
                        handleTimeChange(
                          dayNames[index],
                          i,
                          e.target.value,
                          "startingTime"
                        )
                      }
                    >
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
                      className="px-[14px] w-full py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                      value={timeRange.endingTime}
                      onChange={(e) =>
                        handleTimeChange(
                          dayNames[index],
                          i,
                          e.target.value,
                          "endingTime"
                        )
                      }
                    >
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
