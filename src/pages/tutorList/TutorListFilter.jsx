import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const TutorListFilter = ({
  onSearchChange,
  onSubjectChange,
  onSortChange,
  onPriceChange,
  priceRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        sliderRef.current && !sliderRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const valuetext = (value) => {
    return `${value} USD`;
  };

  const formatNumber = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
        <select
          onChange={onSubjectChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Tìm môn học</option>
          <option value="Toán 12">Toán 12</option>
          <option value="Toán cao cấp NEU">Toán cao cấp NEU</option>
          <option value="Test123">Test123</option>
        </select>
      </div>
      <div className="mt-4">
        <select
          onChange={onSortChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Sắp xếp</option>
          <option value="priceHighToLow">Giá: Cao nhất đến thấp nhất</option>
          <option value="priceLowToHigh">Giá: Thấp nhất đến cao nhất</option>
          <option value="bestRating">Đánh giá: Đánh giá tốt nhất</option>
        </select>
      </div>
      <div className="mt-4">
        <div
          ref={searchRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 border border-gray-300 rounded cursor-pointer"
        >
          Tìm theo giá: {formatNumber(priceRange[0])} -{" "}
          {formatNumber(priceRange[1])}
        </div>
        {isOpen && (
          <Box
            ref={sliderRef}
            className="w-full py-2 px-5 border border-gray-300 rounded mt-2"
          >
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={onPriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={10000}
              max={100000}
            />
            <div className="flex justify-between">
              <div>{formatNumber(priceRange[0])}</div>
              <div>{formatNumber(priceRange[1])}</div>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TutorListFilter;
