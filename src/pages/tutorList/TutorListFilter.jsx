import React, { useState, useEffect } from "react";

const TutorListFilter = ({ data, setFilteredData }) => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    filterData();
  }, [data, searchItem, selectedLevel]);

  const handleSearchByName = (e) => {
    setSearchItem(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const filterData = () => {
    let filteredItems = data;

    if (searchItem) {
      filteredItems = filteredItems.filter((user) =>
        user.tutorName.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    if (selectedLevel) {
      filteredItems = filteredItems.filter(
        (user) => user.level === selectedLevel
      );
    }

    setFilteredData(filteredItems);
  };

  return (
    <div className="flex items-center mb-5 gap-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchItem}
          onChange={handleSearchByName}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Select level</option>
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
    </div>
  );
};

export default TutorListFilter;
