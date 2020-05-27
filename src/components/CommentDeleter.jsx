import React from "react";
import * as api from "../utils/api";

const CommentDeleter = ({ comment_id, removeCommentFromState }) => {
  const handleButtonClick = () => {
    removeCommentFromState(comment_id);
    api.deleteCommentById(comment_id);
  };

  return (
    <>
      <button onClick={handleButtonClick}>delete comment</button>
    </>
  );
};

export default CommentDeleter;
