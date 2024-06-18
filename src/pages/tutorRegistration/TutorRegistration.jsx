import React, { useState } from "react";
import rightArrow from "../../assets/right-arrow.svg";
import check from "../../assets/check.svg";
import About from "./About";
import Certification from "./Certification";
import Education from "./Education";
import Description from "./Description";
import Availability from "./Availability";
import Pricing from "./Pricing";
import FinishPage from "./FinishPage";

const TutorRegistration = () => {
  const [about, setAbout] = useState({
    profilePhoto: null,
    fullName: "",
    email: "",
    nationalId: "",
    subjects: [""],
    videoUrl: "",
  });
  const [certifications, setCertifications] = useState([
    {
      certificate: "",
      description: "",
      issuedBy: "",
      yearStart: "",
      yearEnd: "",
      image: null,
    },
  ]);
  const [educations, setEducations] = useState([
    {
      university: "",
      degree: "",
      specialization: "",
      yearStart: "",
      yearEnd: "",
      image: null,
    },
  ]);
  const [descriptions, setDescriptions] = useState({
    introduction: "",
    teachingExperience: "",
    motivation: "",
    interestingTitle: "",
  });
  const [weekSchedule, setWeekSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [price, setPrice] = useState(0);
  const [stage, setStage] = useState(1);
  const [tutorId, setTutorId] = useState("");
  const [isStage1Completed, setIsStage1Completed] = useState(false);
  const [isStage2Completed, setIsStage2Completed] = useState(false);
  const [isStage3Completed, setIsStage3Completed] = useState(false);
  const [isStage4Completed, setIsStage4Completed] = useState(false);
  const [isStage5Completed, setIsStage5Completed] = useState(false);
  const [isStageAllCompleted, setIsStageAllCompleted] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full bg-[#f4f4f8] px-6 py-2 justify-center gap-2">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(1)}
        >
          {stage === 1 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              1
            </div>
          ) : (
            <img className="h-5 w-5 p-1 bg-black rounded-md" src={check} />
          )}
          <div className="text-[18px]">Thông tin cá nhân</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={isStage1Completed ? () => setStage(2) : ""}
        >
          {stage < 2 ? (
            <div className="flex justify-center items-center h-5 w-5">2</div>
          ) : stage === 2 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              2
            </div>
          ) : (
            <img className="h-5 w-5 bg-black rounded-md p-1" src={check} />
          )}

          <div className="text-[18px]">Chứng chỉ</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={isStage2Completed ? () => setStage(3) : ""}
        >
          {stage < 3 ? (
            <div className="flex justify-center items-center h-5 w-5">3</div>
          ) : stage === 3 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              3
            </div>
          ) : (
            <img className="h-5 w-5 bg-black rounded-md p-1" src={check} />
          )}
          <div className="text-[18px]">Kinh nghiệm</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={isStage3Completed ? () => setStage(4) : ""}
        >
          {stage < 4 ? (
            <div className="flex justify-center items-center h-5 w-5">4</div>
          ) : stage === 4 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              4
            </div>
          ) : (
            <img className="h-5 w-5 bg-black rounded-md p-1" src={check} />
          )}
          <div className="text-[18px]">Mô tả</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={isStage4Completed ? () => setStage(5) : ""}
        >
          {stage < 5 ? (
            <div className="flex justify-center items-center h-5 w-5">5</div>
          ) : stage === 5 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              5
            </div>
          ) : (
            <img className="h-5 w-5 bg-black rounded-md p-1" src={check} />
          )}
          <div className="text-[18px]">Thời gian biểu</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={isStage5Completed ? () => setStage(6) : ""}
        >
          {isStageAllCompleted ? (
            <img className="h-5 w-5 bg-black rounded-md p-1" src={check} />
          ) : stage < 6 ? (
            <div className="flex justify-center items-center h-5 w-5">6</div>
          ) : stage === 6 ? (
            <div className="flex justify-center items-center h-5 w-5 bg-black text-white rounded-md">
              6
            </div>
          ) : ''}
          <div className="text-[18px]">Giá cả</div>
        </div>
      </div>

      <div className="w-[50%]">
        {isStageAllCompleted ? (
          <FinishPage />
        ) : (
          <>
            {stage === 1 ? (
              <About
                setIsStage1Completed={setIsStage1Completed}
                setStage={setStage}
                about={about}
                setAbout={setAbout}
                setTutorId={setTutorId}
              />
            ) : (
              ""
            )}
            {stage === 2 ? (
              <Certification
                setIsStage2Completed={setIsStage2Completed}
                setStage={setStage}
                tutorId={tutorId}
                certifications={certifications}
                setCertifications={setCertifications}
              />
            ) : (
              ""
            )}
            {stage === 3 ? (
              <Education
                setIsStage3Completed={setIsStage3Completed}
                setStage={setStage}
                educations={educations}
                setEducations={setEducations}
                tutorId={tutorId}
              />
            ) : (
              ""
            )}
            {stage === 4 ? (
              <Description
                setIsStage4Completed={setIsStage4Completed}
                setStage={setStage}
                descriptions={descriptions}
                setDescriptions={setDescriptions}
                tutorId={tutorId}
              />
            ) : (
              ""
            )}
            {stage === 5 ? (
              <Availability
                setIsStage5Completed={setIsStage5Completed}
                setStage={setStage}
                weekSchedule={weekSchedule}
                setWeekSchedule={setWeekSchedule}
                tutorId={tutorId}
              />
            ) : (
              ""
            )}
            {stage === 6 ? (
              <Pricing
                setIsStageAllCompleted={setIsStageAllCompleted}
                setStage={setStage}
                price={price}
                setPrice={setPrice}
                tutorId={tutorId}
              />
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TutorRegistration;
