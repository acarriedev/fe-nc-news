import React from "react";

const SortBar = ({ updateSortByInState }) => {
  const handleSortClick = (event) => {
    event.preventDefault();
    const newSort = event.target.id;

    updateSortByInState(newSort);
  };

  return (
    <nav>
      <p onClick={handleSortClick} id="created_at">
        Recent
      </p>
      <p onClick={handleSortClick} id="votes">
        Top-Rated
      </p>
      <p onClick={handleSortClick} id="comment_count">
        Most-Buzz
      </p>
    </nav>
  );
};

export default SortBar;
