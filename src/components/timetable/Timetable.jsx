import moment from "moment";
import React, { useEffect, useState } from "react";

const Timetable = () => {
  const current = new moment();
  const [timeDuration, setTimeDuration] = useState(25);
  const [calendarDate, setCalendarDate] = useState(new moment());
  const [dayOfWeek, setDayOfWeek] = useState([]);

  useEffect(() => {
    initDayOfWeek(calendarDate);
  }, []);

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
    if (current.diff(calendarDate, "days") < 0)
      setCalendarDate(calendarDate.clone().subtract(1, "week"));
    initDayOfWeek(calendarDate.clone().add(1, "week"));
  };

  return (
    <div className="w-full flex flex-col pb-14">
      <div className="w-full bg-[#F4F4F8] flex flex-row justify-between rounded-lg">
        <div
          className={
            timeDuration == 25
              ? "w-[49%] cursor-default flex justify-center content-center px-6 py-1 border-2 border-solid border-[#dcdce5] bg-white rounded-lg font-semibold"
              : "w-[49%] cursor-pointer flex justify-center content-center px-6 py-1 font-semibold hover:bg-[#ebebf1] rounded-lg"
          }
          onClick={() => setTimeDuration(25)}
        >
          25 mins
        </div>
        <div
          className={
            timeDuration == 50
              ? "w-[49%] cursor-default flex justify-center content-center px-6 py-1 border-2 border-solid border-[#dcdce5] bg-white rounded-lg font-semibold"
              : "w-[49%] cursor-pointer flex justify-center content-center px-6 py-1 font-semibold hover:bg-[#ebebf1] rounded-lg"
          }
          onClick={() => setTimeDuration(50)}
        >
          50 mins
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row border-2 border-[#dcdce5] rounded-lg">
            <div
              className={
                current.diff(calendarDate, "days") >= 0
                  ? "px-4 py-2 border-r-2 border-[#dcdce5] bg-[#dcdce5] cursor-not-allowed"
                  : "px-4 py-2 border-r-2 border-[#dcdce5] hover:bg-[#ebebf1] cursor-pointer bg-white"
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
              className="px-4 py-2 hover:bg-[#ebebf1] bg-white cursor-pointer"
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
          <div className="flex items-center text-[]">
            {calendarDate.format("MMM")} {calendarDate.clone().day(1).date()}-
            {calendarDate.clone().day(7).date()} {calendarDate.year()}
          </div>
        </div>
        <div>asdfasfd</div>
      </div>

      <div className="flex flex-row pt-4 gap-2">
        {dayOfWeek?.map((day) => (
          <div className="flex flex-col flex-1 border-t-4 border-[#ff7aac] py-4">
            <div className="flex justify-center text-gray-500">
              {day?.format("ddd")}
            </div>
            <div className="flex justify-center text-gray-500">
              {day?.format("DD")}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            03:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            03:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            03:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            03:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            00:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            01:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            02:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            03:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:00
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            22:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
          <div className="flex justify-center py underline font-medium py-3 cursor-pointer">
            23:30
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
