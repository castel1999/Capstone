import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { IoIosArrowDown } from "react-icons/io";

const TutorListFilter = ({ data, setFilteredData }) => {
  const [searchName, setSearchItem] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const prevFilteredData = useRef([]);
  const searchPriceRef = useRef();
  const rageRef = useRef();

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchPriceRef.current &&
        !searchPriceRef.current.contains(event.target) &&
        rageRef.current &&
        !rageRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterData = () => {
    let filteredItems = data;

    // filter name
    if (searchName) {
      filteredItems = filteredItems.filter((user) =>
        user.tutorName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // filter subject
    if (selectedSubject) {
      filteredItems = filteredItems.filter((user) =>
        user.subjects.some((item) => item.title.includes(selectedSubject))
      );
    }

    // filter price
    if (priceRange) {
      filteredItems = filteredItems.filter(
        (user) =>
          user.pricePerHour >= priceRange[0] &&
          user.pricePerHour <= priceRange[1]
      );
    }

    // sorting
    if (sortOption === "highestPrice") {
      filteredItems = filteredItems.sort(
        (a, b) => b.pricePerHour - a.pricePerHour
      );
    } else if (sortOption === "lowestPrice") {
      filteredItems = filteredItems.sort(
        (a, b) => a.pricePerHour - b.pricePerHour
      );
    } else if (sortOption === "bestRating") {
      filteredItems = filteredItems.sort((a, b) => b.rating - a.rating);
    }

    if (
      JSON.stringify(prevFilteredData.current) !== JSON.stringify(filteredItems)
    ) {
      prevFilteredData.current = filteredItems;
      setFilteredData(filteredItems);
    }
  };

  useEffect(() => {
    filterData();
  }, [data, searchName, selectedSubject, priceRange, sortOption]);

  const handleSearchByName = (e) => {
    setSearchItem(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex flex-col mb-5 gap-4 h-11">
      <div className="flex">
        <input
          type="text"
          placeholder="Tìm với tên giảng viên..."
          value={searchName}
          onChange={handleSearchByName}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <select
          value={selectedSubject}
          onChange={handleLevelChange}
          className="border border-gray-300 rounded-md p-2 h-11"
        >
          <option value="">Tìm theo môn học</option>
          <option value="Toán cao cấp NEU">Toán cao cấp NEU</option>
          <option value="Toán 12">Toán 12</option>
          <option value="Ngữ văn 12">Ngữ văn 12</option>
          <option value="Test123">Test123</option>
        </select>
      </div>
      <div className="relative">
        <div
          ref={searchPriceRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row items-center gap-3 h-11 border border-gray-300 rounded-md py-2 pl-5 w-fit cursor-pointer"
        >
          Tìm kiếm theo giá:
          <p className="font-semibold">
            {priceRange[0]}$ - {priceRange[1]}$
          </p>
          <IoIosArrowDown className="text-gray-500"/>
        </div>
        {isOpen && (
          <Box
            ref={rageRef}
            className="absolute w-80 border rounded-lg px-5 py-3 bg-gray-200"
          >
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
          </Box>
        )}
      </div>
      <div>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md p-2 h-11"
        >
          <option value="">Sắp xếp theo...</option>
          <option value="highestPrice">Giá: Lớn nhất tới bé nhât</option>
          <option value="lowestPrice">Giá: Bé nhất tới lớn nhât</option>
          <option value="bestRating">Đánh giá tốt nhất</option>
        </select>
      </div>
    </div>
  );
};

export default TutorListFilter;
