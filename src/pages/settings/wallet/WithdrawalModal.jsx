import React, { useState } from "react";

const WithdrawalModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(amount);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Rút tiền</h2>
        <form onSubmit={handleWithdraw}>
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
              disabled={loading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className={`mr-4 bg-gray-500 text-white px-4 py-2 rounded ${loading ? 'cursor-progress' : ''}`}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'cursor-progress' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Rút tiền'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalModal;
