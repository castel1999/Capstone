import React from "react";

const WalletPageFilter = ({ onSortChange, onDateChange, dateRange }) => {
  return (
    <div className="flex gap-4">
      <select
        onChange={onSortChange}
        className="p-2 border-2 border-black rounded-lg"
      >
        <option value="">Sắp xếp theo: </option>
        <option value="amountHighToLow">Tiền: Cao nhất đến thấp nhất </option>
        <option value="amountLowToHigh">Tiền: Thấp nhất đến cao nhất </option>
      </select>
      <div className="flex items-center">
        <label className="mr-2">Từ ngày:</label>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={onDateChange}
          className="p-2 border-2 border-black rounded-lg"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2">Đến ngày:</label>
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={onDateChange}
          className="p-2 border-2 border-black rounded-lg"
        />
      </div>
    </div>
  );
};

export default WalletPageFilter;
