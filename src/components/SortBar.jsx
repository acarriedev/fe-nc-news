import React from "react";

const SortBar = ({ updateSortBy }) => {
  const handleSortClick = (event, newSort) => {
    event.preventDefault();

    updateSortBy(newSort);
  };

  return (
    <nav className="sort-bar">
      <button
        onClick={(event) => {
          handleSortClick(event, "created_at");
        }}
        className="sort-button"
      >
        <p>Recent</p>
      </button>
      <button
        onClick={(event) => {
          handleSortClick(event, "votes");
        }}
        className="sort-button"
      >
        <p>Top-Rated</p>
      </button>
      <button
        onClick={(event) => {
          handleSortClick(event, "comment_count");
        }}
        className="sort-button"
      >
        <p>Most-Buzz</p>
      </button>
    </nav>
  );
};

export default SortBar;
