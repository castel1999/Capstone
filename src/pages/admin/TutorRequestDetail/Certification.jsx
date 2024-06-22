import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const Certification = ({ tutorId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep2"],
    queryFn: () => AdminAPI.getTutorStep2(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 2</div>
      {data?.map((item, index) => (
        <div key={index}>
          <img src={item.imageUrl} alt="Certificate" className="mb-4" />
          <div>Certificate Description: {item.certificateDescription}</div>
          <div>Certificate Form: {item.certificateForm}</div>
          <div>Certificate Name: {item.certificateName}</div>
          <div>Start Year: {item.startYear}</div>
          <div>End Year: {item.endYear}</div>
        </div>
      ))}
    </div>
  );
};

export default Certification;
