import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as TutorApi from "../../api/TutorApi";
import TutorListContent from "./TutorListContent";
import TutorListFilter from "./TutorListFilter";
import Pagination from "./Pagination";

const TutorListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(1000000);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchUser, setSearchUser] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([10000, 100000]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tutorListData"],
    queryFn: () => TutorApi.getTutorList({ page, pageSize }),
  });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  console.log("list", data);

  const filteredData = data?.results?.filter((item) => {
    const matchesName = item.tutorName
      .toLowerCase()
      .includes(searchUser.toLowerCase());
    const matchesSubject = selectedSubject
      ? item.subjects.some((subject) => subject.title === selectedSubject)
      : true;
    const withinPriceRange = 
      item.pricePerHour >= priceRange[0] && item.pricePerHour <= priceRange[1];
    const status = item.status === 1;
    return matchesName && matchesSubject && withinPriceRange && status;
  });

  const sortedData = filteredData?.sort((a, b) => {
    switch (sortOption) {
      case "priceHighToLow":
        return b.pricePerHour - a.pricePerHour;
      case "priceLowToHigh":
        return a.pricePerHour - b.pricePerHour;
      case "bestRating":
        const avgRatingA =
          a.ratings.reduce((acc, rating) => acc + rating.score, 0) /
          (a.ratings.length || 1);
        const avgRatingB =
          b.ratings.reduce((acc, rating) => acc + rating.score, 0) /
          (b.ratings.length || 1);
        return avgRatingB - avgRatingA;
      default:
        return 0;
    }
  });

  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchInput = (event) => {
    setSearchUser(event.target.value);
  };

  const handleSubjectFilter = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(data?.results?.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-row px-10 py-5">
      <div>
        <TutorListFilter
          onSearchChange={handleSearchInput}
          onSubjectChange={handleSubjectFilter}
          onSortChange={handleSortChange}
          onPriceChange={handlePriceChange}
          priceRange={priceRange}
        />
      </div>
      <div className="flex-1">
        <TutorListContent data={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={sortedData?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TutorListPage;
