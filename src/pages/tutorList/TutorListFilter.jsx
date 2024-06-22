import React from "react";

const TutorListFilter = ({ onSearchChange, onSubjectChange, onSortChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        autoFocus={true}
        placeholder="Tìm giảng viên"
        onChange={onSearchChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="mt-4">
        <select onChange={onSubjectChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Tìm môn học</option>
          <option value="Toán 12">Toán 12</option>
          <option value="Toán cao cấp NEU">Toán cao cấp NEU</option>
          <option value="Test123">Test123</option>
        </select>
      </div>
      <div className="mt-4">
        <select onChange={onSortChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Sắp xếp</option>
          <option value="priceHighToLow">Giá: Cao nhất đến thấp nhất</option>
          <option value="priceLowToHigh">Giá: Thấp nhất đến cao nhất</option>
          <option value="bestRating">Đánh giá: Đánh giá tốt nhất</option>
        </select>
      </div>
    </div>
  );
};

export default TutorListFilter;
