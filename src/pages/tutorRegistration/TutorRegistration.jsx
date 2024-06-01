import React, { useState } from "react";
import rightArrow from "../../assets/right-arrow.svg";
import check from "../../assets/check.svg";
import About from "./About";
import Photo from "./Photo";
import Certification from "./Certification";
import Education from "./Education";
import Description from "./Description";
import Video from "./Video";
import Availability from "./Availability";
import Pricing from "./Pricing";

const TutorRegistration = () => {
  const [stage, setStage] = useState(1);
  const [isStage1Completed, setIsStage1Completed] = useState(false);
  const [isStage2Completed, setIsStage2Completed] = useState(false);
  const [isStage3Completed, setIsStage3Completed] = useState(false);
  const [isStage4Completed, setIsStage4Completed] = useState(false);
  const [isStage5Completed, setIsStage5Completed] = useState(false);
  const [isStage6Completed, setIsStage6Completed] = useState(false);
  const [isStage7Completed, setIsStage7Completed] = useState(false);
  const [isStageAllCompleted, setIsStageAllCompleted] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full bg-[#f4f4f8] px-6 py-2 justify-center gap-2">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(1)}
        >
          {stage === 1 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              1
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">About</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(2)}
        >
          {stage < 2 ? (
            <div className="flex justify-center items-center h-8 w-8">2</div>
          ) : stage === 2 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              2
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">Photo</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(3)}
        >
          {stage < 3 ? (
            <div className="flex justify-center items-center h-8 w-8">3</div>
          ) : stage === 3 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              3
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}

          <div className="">Certification</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(4)}
        >
          {stage < 4 ? (
            <div className="flex justify-center items-center h-8 w-8">4</div>
          ) : stage === 4 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              4
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">Education</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(5)}
        >
          {stage < 5 ? (
            <div className="flex justify-center items-center h-8 w-8">5</div>
          ) : stage === 5 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              5
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">Description</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(6)}
        >
          {stage < 6 ? (
            <div className="flex justify-center items-center h-8 w-8">6</div>
          ) : stage === 6 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              6
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}

          <div className="">Video</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(7)}
        >
          {stage < 7 ? (
            <div className="flex justify-center items-center h-8 w-8">7</div>
          ) : stage === 7 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              7
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">Availability</div>
          <img className="h-3 w-3" src={rightArrow} />
        </div>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setStage(8)}
        >
          {stage < 8 ? (
            <div className="flex justify-center items-center h-8 w-8">8</div>
          ) : stage === 8 ? (
            <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-md">
              8
            </div>
          ) : (
            <img className="h-8 w-8 bg-black rounded-md" src={check} />
          )}
          <div className="">Pricing</div>
        </div>
      </div>

      <div className="w-2/5">
        {stage === 1 ? (<About setIsStage1Completed={setIsStage1Completed}/>) : ''}
        {stage === 2 ? (<Photo setIsStage1Completed={setIsStage2Completed}/>) : ''}
        {stage === 3 ? (<Certification setIsStage1Completed={setIsStage3Completed}/>) : ''}
        {stage === 4 ? (<Education setIsStage1Completed={setIsStage4Completed}/>) : ''}
        {stage === 5 ? (<Description setIsStage1Completed={setIsStage5Completed}/>) : ''}
        {stage === 6 ? (<Video setIsStage1Completed={setIsStage6Completed}/>) : ''}
        {stage === 7 ? (<Availability setIsStage1Completed={setIsStage7Completed}/>) : ''}
        {stage === 8 ? (<Pricing setIsStageAllCompleted={setIsStageAllCompleted}/>) : ''}
      </div>
    </div>
  );
};

export default TutorRegistration;
