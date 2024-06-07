import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import * as TutorApi from "../../api/TutorApi";
import TutorListContent from "./TutorListContent";
import TutorListFilter from "./TutorListFilter";

const TutorListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  const {
    data = {
      results: [],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 0,
    },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutorListData", page, pageSize],
    queryFn: () => TutorApi.getTutorList({ page, pageSize }),
    keepPreviousData: true,
    onSuccess: (data) => setFilteredData(data.results),
  });

  if(isLoading){
    return <div>...Loading</div>
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const Pagination = () => {
    const getPaginationItems = () => {
      const pages = [];
      for (let i = 1; i <= data.totalPages; i++) {
        pages.push(
          <a
            key={i}
            href="#"
            onClick={() => handlePageClick(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              page === i
                ? "bg-indigo-600 text-white"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }`}
          >
            {i}
          </a>
        );
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={handlePreviousPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            onClick={handleNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * 10 + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * 10, data.totalRecords)}
              </span>{" "}
              of <span className="font-medium">{data.totalRecords}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                onClick={handlePreviousPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
              </a>
              {getPaginationItems()}
              <a
                href="#"
                onClick={handleNextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <FaAngleRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col px-10 py-5">
      <div>
        <TutorListFilter data={data?.results} setFilteredData={setFilteredData} />
      </div>
      <div className="flex-1">
        <TutorListContent data={filteredData} />
        <Pagination />
      </div>
    </div>
  );
};

export default TutorListPage;
