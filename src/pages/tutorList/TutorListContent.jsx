import React from "react";
import * as UserAPI from "../../api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TutorListContent = () => {

  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutorListData"],
    queryFn: UserAPI.getTutor,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleRent = ()=>{
    navigate('/tutor-detail/3')
  }

  return (
    <>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    className="size-4"
                  >
                    <path d="m12 21-7-3.8v-6L1 9l11-6 11 6v8h-2v-6.9l-2 1.1v6zm0-8.3L18.85 9 12 5.3 5.15 9zm0 6.025 5-2.7V12.25L12 15l-5-2.75v3.775z"></path>
                  </svg>
                  {item?.subject}
                </div>
                <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 8a5 5 0 1 1 10 0A5 5 0 0 1 7 8m13 13v-6H4v6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {item?.taughtLesson}
                </div>
                <div className="line-clamp-4">{item?.introduction}</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-1 font-semibold text-2xl w-24">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        className="size-4"
                      >
                        <path d="M23.97 8.721a.597.597 0 0 0-.507-.413l-7.744-.822-3.172-7.16c-.192-.435-.903-.435-1.095 0l-3.17 7.16-7.745.822a.601.601 0 0 0-.508.413.606.606 0 0 0 .17.635l5.785 5.248-1.616 7.667a.605.605 0 0 0 .586.729.595.595 0 0 0 .3-.081L12 19.003l6.747 3.916c.204.119.46.105.652-.035a.606.606 0 0 0 .234-.613l-1.616-7.668 5.786-5.248a.606.606 0 0 0 .168-.634z"></path>
                      </svg>
                      {item?.rating}
                    </div>
                    <div className="text-sm text-gray-400">
                      {item?.reviewNumb} reviews
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-28">
                    <div className="font-semibold text-2xl">${item?.price}</div>
                    <div className="text-sm text-gray-400">
                      {item?.lessonMinus}-min lesson
                    </div>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.899 5.94a4.913 4.913 0 1 1 6.835 7.058l-7.736 7.252-7.735-7.252a4.913 4.913 0 1 1 6.835-7.059l.9.9zm5.534 1.413a2.913 2.913 0 0 0-4.12 0l-2.315 2.315-2.315-2.315a2.913 2.913 0 1 0-4.052 4.186l6.367 5.97 6.368-5.97a2.913 2.913 0 0 0 .067-4.186"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-center mt-10">
                  <div onClick={handleRent} 
                  className="border-2 border-black rounded-lg p-3 text-white bg-theme cursor-pointer hover:opacity-90">
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
          <div>No tutors available</div>
        )}
      </div>
    </>
  );
};

export default TutorListContent;
