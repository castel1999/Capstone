import React from "react";
import { useNavigate } from "react-router-dom";

const TutorListContent = ({ data }) => {
  const navigate = useNavigate();

  const handleRent = () => {
    navigate("/tutor-detail/3");
  };

  return (
    <div className="flex flex-col gap-5">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-5 border-2 border-gray-400 rounded-md p-5 hover:border-theme w-fit mx-auto"
          >
            <div>
              <img
                src={item?.avatar}
                alt="Avatar"
                className="object-cover border rounded-md size-40"
              />
            </div>
            <div className="w-96">
              <div className="flex flex-row gap-1 font-semibold text-2xl">
                {item?.tutorName}
              </div>
              <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                {item?.level}
              </div>
              <div className="line-clamp-4">{item?.description}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <div className="flex flex-col gap-1 w-28">
                  <div className="font-semibold text-2xl">${item?.pricePerHour}</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-center mt-10">
                <div
                  onClick={handleRent}
                  className="border-2 border-black rounded-lg p-3 text-white bg-theme cursor-pointer hover:opacity-90"
                >
                  Thuê
                </div>
                <div className="border-2 border-gray-400 rounded-lg p-3 hover:bg-gray-100 cursor-pointer">
                  Nhắn tin
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No tutors match the search query</div>
      )}
    </div>
  );
};

export default TutorListContent;
