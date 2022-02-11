import React from "react";
import PaginationButton from "../components/PaginationButton";

const PaginationNavigation = ({ handlePrevPage, handleNextPage, urls }) => {
  return (
    <div className="col-12 mx-auto d-flex my-2  mt-4 justify-content-between">
      <PaginationButton
        buttonText="PREV"
        handlePageChange={handlePrevPage}
        changedUrl={urls.prevUrl}
      />
      <PaginationButton
        buttonText="NEXT"
        handlePageChange={handleNextPage}
        changedUrl={urls.nextUrl}
      />
    </div>
  );
};
export default PaginationNavigation;
