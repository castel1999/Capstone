import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(new moment());
  const current = new moment();
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [section, setSection] = useState("Morning");
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [lesson, setLesson] = useState({
    day: new moment(),
    time: "06:00",
    name: "Anna",
  });
  const [rescheduleDetails, setRescheduleDetails] = useState({
    newDay: null,
    newTime: null,
    reason: "",
  });

  useEffect(() => {
    initDayOfWeek(calendarDate);
  }, []);

  useEffect(() => {
    const handleCloseModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setShowRescheduleModal(false);
        setShowCancelModal(false);
      }
    };

    if (showModal || showRescheduleModal || showCancelModal) {
      document.addEventListener("mousedown", handleCloseModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [showModal, showRescheduleModal, showCancelModal]);

  const modalRef = useRef();

  const initDayOfWeek = (calendarDate) => {
    const tempRow = [];
    for (let i = 1; i <= 7; i++) {
      tempRow.push(calendarDate.clone().day(i));
    }
    setDayOfWeek(tempRow);
  };

  const moveToNextWeek = () => {
    setCalendarDate(calendarDate.clone().add(1, "week"));
    initDayOfWeek(calendarDate.clone().add(1, "week"));
  };

  const moveToPreviousWeek = () => {
    setCalendarDate(calendarDate.clone().subtract(1, "week"));
    initDayOfWeek(calendarDate.clone().subtract(1, "week"));
  };

  const generateTimeSectionOptions = (section) => {
    const options = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        if (
          (section === "Morning" && hour >= 0 && hour < 8) ||
          (section === "Afternoon" && hour >= 8 && hour < 16) ||
          (section === "Night" && hour >= 16 && hour < 24)
        ) {
          options.push(time);
        }
      }
    }

    return options;
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

  const handleOnDrag = (e) => {
    // e.dataTransfer.setData("lessonType", lesson);
  };

  const handleOnDrop = (e, day, time) => {
    // const currentLesson = e.dataTransfer.getData("lessonType");
    setRescheduleDetails({ newDay: day, newTime: time, reason: "" });
    setShowRescheduleModal(true);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleReschedule = () => {
    setLesson((prev) => ({
      ...prev,
      day: rescheduleDetails.newDay,
      time: rescheduleDetails.newTime,
    }));
    setShowRescheduleModal(false);
    toast.success("Đổi lịch học thành công !");
  };

  const handleCancel = () => {
    setLesson({
      day: null,
      time: null,
      name: "",
    });
    setShowCancelModal(false);
    toast.success("Hủy lịch học thành công !");
  };

  const handleDateChange = (e) => {
    const newDay = moment(e.target.value, "YYYY-MM-DD");
    setRescheduleDetails((prevDetails) => ({
      ...prevDetails,
      newDay,
    }));
  };

  const addMinutesToTime = (timeString, minutesToAdd) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);

    const updatedHours = date.getHours().toString().padStart(2, '0');
    const updatedMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${updatedHours}:${updatedMinutes}`;
  };

  return (
    <div
      className="flex flex-row h-full"
      style={{ height: "calc(100vh - 152px)" }}
    >
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="flex flex-col bg-white p-5 rounded-lg shadow-lg w-fit h-fit gap-5"
          >
            <div className="flex flex-row justify-between items-center flex-[0.1] border-b">
              <div className="flex flex-row h-full gap-3 items-center border-b-2 border-theme">
                <div className="font-semibold text-[20px]">Buổi học</div>
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

            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-col gap-1">
                <input
                  className="px-[14px] py-[10px] h-[50px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                  type="date"
                  min={current.format("YYYY-MM-DD")}
                  value={rescheduleDetails.newDay.format("YYYY-MM-DD")}
                  onChange={handleDateChange}
                />
                <div className="text-[#7B7A86]">
                  {lesson.day.format("dddd")}
                </div>
              </div>

              <div className="flex flex-row gap-5 justify-between">
                <div className="flex flex-col gap-1">
                  <select
                    className={
                      "px-[14px] py-[10px] h-[50px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    }
                    value={rescheduleDetails.newTime}
                    onChange={(e) =>
                      setRescheduleDetails((prevDetails) => ({
                        ...prevDetails,
                        newTime: e.target.value,
                      }))
                    }
                  >
                    {generateTimeOptions().map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="text-[#7B7A86]">50 phút</div>
                </div>
                <img
                  className="h-10 mt-1"
                  src="https://cdn-icons-png.flaticon.com/512/545/545682.png "
                  alt=""
                  title=""
                ></img>
                <div className="flex flex-col gap-1">
                  <select
                    className={
                      "px-[14px] py-[10px] h-[50px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
                    }
                    value={"10:50"}
                    disabled
                  >
                    <option>{addMinutesToTime(rescheduleDetails.newTime, 50)}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-4">
              <img
                className="h-6 w-6"
                src="https://cdn-icons-png.flaticon.com/512/456/456212.png "
                alt=""
                title=""
              />
              <img
                className="w-10 h-10 rounded-lg"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/capstone-c0906.appspot.com/o/defaultAva%2FDefaultAva.png?alt=media&token=7f4275d1-05c3-41ca-9ec4-091800bb5895"
                }
              />
              <div className="text-[18px]">Anna</div>
            </div>

            <div className="flex flex-col gap-2">
              <a href="https://meet.google.com/" target="_blank" className="text-center border-2 border-black p-2 rounded-md text-white font-semibold bg-theme hover:bg-[rgb(142,116,242)]">
                Vào lớp học
              </a>

              <button
                className="border-2 border-black p-2 rounded-md font-semibold hover:bg-[#E4E4E6]"
                onClick={() => {
                  setShowModal(false);
                  setShowRescheduleModal(true);
                }}
              >
                Đổi lịch học
              </button>

              <button className="border-2 border-black p-2 rounded-md text-white font-semibold bg-[#C8170E] hover:bg-[rgb(237,53,44)]"
                      onClick={() => {
                        setShowModal(false);
                        setShowCancelModal(true);
                      }}>
                Hủy lịch học
              </button>
            </div>
          </div>
        </div>
      )}

      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="flex flex-col bg-white p-5 rounded-lg shadow-lg w-fit h-fit"
          >
            <div className="flex flex-row justify-between items-center w-full flex-[0.1] border-b">
              <div className="flex flex-row h-full gap-3 items-center border-b-2 border-theme">
                <div className="font-semibold text-[20px]">Đổi lịch học</div>
              </div>
              <div
                className="p-2 bg-white hover:bg-[rgba(18,17,23,.06)] rounded-lg"
                onClick={() => setShowRescheduleModal(false)}
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
            <div className="mt-4">
              Chuyển lịch học từ{" "}
              <span className="font-semibold">
                {lesson.time} {lesson.day.format("DD-MM-YYYY")}
              </span>{" "}
              sang{" "}
              <span className="font-semibold">
                {rescheduleDetails.newTime}{" "}
                {rescheduleDetails.newDay.format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="reason" className="font-medium mb-2">
                Lý do đổi lịch học:
              </label>
              <textarea
                id="reason"
                className="border border-gray-300 p-2 rounded-md"
                rows="4"
                value={rescheduleDetails.reason}
                onChange={(e) =>
                  setRescheduleDetails({
                    ...rescheduleDetails,
                    reason: e.target.value,
                  })
                }
              />
              <button
                className="mt-4 border-2 border-black p-2 rounded-md font-semibold hover:bg-[#E4E4E6]"
                onClick={handleReschedule}
              >
                Đổi lịch học
              </button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="flex flex-col bg-white p-5 rounded-lg shadow-lg w-fit h-fit"
          >
            <div className="flex flex-row justify-between items-center w-full flex-[0.1] border-b">
              <div className="flex flex-row h-full gap-3 items-center border-b-2 border-theme">
                <div className="font-semibold text-[20px]">Hủy lịch học</div>
              </div>
              <div
                className="p-2 bg-white hover:bg-[rgba(18,17,23,.06)] rounded-lg"
                onClick={() => setShowCancelModal(false)}
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
            <div className="mt-4">
              Bạn có chắc chắn muốn hủy buổi học vào{" "}
              <span className="font-semibold">
                {lesson.time} {lesson.day.format("DD-MM-YYYY")}
              </span>?
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="reason" className="font-medium mb-2">
                Lý do hủy lịch học:
              </label>
              <textarea
                id="reason"
                className="border border-gray-300 p-2 rounded-md"
                rows="4"
                value={rescheduleDetails.reason}
                onChange={(e) =>
                  setRescheduleDetails({
                    ...rescheduleDetails,
                    reason: e.target.value,
                  })
                }
              />
              <button
                className="mt-4 border-2 border-black p-2 rounded-md font-semibold hover:bg-[#E4E4E6]"
                onClick={handleCancel}
              >
                Hủy lịch học
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#F3F3F8] flex flex-col p-8 w-1/5 h-full gap-5">
        <div className="flex cursor-pointer w-full text-[16px] border-2 border-[#DAD9E2] rounded-lg items-center justify-center py-3 font-semibold hover:bg-[#E4E4E6] active:bg-[#D3D2D9]">
          Tạo lịch trình của bạn
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-semibold text-[20px]">Thẻ</div>
          <div className="flex flex-row gap-3 font-medium items-center">
            <div className="h-4 w-4 rounded-full bg-[#004835] " /> Buổi học đơn
          </div>
          <div className="flex flex-row gap-3 font-medium items-center">
            <div className="h-4 w-4 rounded-full bg-[#002888] " /> Buổi học theo
            khóa
          </div>
          <div className="flex flex-row gap-3 font-medium items-center">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M13.97 2.715a3 3 0 0 0-3.94 0l-1.142.995a3 3 0 0 1-1.43.688l-1.489.273a3 3 0 0 0-2.456 3.08l.065 1.513a3 3 0 0 1-.353 1.547l-.715 1.334a3 3 0 0 0 .877 3.842l1.223.892a3 3 0 0 1 .99 1.24l.597 1.391a3 3 0 0 0 3.55 1.71l1.46-.4a3 3 0 0 1 1.586 0l1.46.4a3 3 0 0 0 3.55-1.71l.598-1.39a3 3 0 0 1 .989-1.241l1.223-.892a3 3 0 0 0 .877-3.842l-.715-1.334a3 3 0 0 1-.353-1.547l.065-1.513a3 3 0 0 0-2.456-3.08l-1.49-.273a3 3 0 0 1-1.43-.688l-1.14-.995Zm1.878 6.815a1 1 0 0 0-1.696-1.06l-2.977 4.763L9.8 11.4a1 1 0 1 0-1.6 1.2l2.25 3a1 1 0 0 0 1.648-.07z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>{" "}
            Học viên đã chấp nhận
          </div>
          <div className="flex flex-row gap-3 font-medium items-center">
            <div className="flex flex-row items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992700.png "
                className="w-4 h-4"
                alt=""
                title=""
              />
            </div>{" "}
            Học viên chưa chấp nhận
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row p-7 justify-between">
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row border-2 border-[#dcdce5] rounded-lg w-fit">
              <div
                className={
                  "px-3 py-[11px] border-r-2 border-[#dcdce5] hover:bg-[#ebebf1] cursor-pointer bg-white rounded-s-md"
                }
                onClick={() => moveToPreviousWeek()}
              >
                <svg
                  height="16"
                  viewBox="0 0 8 12"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.268 5.854l4.293 4.292-1.415 1.415L.44 5.854 6.146.146l1.415 1.415z"></path>
                </svg>
              </div>
              <div
                className="px-3 py-[11px] hover:bg-[#ebebf1] bg-white cursor-pointer rounded-e-md"
                onClick={() => moveToNextWeek()}
              >
                <svg
                  height="16"
                  viewBox="0 0 8 12"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.732 5.854L.44 1.56 1.854.146 7.56 5.854 1.854 11.56.439 10.146z"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center text-[20px] font-semibold">
              {calendarDate.format("MMM")} {calendarDate.clone().day(1).date()}-
              {calendarDate.clone().day(7).date()} {calendarDate.year()}
            </div>
            <div className="flex flex-row border-2 border-[#dcdce5] rounded-lg w-fit h-fit items-center">
              <div
                className={`px-4 py-2 border-r-2 border-[#dcdce5] hover:bg-[#ebebf1] cursor-pointer ${
                  section === "Morning" ? "bg-[#ebebf1]" : "bg-white"
                } rounded-s-md`}
                onClick={() => setSection("Morning")}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3222/3222794.png "
                  width="24"
                  height="24"
                  alt=""
                  title=""
                  class="img-small"
                />
              </div>
              <div
                className={`px-4 py-2 border-r-2 border-[#dcdce5] hover:bg-[#ebebf1] cursor-pointer ${
                  section === "Afternoon" ? "bg-[#ebebf1]" : "bg-white"
                } h-full`}
                onClick={() => setSection("Afternoon")}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3222/3222672.png "
                  width="24"
                  height="24"
                  alt=""
                  title=""
                  class="img-small"
                />
              </div>
              <div
                className={`px-4 py-2 hover:bg-[#ebebf1] ${
                  section === "Night" ? "bg-[#ebebf1]" : "bg-white"
                } cursor-pointer rounded-e-md h-full`}
                onClick={() => setSection("Night")}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4623/4623236.png "
                  width="24"
                  height="24"
                  alt=""
                  title=""
                  class="img-small"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full max-h-[94%] overflow-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="flex-1 font-normal py-3 border border-[#DEDEE2]"></th>
                {dayOfWeek.map((day) => (
                  <th
                    key={day.format("DD")}
                    className={`flex-1 font-normal py-3 border border-[#DEDEE2]  ${
                      current.diff(day, "days") === 0 &&
                      day?.format("DD") === current.format("DD")
                        ? "border-b-4 border-b-[#0046CF] text-[#0046CF]"
                        : ""
                    }`}
                  >
                    {day?.format("DD")} {day?.format("ddd")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTimeSectionOptions(section).map((time) => (
                <tr key={time}>
                  <th className="flex-1 font-normal py-3 border border-[#DEDEE2] text-[14px]">
                    {time}
                  </th>
                  {dayOfWeek.map((day) => (
                    <th
                      key={day.format("DD") + time}
                      className="flex-1 font-normal border border-[#DEDEE2] bg-[#F3F3F5]"
                      onDrop={(e) => handleOnDrop(e, day, time)}
                      onDragOver={handleOnDragOver}
                    >
                      {day?.format("DD") === lesson?.day?.format("DD") &&
                      time === lesson.time ? (
                        <div
                          className="w-full h-full p-1 cursor-pointer rounded-lg text-white bg-[#004835]"
                          draggable
                          onClick={() => {
                            setShowModal(true);
                            setRescheduleDetails((prevDetails) => ({
                              ...prevDetails,
                              newDay: lesson.day,
                              newTime: lesson.time,
                            }));
                          }}
                          onDragStart={(e) => handleOnDrag}
                        >
                          {lesson.name}
                        </div>
                      ) : (
                        ""
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
