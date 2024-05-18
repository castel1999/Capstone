import React from "react";
import SideBarTutorListPage from "./SideBarTutorListPage";
import NavBarTutorListPage from "./NavBarTutorListPage";

const TutorListPage = () => {
  return (
    <div>
      <div className="p-5 bg-white ">alooo</div>
      <div className="flex flex-row h-[100000px]">
        <div className="self-start sticky p-5 top-[90px] bg-white ">
          <SideBarTutorListPage />
        </div>

        <div className="flex-1 flex-col mt-[88px]">
          <NavBarTutorListPage />

          <div className="bg-yellow-500 p-5">bbbbbbbbbb</div>
        </div>
      </div>
    </div>
  );
};

export default TutorListPage;
