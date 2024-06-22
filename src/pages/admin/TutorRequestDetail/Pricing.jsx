import React from "react";
import * as AdminAPI from "../../../api/AdminAPI";
import { useQuery } from "@tanstack/react-query";

const Pricing = ({ tutorId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorRequestStep6"],
    queryFn: () => AdminAPI.getTutorStep6(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Step 6</div>
      <div>Price: {data.price}</div>
    </div>
  );
};

export default Pricing;
