import React from "react";

const About = (props) => {
  const setIsStage1Completed = props.setIsStage1Completed;
  return (
    <div className="flex flex-col p-12 gap-6">
      <div className="text-[32px] font-semibold">About</div>
      <div className="text-[16px] ">
        Start creating your public tutor profile. Your progress will be
        automatically saved as you complete each section. You can return at any
        time to finish your registration.
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="text"
            id="firstName"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="text"
            id="lastName"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            type="email"
            id="lastName"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject">Subject taught</label>
          <input
            className="px-[14px] py-[10px] border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#6B48F2] hover:border-black"
            list="subjects"
            name="subject"
            id="subject"
            required
          />
          <datalist id="subjects">
            <option value="Math" />
            <option value="Science" />
            <option value="Chemistry" />
            <option value="Literature" />
            <option value="Englist" />
          </datalist>
        </div>
        <div className="flex flex-row-reverse">
          <input className="cursor-pointer px-6 py-3 border-2 border-black rounded-lg font-semibold bg-theme text-white" type="submit" value="Save and continue" />
        </div>
      </form>
    </div>
  );
};

export default About;
