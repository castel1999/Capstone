import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as AdminAPI from "../../../api/AdminAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import About from "./About";
import Certification from "./Certification";
import Education from "./Education";
import Description from "./Description";
import Availability from "./Availability";
import Pricing from "./Pricing";
import { useAuth } from "../../../hooks/AuthContext";

const TutorRequestDetail = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { tutorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate()

  const {
    data: tutorAction,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["TutorAction"],
    queryFn: () => AdminAPI.getTutorAction(tutorId),
  });

  const tutorActionId = tutorAction?.results?.map((item) => item.tutorActionId);

  const approve = useMutation({
    mutationFn: AdminAPI.approveTutorRegister,
    onSuccess: async () => {
      toast.success("Duyệt thành công!");
      await queryClient.invalidateQueries("getTutorRegisterList");
      navigate('/dashboard/tutor-request')
    },
    onError: (error) => {
      toast.error("Duyệt thất bại!");
      console.error(error.message);
      navigate('/dashboard/tutor-request')
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <About tutorId={tutorId} />;
      case 2:
        return <Certification tutorId={tutorId} />;
      case 3:
        return <Education tutorId={tutorId} />;
      case 4:
        return <Description tutorId={tutorId} />;
      case 5:
        return <Availability tutorId={tutorId} />;
      case 6:
        return <Pricing tutorId={tutorId} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev < 6 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setActiveTab((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleDenied = () => {
    alert("Denied");
  };

  const handleApprove = () => {
    const data = {
      tutorActionId: tutorActionId[0],
      approvalID: user?.decodedToken?.ModeratorId,
    };
    approve.mutate(data);
    console.log(data);
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl mb-4">Tutor Request Details</h1>
      <p className="mb-4 flex flex-col">
        <strong>TutorId:</strong> {tutorId}
        <strong>tutorActionId :</strong>
        {tutorActionId}
      </p>
      <div className="flex justify-around mb-4">
        {[
          "Thông tin cá nhân",
          "Chứng chỉ",
          "Kinh nghiệm",
          "Mô tả",
          "Thời gian biểu",
          "Giá cả",
        ].map((step, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              activeTab === index + 1
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab(index + 1)}
          >
            {index + 1} {step}
          </div>
        ))}
      </div>
      <div className="content mb-4">{renderContent()}</div>
      <div className="flex justify-between">
        {activeTab > 1 ? (
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        {activeTab < 6 && (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        )}
        {activeTab === 6 && (
          <div className="flex gap-3">
            <button
              onClick={handleDenied}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Từ chối
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Chấp nhận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorRequestDetail;
