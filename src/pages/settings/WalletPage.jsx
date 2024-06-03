import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import { toast } from "react-toastify";

const WalletPage = () => {
  const test = {
    amount: 100000,
    redirectUrl: "http://localhost:5173/settings/wallet",
    senderId: "5D9A911E-C29C-4C40-4E18-08DC7E68269C",
    receiverId: "A85AC974-3227-4031-E552-08DC7C73F8C7",
    choice: 1,
  };

  const mutation = useMutation({
    mutationFn: UserAPI.payment,
    onSuccess: async (data) => {
      console.log("link", data?.paymentUrl);
      localStorage.setItem("paymentSuccess", "true"); // Set flag
      window.location.href = data?.paymentUrl;
    },
    onError: (error) => {
      toast.error("Nạp tiền thất bại!");
      console.log(error.message);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (localStorage.getItem("paymentSuccess")) {
      toast.success("Nạp tiền thành công!");
      localStorage.removeItem("paymentSuccess"); // Remove flag
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-3xl font-bold">Quản lý ví</div>
      <div className="mb-6 w-fit">
        <div className="flex flex-row gap-5 border-2 border-black rounded-lg justify-center">
          <div className="flex flex-col gap-2 px-5 py-7">
            <div className="text-2xl font-semibold">Total Balance</div>
            <div>
              <div className="text-green-500 text-2xl font-semibold tracking-widest">
                +2.000.000
              </div>
              <div className="text-sm text-gray-400">Lần giao dịch gần nhất</div>
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() => handleSubmit(test)}
                className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-green-500 hover:text-white duration-300 cursor-pointer"
              >
                Nạp tiền
              </div>
              <div className="transition ease-in-out delay-150 border-2  border-black rounded-lg text-black py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-red-500 hover:text-white duration-300 cursor-pointer">
                Rút tiền
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-theme pr-3 pl-12 rounded-l-full">
            <div className="font-semibold text-white text-3xl">2.000.000đ</div>
            <div className="text-sm text-gray-400">Số dư khả dụng</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold text-2xl">Latest Transactions</div>
          <div className="transition ease-in-out delay-150 border-2  border-black rounded-lg text-black py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-theme hover:text-white duration-300 cursor-pointer">
            ...
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
