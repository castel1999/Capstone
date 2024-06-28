import React, { useRef, useState } from "react";
import DAva from "../../assets/DefaultAva.png";
import {
  MdCalendarMonth,
  MdOutlineMessage,
  MdPerson,
  MdCancel,
} from "react-icons/md";

const LessonsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const MenuRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== MenuRef.current) {
      setIsOpen(false);
    }
  });

  const handleChangleCalander = () => {
    alert("calander");
  };
  const handleMess = () => {
    alert("Mess");
  };
  const handleDetail = () => {
    alert("Detail");
  };

  const handleCancel = () => {
    setIsCancelOpen(true);
  };
  const menu = [
    {
      icon: <MdCalendarMonth />,
      text: "Đổi lịch học",
      onclick: handleChangleCalander,
    },
    {
      icon: <MdOutlineMessage />,
      text: "Nhắn tin với giảng viên",
      onclick: handleMess,
    },
    {
      icon: <MdPerson />,
      text: "Thông tin giảng viên",
      onclick: handleDetail,
    },
    {
      icon: <MdCancel />,
      text: "Hủy buổi học",
      onclick: handleCancel,
    },
  ];
  return (
    <div className="">
      <div className="text-3xl font-bold my-5">Buổi học kế tiếp</div>
      <div className="flex flex-row justify-between items-center p-5 border rounded-md">
        <div className="flex flex-row gap-5 items-center">
          <div>
            <img src={DAva} className="size-12" />
          </div>
          <div>
            <div className="font-semibold">
              Thứ 2, 01/07/2024, 09:00 - 09:50
            </div>
            <div className="text-gray-600">Nguyễn Văn A, Toán12</div>
          </div>
        </div>
        <div>
          <div
            ref={MenuRef}
            onClick={() => setIsOpen(!isOpen)}
            className="relative font-bold text-lg cursor-pointer"
          >
            ...
          </div>
          {isOpen ? (
            <div className="absolute w-[230px] mt-3 right-5 border rounded-md shadow-2xl p-3 bg-white">
              {menu?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.onclick()}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-theme hover:rounded-md hover:text-white"
                >
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {isCancelOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border rounded-md p-6 w-[400px]">
            <div className="flex justify-end">
              <div
                className="text-2xl cursor-pointer"
                onClick={() => setIsCancelOpen(!isCancelOpen)}
              >
                &times;
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <img src={DAva} alt="avatar" className="size-16 rounded-md" />
              <div className="font-bold text-xl">Hủy buổi học</div>
              <div>Thứ 2, 01/07/2024, 09:00 - 09:50</div>
            </div>
            <label htmlFor="reason" className="block mb-2 mt-10">
              Gửi lý do cho Nguyễn Văn A (Tùy chọn)
            </label>
            <textarea
              name="reason"
              id="reason"
              placeholder="Tôi cần hủy buổi học vì lý do..."
              className="border border-gray-300 rounded-md w-full p-2 mb-4"
            />
            <div className="flex justify-end gap-5">
              <button className="border border-gray-500 text-gray-700 px-4 py-2 rounded-md">
                Đổi buổi học
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LessonsPage;
