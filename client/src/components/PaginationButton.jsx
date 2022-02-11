import React from "react";

const PaginationButton = ({ buttonText, handlePageChange, changedUrl }) => {
  return (
    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={handlePageChange}
      disabled={!changedUrl}
    >
      {buttonText}
    </button>
  );
};

export default PaginationButton;
