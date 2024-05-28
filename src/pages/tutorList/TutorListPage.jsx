import React from "react";
import TutorListFilter from "./TutorListFilter";
import TutorListContent from "./TutorListContent";

const TutorListPage = () => {
  return (
    <div>
      <div>
        <TutorListFilter />
      </div>
      <div className="flex flex-col gap-3">
        <TutorListContent />
      </div>
    </div>
  );
};

export default TutorListPage;
