import React from "react";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = pageNumbers.length;
  let startPage, endPage;

  if (totalPages <= maxPageNumbersToShow) {
    // total pages less than max, show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max, calculate start and end pages
    if (currentPage <= Math.floor(maxPageNumbersToShow / 2)) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (
      currentPage + Math.floor(maxPageNumbersToShow / 2) >=
      totalPages
    ) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
      endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
    }
  }

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className={`text-xl py-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:text-dark-purple"
        }`}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-xl py-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:text-dark-purple"
        }`}
      >
        <MdNavigateBefore />
      </button>
      {visiblePages.map((number) => (
        <div
          key={number}
          onClick={() => paginate(number)}
          className={`cursor-pointer px-4 py-2 hover:text-dark-purple hover:font-semibold ${
            number === currentPage ? "font-semibold border-2 rounded-lg border-dark-purple text-dark-purple" : ""
          }`}
        >
          {number}
        </div>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-xl py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:text-dark-purple"
        }`}
      >
        <MdNavigateNext />
      </button>
      <button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
        className={`text-xl py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:text-dark-purple"
        }`}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
