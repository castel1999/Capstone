import React from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

const TutorRequestDetail = () => {
  const location = useLocation();
  const tutorRequest = location.state;

  if (!tutorRequest) {
    return <div>No details available</div>;
  }

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">Tutor Request Details</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {tutorRequest.name}</p>
        <p><strong>Email:</strong> {tutorRequest.email}</p>
        <p><strong>Status:</strong> {tutorRequest.status}</p>
      </div>
    </div>
  );
};

export default TutorRequestDetail;
