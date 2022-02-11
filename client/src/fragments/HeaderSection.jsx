import React from "react";

const HeaderSection = ({ handleSort, urls }) => {
  return (
    <div className="d-flex justify-content-between align-items-center bg-grey p-2  border rounded-3">
      <h2>Friends List</h2>
      <button className="btn btn-sm btn-outline-info" onClick={handleSort}>
        {urls.currentUrl.includes("Friend") ? "Sort" : "Unsort"}
      </button>
    </div>
  );
};

export default HeaderSection;
