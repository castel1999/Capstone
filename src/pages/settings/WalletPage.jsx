import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import { toast } from "react-toastify";
import DepositModal from "./DepositModal";
import WithdrawalModal from "./WithdrawalModal";
import { useAuth } from "../../hooks/AuthContext";

const WalletPage = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [walletData, setWalletData] = useState(null);

  const { user } = useAuth();
  const userId = user.decodedToken.UserId;
  console.log(walletData);

  const updatePayment = useMutation({
    mutationFn: UserAPI.updateTransaction,
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
    mutationFn: UserAPI.walletTransaction,
    onSuccess: async (data) => {
      console.log("link", data?.paymentUrl);
      setTransactionId(data?.walletTransactionId);

      const update = {
        transactionId: data?.walletTransactionId,
        choice: 3,
        updateStatus: 0,
      };
      alert(update.transactionId);
      window.location.href = data?.paymentUrl;
      updatePayment.mutate(update);
    },
    onError: (error) => {
      if (error.status === 400 || error.status === 500) {
        toast.error("Nạp tối thiểu 10.000 VND và tối đa 10.000.000 VND");
      }
      console.log(error.message);
    },
  });

  const handleDeposit = (amount) => {
    const data = {
      amount: parseInt(amount, 10),
      redirectUrl: "http://localhost:5173/settings/wallet",
      senderId: "7CCB26A5-7224-4185-E553-08DC7C73F8C7",
      receiverId: `${walletData}`,
      choice: 1,
    };

    deposit.mutate(data);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const data = await UserAPI.getWallet(userId);
        setWalletData(data.walletId);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWalletData();
  }, [userId]);

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
      />
    </div>
  );
};

export default WalletPage;
