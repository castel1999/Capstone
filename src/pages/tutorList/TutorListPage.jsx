import React from "react";
import TutorListFilter from "./TutorListFilter";
import TutorListContent from "./TutorListContent";

const TutorListPage = () => {
  return (
    <div className="flex flex-row px-10 py-5">
      <div>
        <TutorListFilter />
      </div>
      <div className="flex-1">
        <TutorListContent />
      </div>
    </div>
  );
};

export default TutorListPage;
