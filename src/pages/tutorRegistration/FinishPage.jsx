import React from "react";

const FinishPage = () => {
  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">
        Cảm ơn bạn đã hoàn thành đăng ký!
      </div>
      <div className="text-[16px] ">
        Chúng tôi đã nhận được đơn đăng ký của bạn và hiện đang xem xét nó. Bạn
        sẽ nhận được một thông báo với trạng thái hồ sơ của bạn trong vòng 5
        ngày làm việc
      </div>
    </div>
  );
};

export default FinishPage;
