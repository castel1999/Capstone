import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import { toast } from "react-toastify";
import DepositModal from "./DepositModal";
import WithdrawalModal from "./WithdrawalModal";

// - nạp:
// senderId: id của admin
// receiverId: id tài khoản

// - rút: ngược lại

const WalletPage = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();

  const updatePayment = useMutation({
    mutationFn: UserAPI.updatePayment,
    onSuccess: async (data) => {
      toast.success("Nạp tiền thành công!");
      console.log("deposit success");
    },
    onError: (error) => {
      toast.error("Nạp tiền thất bại!");
      console.log(error.message);
    },
  });

  const deposit = useMutation({
    mutationFn: UserAPI.deposit,
    onSuccess: async (data) => {
      console.log("link", data?.paymentUrl);
      setTransactionId(data?.walletTransactionId);

      // Call updatePayment after setting transactionId
      const update = {
        transactionId: data?.walletTransactionId,
        choice: 3,
        updateStatus: 0,
      };
      alert(update.transactionId);
      window.location.href = data?.paymentUrl;
      updatePayment.mutate(update);

      // localStorage.setItem("paymentSuccess", "true");
    },
    onError: (error) => {
      if (error.status === 400 || error.status === 500) {
        toast.error("Nạp tối thiểu 10.000 VND và tối đa 10.000.000 VND");
      }

      // localStorage.removeItem("paymentSuccess");
      console.log(error.message);
    },
  });

  const handleDeposit = (amount) => {
    const data = {
      amount: parseInt(amount, 10), // Use the amount from input
      redirectUrl: "http://localhost:5173/settings/wallet",
      senderId: "7CCB26A5-7224-4185-E553-08DC7C73F8C7",
      receiverId: "5D9A911E-C29C-4C40-4E18-08DC7E68269C",
      choice: 1,
    };

    deposit.mutate(data);
  };

  // useEffect(() => {
  //   if (localStorage.getItem("paymentSuccess")) {
  //     toast.success("Nạp tiền thành công!");
  //     localStorage.removeItem("paymentSuccess");
  //   }
  // }, []);

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
              <div className="text-sm text-gray-400">
                Lần giao dịch gần nhất
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() => setIsDepositOpen(true)}
                className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-green-500 hover:text-white duration-300 cursor-pointer"
              >
                Nạp tiền
              </div>
              <div
                onClick={() => setIsWithdrawalOpen(true)}
                className="transition ease-in-out delay-150 border-2  border-black rounded-lg text-black py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-red-500 hover:text-white duration-300 cursor-pointer"
              >
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

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSubmit={handleDeposit}
      />
      <WithdrawalModal
        isOpen={isWithdrawalOpen}
        onClose={() => setIsWithdrawalOpen(false)}
        // onSubmit={() => handleSubmit(test.amount)}
      />
    </div>
  );
};

export default WalletPage;
