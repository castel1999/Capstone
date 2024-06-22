import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const Education = ({ tutorId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep3"],
    queryFn: () => AdminAPI.getTutorStep3(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 3</div>
      {data.map((item, index) => (
        <div key={index}>
          <div>Title: {item.title}</div>
          <div>Description: {item.description}</div>
          <div>Location: {item.location}</div>
          <div>Start Date: {item.startDate}</div>
          <div>End Year: {item.endYear}</div>
          <img src={item.imageUrl} alt="Tutor Avatar" className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default Education;
