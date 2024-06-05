import React from "react";

const ResetPassPage = () => {
  return (
    <div className="flex flex-col gap-5 w-[384px]">
      <div className="text-3xl font-bold my-5 ">Đổi mật khẩu</div>
      <div className="flex flex-col gap-3">
        <label htmlFor="curPass" className="font-semibold">
          Nhập mật khẩu hiện tại
        </label>
        <input
          id="curPass"
          type="password"
          className="border border-black rounded-lg p-3"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="newPass" className="font-semibold">
          Nhập mật khẩu mới
        </label>
        <input
          id="newPass"
          type="password"
          className="border border-black rounded-lg p-3"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="confirmPass" className="font-semibold">
          Nhập lại mật khẩu
        </label>
        <input
          id="confirmPass"
          type="password"
          className="border border-black rounded-lg p-3"
        />
      </div>
      <div className="border border-black bg-theme p-4 rounded-lg w-[40%] ">Đổi mật khẩu</div>
    </div>
  );
};

export default ResetPassPage;
