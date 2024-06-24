import React from "react";
import { FaArrowDown, FaArrowUp, FaPlus, FaMinus, FaBan } from "react-icons/fa";

const WalletPageContent = ({ currentPosts }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {/* <th
            scope="col"
            className="px-6 py-3 text-left font-semibold text-black uppercase tracking-wider"
          >
            NO
          </th> */}
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
        {currentPosts.map((transaction, index) => (
          <tr key={transaction.walletTransactionId}>
            {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
            </td> */}
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
                  <FaArrowDown className="text-green-400" /> {transaction.note}
                </div>
              ) : transaction.note === "Nạp tiền vào tài khoản" &&
                transaction.status === 1 ? (
                <div className="flex gap-1 items-center">
                  <FaArrowDown className="text-orange-400" /> {transaction.note}{" "}
                  thất bại
                </div>
              ) : transaction.note === "Rút tiền từ tài khoản" &&
                transaction.status === 0 ? (
                <div className="flex gap-1 items-center">
                  <FaArrowUp className="text-red-400" /> {transaction.note}
                </div>
              ) : transaction.note === "Rút tiền từ tài khoản" &&
                transaction.status === 1 ? (
                <div className="flex gap-1 items-center">
                  <FaArrowUp className="text-orange-400" /> {transaction.note}{" "}
                  thất bại
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
  );
};

export default WalletPageContent;
