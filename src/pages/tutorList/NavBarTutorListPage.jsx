import React, { useState } from "react";

const NavBarTutorListPage = () => {
  const options = [
    { id: 1, name: "Toán" },
    { id: 2, name: "Lý" },
    { id: 3, name: "Hóa" },
    { id: 4, name: "Văn" },
    { id: 5, name: "Anh văn" },
    { id: 6, name: "Sinh học" },
    { id: 7, name: "Địa lý" },
  ];

  const initialOptionId = options[0].id;
  const [selectedOption, setSelectedOption] = useState(initialOptionId);

  const handleDropdownChange = (event) => {
    const optionId = event.target.value;

    setSelectedOption(optionId);
  };

  return (
    <div className="self-start p-5 ">
      <div className="flex flex-row justify-between">
        <div>
          <input type="text" />
        </div>
        <div>
          <select value={selectedOption} onChange={handleDropdownChange}>
            {options.map(({ id, name }) => {
              return (
                <option key={name} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NavBarTutorListPage;
