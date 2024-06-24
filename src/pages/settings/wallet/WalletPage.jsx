import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as UserAPI from "../../../api/UserAPI";
import { toast } from "react-toastify";
import DepositModal from "./DepositModal";
import WithdrawalModal from "./WithdrawalModal";
import { useAuth } from "../../../hooks/AuthContext";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Pagination from "./Pagination";
import WalletPageContent from "./WalletPageContent";
import WalletPageFilter from "./WalletPageFilter";

const WalletPage = () => {
  const queryClient = useQueryClient();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const location = useLocation();
  const values = queryString.parse(location.search);

  const { user } = useAuth();
  const userId = user.decodedToken.UserId;

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => UserAPI.getWallet(userId),
  });

  const {
    data: lastTransaction,
    isLoading: isLastTransactionLoading,
    isError: isLastTransactionError,
  } = useQuery({
    queryKey: ["lastTransaction", userId],
    queryFn: () => UserAPI.getLastTransaction(walletData?.walletId),
    enabled: !!walletData,
  });

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ["transactions", walletData?.walletId],
    queryFn: () => UserAPI.getWalletTransaction(walletData?.walletId),
    enabled: !!walletData,
  });

  useEffect(() => {
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
      toast.success("Giao dịch thành công!");
      await queryClient.invalidateQueries("wallet");
      await queryClient.invalidateQueries("transactions");
    },
    onError: (error) => {
      toast.error("Giao dịch thất bại!");
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

  if (isWalletLoading || isTransactionsLoading || isLastTransactionLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletError || isTransactionsError) {
    return ;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const filterByDateRange = (transactions, startDate, endDate) => {
    if (!startDate || !endDate) return transactions;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter((transaction) => {
      const date = new Date(transaction.createdAt);
      return date >= start && date <= end;
    });
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredTransactions = filterByDateRange(
    transactions,
    dateRange.startDate,
    dateRange.endDate
  );

  const sortedData = filteredTransactions?.sort((a, b) => {
    switch (sortOption) {
      case "amountHighToLow":
        return b.amount - a.amount;
      case "amountLowToHigh":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateRange({
      ...dateRange,
      [event.target.name]: event.target.value,
    });
  };

  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(transactions?.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-3xl font-bold">Quản lý ví</div>
      <div className="mb-6 w-fit">
        <div className="flex flex-row gap-5 border-2 border-black rounded-lg justify-center">
          <div className="flex flex-col gap-2 px-5 py-7">
            <div className="text-2xl font-semibold">Tổng số tiền</div>
            <div>
              <div className="text-green-500 text-2xl font-semibold tracking-widest">
                {lastTransaction?formatCurrency(lastTransaction?.amount):formatCurrency(0)}
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
          <div className="flex gap-5">
            <WalletPageFilter 
              onSortChange={handleSortChange} 
              onDateChange={handleDateChange} 
              dateRange={dateRange}
            />
          </div>
        </div>
        <div className="overflow-x-auto mb-10 flex flex-col items-center">
          <WalletPageContent currentPosts={currentPosts} />
          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={sortedData?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
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
