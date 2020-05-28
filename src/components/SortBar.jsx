import React from "react";

const SortBar = ({ updateSortByInState }) => {
  const handleSortClick = (event) => {
    event.preventDefault();
    const newSort = event.target.id;

    updateSortByInState(newSort);
  };

  return (
    <nav className="sort-bar">
      <p
        onClick={handleSortClick}
        id="created_at"
        tabIndex="0"
        className="sort-button"
      >
        Recent
      </p>
      <p
        onClick={handleSortClick}
        id="votes"
        tabIndex="0"
        className="sort-button"
      >
        Top-Rated
      </p>
      <p
        onClick={handleSortClick}
        id="comment_count"
        tabIndex="0"
        className="sort-button"
      >
        Most-Buzz
      </p>
    </nav>
  );
};

export default SortBar;
