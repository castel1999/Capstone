import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import * as AdminAPI from "../../api/AdminAPI";

const TutorRequestDetail = () => {
  const { tutorId } = useParams();
  console.log(tutorId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getTutorRegisterDetail", tutorId],
    queryFn: () => AdminAPI.getTutorRegisterDetail(tutorId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const tutorRequest = data;

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">Tutor Request Details</h1>
      {/* <div className="flex flex-col gap-3 mt-5">
        <img src={tutorRequest.imageUrl} alt="Avatar" className="size-11 object-cover rounded-full items-center" />
        <div>Name: {tutorRequest.name}</div>
        <div>Email: {tutorRequest.email}</div>
        <div>Phone Number: {tutorRequest.phoneNumber || "null"}</div>
        <div>Date of Birth: {moment(tutorRequest.dateOfBirth.split("T")[0]).format("DD-MM-YYYY")}</div>
        <div>Account Created At: {moment(tutorRequest.createdAt.split("T")[0]).format("DD-MM-YYYY, h:mm:ss a")}</div>
        <div>Account Type: {tutorRequest.isPremium ? "Premium" : "Thường"}</div>
        <div>Status: {tutorRequest.status}</div>
      </div> */}
    </div>
  );
};

export default TutorRequestDetail;
