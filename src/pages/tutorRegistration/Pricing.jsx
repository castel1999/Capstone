import React from "react";

const Pricing = (props) => {
  const setStage = props.setStage;

  const handleGoback = () => {
    setStage(5);
  };

  const handleSubmit = () => {
    alert('register finish')
  };

  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">
        Đặt mức giá thuê hàng giờ của bạn
      </div>
      <input
        className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
        type="number"
        onChange={(e) => {}}
        min={0}
        step={1000}
        required
      />

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
