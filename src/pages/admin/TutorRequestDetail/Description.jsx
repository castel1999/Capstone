import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const Description = ({ tutorId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep4"],
    queryFn: () => AdminAPI.getTutorStep4(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 4</div>
      <div>Description: {data.description}</div>
      <div>Education Experience: {data.educationExperience}</div>
      <div>Motivation: {data.motivation}</div>
      <div>Attractive Title: {data.attractiveTitle}</div>
    </div>
  );
};

export default Description;
