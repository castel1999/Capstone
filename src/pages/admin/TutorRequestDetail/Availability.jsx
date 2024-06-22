import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const Availability = ({ tutorId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep5"],
    queryFn: () => AdminAPI.getTutorStep5(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 5</div>
      {data.map((item, index) => (
        <div key={index}>
          <div>Day of Week: {item.dayOfWeek}</div>
          <div>Start Time: {item.startTime}</div>
          <div>End Time: {item.endTime}</div>
        </div>
      ))}
    </div>
  );
};

export default Availability;
