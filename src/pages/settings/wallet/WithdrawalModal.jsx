import React, { useState } from "react";

const WithdrawalModal = ({ isOpen, onClose, onSubmit, isLoading, isUpdate }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleDeposit = async (e) => {
    e.preventDefault();
    await onSubmit(amount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[10000]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Rút tiền</h2>
        <form onSubmit={handleDeposit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end">
            {isLoading ? (
              <button
                type="button"
                className={`bg-blue-500 text-white px-4 py-2 rounded cursor-progress`}
              >
                ...Đang xử lý
              </button>
            ) : (
              <>
                {isUpdate ? (
                  <button
                  type="button"
                  className={`bg-blue-500 text-white px-4 py-2 rounded cursor-progress`}
                >
                  ...Đang xử lý
                </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`mr-4 bg-gray-500 text-white px-4 py-2 rounded `}
                      onClick={onClose}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className={`bg-blue-500 text-white px-4 py-2 rounded `}
                    >
                      Rút tiền
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalModal;
