import React from "react";
import MyLessonFilter from "./MyLessonFilter";
import MyLessonContent from "./MyLessonContent";
import * as UserAPI from "../../api/UserAPI";
import { useQuery } from "@tanstack/react-query";

const MylessonPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myData"],
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

  return (
    <div className="py-5">
      <div>
        <MyLessonFilter />
      </div>
      <div className="px-11 ">
        <MyLessonContent data={data}/>
      </div>
    </div>
  );
};

export default MylessonPage;
