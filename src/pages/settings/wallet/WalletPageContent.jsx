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
          <>
            {transaction.status === 0 ? (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.note === "Nạp tiền vào tài khoản" ? (
                    <div className="flex gap-1 items-center text-green-400">
                      <FaPlus /> {formatCurrency(transaction.amount)}
                    </div>
                  ) : transaction.note === "Rút tiền từ tài khoản" ? (
                    <div className="flex gap-1 items-center text-red-400">
                      <FaMinus /> {formatCurrency(transaction.amount)}
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.note === "Nạp tiền vào tài khoản" ? (
                    <div className="flex gap-1 items-center">
                      <FaArrowDown className="text-green-400" />
                      {transaction.note}
                    </div>
                  ) : transaction.note === "Rút tiền từ tài khoản" ? (
                    <div className="flex gap-1 items-center">
                      <FaArrowUp className="text-red-400" /> {transaction.note}
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </td>
              </tr>
            ) : (
              ""
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default WalletPageContent;
