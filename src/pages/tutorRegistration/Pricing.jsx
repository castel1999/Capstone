import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";

const Pricing = (props) => {
  const setStage = props.setStage;
  const [price, setPrice] = useState(0);
  const [warning, setWarning] = useState("");

  const handleGoback = () => {
    setStage(5);
  };

  const handleSubmit = () => {
    const newWarning = price === 0 ? "Bạn cần điền thông tin này" : "";
    setWarning(newWarning);

    if (newWarning === "") {
      console.log('Price: ',price);
      alert("register finish");
    }
  };

  useEffect(() => {
    animateScroll.scrollToTop({duration: 400,
      smooth: true,});
  },[])

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">
        Đặt mức giá thuê hàng giờ của bạn
      </div>
      <input
        className={
          warning === ""
            ? "w-full px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            : "w-full px-[14px] py-[10px] border-2 border-[#a3120a] rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] bg-[#ffe2e0]"
        }
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(Number(e.target.value));
          setWarning("");
        }}
        min={0}
        step={1000}
        required
      />
      {price === 0 ? <div className="text-red-500">{warning}</div> : ""}

      <div className="px-4 py-2">
        <div className="font-semibold text-[16px]">Hoa hồng</div>
        <div>
          Chúng tôi sử dụng quỹ để thu hút nhiều sinh viên hơn và không ngừng
          cải tiến nền tảng học tập của mình
        </div>

        <div className="flex flex-row mt-5 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M18.567 6.176a1 1 0 0 1 .257 1.39l-7.563 11a1 1 0 0 1-1.648 0l-3.437-5a1 1 0 1 1 1.648-1.133l2.614 3.802 6.738-9.802a1 1 0 0 1 1.39-.257Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            Đối với tất cả các buổi học, chúng tôi sẽ tính phí theo tỷ lệ phần
            trăm (5%-10%) theo giờ
          </div>
        </div>
        <div className="flex flex-row mt-5 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M18.567 6.176a1 1 0 0 1 .257 1.39l-7.563 11a1 1 0 0 1-1.648 0l-3.437-5a1 1 0 1 1 1.648-1.133l2.614 3.802 6.738-9.802a1 1 0 0 1 1.39-.257Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            Bạn dạy càng nhiều giờ thì tỷ lệ hoa hồng của bạn sẽ càng thấp
          </div>
        </div>
        <div className="flex flex-col mt-5 px-6 py-4 gap-6 bg-[#f4f4f8]">
          <div className="flex flex-row justify-between font-semibold">
            <div>Số giờ dạy</div>
            <div>Phần trăm hoa hồng</div>
          </div>

          <div className="flex flex-row justify-between text-[20px]">
            <div className="text-[#121117]">Dưới 10</div>
            <div className="font-semibold">10%</div>
          </div>
          <div className="flex flex-row justify-between text-[20px]">
            <div className="text-[#121117]">10 - 20</div>
            <div className="font-semibold">8%</div>
          </div>
          <div className="flex flex-row justify-between text-[20px]">
            <div className="text-[#121117]">20 - 30</div>
            <div className="font-semibold">6%</div>
          </div>
          <div className="flex flex-row justify-between text-[20px]">
            <div className="text-[#121117]">Trên 30</div>
            <div className="font-semibold">5%</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse items-end gap-2">
        <div
          onClick={handleSubmit}
          className="px-6 py-2 border-2 border-black rounded-md bg-theme hover:bg-[#7E5FF4] text-white font-semibold cursor-pointer"
        >
          Hoàn thành
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

export default Pricing;
