import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserAPI from "../../api/UserAPI";
import { toast } from "react-toastify";
import DepositModal from "./DepositModal";
import WithdrawalModal from "./WithdrawalModal";
import { useAuth } from "../../hooks/AuthContext";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { FaArrowDown, FaArrowUp, FaPlus, FaMinus, FaBan } from "react-icons/fa";

const WalletPage = () => {
  const queryClient = useQueryClient();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();

  const location = useLocation();
  const values = queryString.parse(location.search);

  const { user } = useAuth();
  const userId = user.decodedToken.UserId;

  const { data: walletData, isLoading: isWalletLoading } = useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => UserAPI.getWallet(userId),
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["transactions", walletData?.walletId],
    queryFn: () => UserAPI.getWalletTransaction(walletData.walletId),
    enabled: !!walletData,
  });

  useEffect(() => {
    console.log('val',values);
    const update = {
      transactionId: values?.vnp_OrderInfo,
      choice: 3,
      updateStatus: 0,
    };

    if (values?.vnp_ResponseCode === "00") {
      updatePayment.mutate(update);
    } else if (values?.vnp_ResponseCode === "24") {
      toast.error("24");
    }
  }, [location]);

  const updatePayment = useMutation({
    mutationFn: UserAPI.updateTransaction,
    onSuccess: async () => {
      toast.success("Nạp tiền thành công!");
      await queryClient.invalidateQueries("wallet");
      await queryClient.invalidateQueries("transactions");
    },
    onError: (error) => {
      toast.error("Nạp tiền thất bại!");
      console.log(error.message);
    },
  });

  const walletTransaction = useMutation({
    mutationFn: UserAPI.walletTransaction,
    onSuccess: (data) => {
      window.location.href = data?.paymentUrl;
    },
    onError: (error) => {
      if (error.status === 400 || error.status === 500) {
        toast.error("Nạp tối thiểu 10.000 VND và tối đa 10.000.000 VND");
      }
      console.log(error.message);
    },
  });

  const handleDeposit = async (amount) => {
    const data = {
      amount: parseInt(amount, 10),
      redirectUrl:
        "http://localhost:5173/settings/wallet" ||
        "https://capstone-snowy-one.vercel.app/settings/wallet",
      senderId: "7CCB26A5-7224-4185-E553-08DC7C73F8C7",
      receiverId: `${walletData?.walletId}`,
      choice: 1,
    };

    await walletTransaction.mutateAsync(data);
  };

  if (isWalletLoading || isTransactionsLoading) {
    return <div>Loading...</div>;
  }

  const handleWithdraw = async (amount) => {
    const data = {
      amount: parseInt(amount, 10),
      redirectUrl:
        "http://localhost:5173/settings/wallet" ||
        "https://capstone-snowy-one.vercel.app/settings/wallet",
      senderId: `${walletData?.walletId}`,
      receiverId: "7CCB26A5-7224-4185-E553-08DC7C73F8C7",
      choice: 2,
    };

    await walletTransaction.mutateAsync(data);
  };

  if (isWalletLoading || isTransactionsLoading) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
              {updatePayment.isPending ? (
                <div className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4  cursor-progress">
                  ...Processing
                </div>
              ) : (
                <div
                  onClick={() => setIsDepositOpen(true)}
                  className="transition ease-in-out delay-150 border-2 bg-theme border-black rounded-lg text-white py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-green-500 hover:text-white duration-300 cursor-pointer"
                >
                  Nạp tiền
                </div>
              )}

              <div
                onClick={() => setIsWithdrawalOpen(true)}
                className="transition ease-in-out delay-150 border-2  border-black rounded-lg text-black py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-red-500 hover:text-white duration-300 cursor-pointer"
              >
                Rút tiền
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-theme pr-3 pl-12 rounded-l-full">
            <div className="font-semibold text-white text-3xl">
              {formatCurrency(walletData.amount)}
            </div>
            <div className="text-sm text-gray-400">Số dư khả dụng</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-between items-center mb-9">
          <div className="font-semibold text-2xl">Thống kê giao dịch</div>
          <div className="transition ease-in-out delay-150 border-2  border-black rounded-lg text-black py-1 px-4 mb-4 shadow-[rgba(0,0,0,1)_4px_5px_4px_0px] hover:-translate-x-[-6px] hover:-translate-y-[-6px] hover:shadow-none hover:bg-theme hover:text-white duration-300 cursor-pointer">
            ...
          </div>
        </div>
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-semibold text-black uppercase tracking-wider"
                >
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-semibold text-black uppercase tracking-wider"
                >
                  Số tiền
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-semibold text-black uppercase tracking-wider"
                >
                  Loại giao dịch
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-semibold text-black uppercase tracking-wider"
                >
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={transaction.walletTransactionId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.note === "Nạp tiền vào tài khoản" &&
                    transaction.status === 0 ? (
                      <div className="flex gap-1 items-center text-green-400">
                        <FaPlus /> {formatCurrency(transaction.amount)}
                      </div>
                    ) : transaction.note === "Nạp tiền vào tài khoản" &&
                      transaction.status === 1 ? (
                      <div className="flex gap-1 items-center text-orange-400">
                        <FaPlus /> {formatCurrency(transaction.amount)}
                      </div>
                    ) : transaction.note === "Rút tiền từ tài khoản" &&
                      transaction.status === 0 ? (
                      <div className="flex gap-1 items-center text-red-400">
                        <FaMinus /> {formatCurrency(transaction.amount)}
                      </div>
                    ) : transaction.note === "Rút tiền từ tài khoản" &&
                      transaction.status === 1 ? (
                      <div className="flex gap-1 items-center text-orange-400">
                        <FaMinus /> {formatCurrency(transaction.amount)}
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.note === "Nạp tiền vào tài khoản" &&
                    transaction.status === 0 ? (
                      <div className="flex gap-1 items-center">
                        <FaArrowDown className="text-green-400" />{" "}
                        {transaction.note}
                      </div>
                    ) : transaction.note === "Nạp tiền vào tài khoản" &&
                      transaction.status === 1 ? (
                      <div className="flex gap-1 items-center">
                        <FaArrowDown className="text-orange-400" />{" "}
                        {transaction.note} thất bại
                      </div>
                    ) : transaction.note === "Rút tiền từ tài khoản" &&
                      transaction.status === 0 ? (
                      <div className="flex gap-1 items-center">
                        <FaArrowUp className="text-red-400" />{" "}
                        {transaction.note}
                      </div>
                    ) : transaction.note === "Rút tiền từ tài khoản" &&
                      transaction.status === 1 ? (
                      <div className="flex gap-1 items-center">
                        <FaArrowUp className="text-orange-400" />{" "}
                        {transaction.note} thất bại
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        onSubmit={handleWithdraw}
      />
    </div>
  );
};

export default WalletPage;
