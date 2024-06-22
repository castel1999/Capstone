import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as TutorApi from "../../api/TutorApi";
import TutorListContent from "./TutorListContent";
import TutorListFilter from "./TutorListFilter";
import Pagination from "./Pagination";

const TutorListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(1000000);
  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorListData", page, pageSize],
    queryFn: () => TutorApi.getTutorList({ page, pageSize }),
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  // get current post
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 10 = 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0
  const currentPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(filteredData.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-row px-10 py-5">
      <div>
        <TutorListFilter
          data={data?.results}
          setFilteredData={setFilteredData}
        />
      </div>
      <div className="flex-1">
        <TutorListContent data={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredData?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TutorListPage;
