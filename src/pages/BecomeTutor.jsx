import React from "react";
import becomeTutor1 from "../assets/becometutor1.png";
import becomeTutor2 from "../assets/becometutor2.png";
import becomeTutor3 from "../assets/becometutor3.png";
import becomeTutor4 from "../assets/becometutor4.png";
import onlineTutor from "../assets/online-tutor.jpg";
import { NavLink } from "react-router-dom";

const BecomeTutor = () => {
  const currUser = localStorage.getItem("role");

  return (
    <div className="flex flex-col justify-center items-center px-[60px] py-16 gap-32">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[42px] font-semibold">
            Kết nối bạn và gia sư dễ dàng và học hiệu quả
          </div>
          <div className="text-[16px] font-normal text-[#808080]">
            Bạn có thể tìm kiếm vô vàn khoá học phù hợp dễ dàng
          </div>
        </div>
        <div className="flex flex-row w-full mt-8 gap-8 justify-between">
          <img className="h-fit" src={becomeTutor1} />
          <div className="flex flex-col w-1/2 justify-center items-center gap-10">
            <NavLink
              to={currUser === null ? "/login" : "/tutor-registration"}
              className="text-[18px] text-white font-semibold shadow-buyButton cursor-pointer bg-[#F0631C] px-5 py-3 rounded-lg border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none duration-500"
            >
              Tạo hồ sơ ngay
            </NavLink>
            <div className="flex flex-row w-full justify-around">
              <img src={becomeTutor2} />
              <img src={becomeTutor3} />
            </div>
          </div>
          <img className="h-fit" src={becomeTutor4} />
        </div>
      </div>

      <div className="flex flex-row w-full border-2 border-black rounded-lg px-5 py-3">
        <div className="flex flex-col items-center border-r-2 border-black">
          <div className="text-[32px] font-semibold">Tiếp cận toàn quốc</div>
          <div className="text-[16px] font-normal w-[75%] text-center">
            Không bị giới hạn bởi địa lý, bạn có thể giảng dạy cho học viên ở
            mọi nơi trên toàn quốc. Điều này mở rộng cơ hội giao lưu và học hỏi
            với đa dạng học viên.
          </div>
        </div>
        <div className="flex flex-col items-center border-r-2 border-black">
          <div className="text-[32px] font-semibold">Thu nhập linh hoạt</div>
          <div className="text-[16px] font-normal w-[75%] text-center ">
            Tăng thu nhập thông qua việc mở rộng số lượng khóa học và số học
            viên. Thu nhập của bạn phụ thuộc vào sự năng động và khả năng thu
            hút học viên của profile mà bạn cung cấp.
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[32px] font-semibold">Giảng dạy tự do</div>
          <div className="text-[16px] font-normal w-[75%] text-center">
            Tự chọn phương pháp và nội dung giảng dạy theo sở thích và chuyên
            môn của bạn. Cách tiếp cận này giúp bạn phát huy tối đa sự sáng tạo
            trong giảng dạy.
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full bg-[#F0631C] rounded-lg border-2 border-black">
        <div className="flex flex-col justify-around gap-3 w-1/2 px-16 py-24">
          <div>
            <div className="text-[54px] font-bold tracking-tighter leading-[68px]">
              Kiếm tiền từ việc dạy online
            </div>
            <div className="text-[18px] ">
              Kết nối với hàng nghìn học sinh trên khắp cả nước và dạy từ phòng
              làm việc của bạn
            </div>
          </div>
          <NavLink
            to={currUser === null ? "/login" : "/tutor-registration"}
            className="w-full px-6 py-3 bg-black text-white rounded-lg cursor-pointer text-center font-medium text-[18px]"
          >
            Tạo hồ sơ ngay
          </NavLink>
        </div>
        <img className="w-1/2 rounded-e-lg" src={onlineTutor} />
      </div>
    </div>
  );
};

export default BecomeTutor;
