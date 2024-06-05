import React from "react";

const UpgradePage = () => {
  return (
    <div className="flex flex-col gap-5 my-5">
      <div className="mx-auto font-bold text-3xl">NÂNG CẤP TÀI KHOẢN</div>
      <div className="flex flex-row gap-5">
        <div className="border divide-y min-w-[400px]">
          <div className="font-bold px-4 flex flex-col justify-center h-[72px]">
            Loại tài khoản
          </div>
          <div className="p-3">Thời hạn sử dụng</div>
          <div className="p-3">detail 1</div>
          <div className="p-3">detail 2</div>
          <div className="p-3"></div>
        </div>
        <div>
          <div className="border divide-y min-w-36">
            <div className="font-bold p-2 flex flex-col justify-center items-center gap-2 ">
              <div className="text-theme">Thường</div>
              <div>Miễn phí</div>
            </div>
            <div className="p-3 text-center">Vĩnh viễn</div>
            <div className="p-3 text-center">detail 1</div>
            <div className="p-3 text-center">detail 2</div>
            <div className="p-3 text-center">
              <div className="border p-3 bg-slate-100 rounded-md font-semibold">
                Đã kích hoạt
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border divide-y min-w-36">
            <div className="font-bold p-2 flex flex-col justify-center items-center gap-2 ">
              <div className="text-theme">Premium</div>
              <div>5$</div>
            </div>
            <div className="p-3 text-center">1 tháng</div>
            <div className="p-3 text-center">detail 1</div>
            <div className="p-3 text-center">detail 2</div>
            <div className="p-3 text-center">
              <div className="border p-3 rounded-md text-theme bg-[#00754f1a] font-semibold hover:bg-theme hover:text-white cursor-pointer">
                Nâng cấp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
