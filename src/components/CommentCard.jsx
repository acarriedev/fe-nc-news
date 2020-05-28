import React from "react";
import VoteUpdate from "./VoteUpdate";
import CommentDeleter from "./CommentDeleter";
import { dateFormatter } from "../utils/utils";

const CommentCard = ({
  author,
  created_at,
  body,
  votes,
  comment_id,
  username,
  removeCommentFromState,
}) => {
  const formattedDate = dateFormatter(created_at);

  return (
    <main>
      <h6>
        {author} | {formattedDate}
      </h6>
      <article>{body}</article>
      <VoteUpdate votes={votes} id={comment_id} itemToUpdate="comments" />
      {author === username && (
        <CommentDeleter
          comment_id={comment_id}
          removeCommentFromState={removeCommentFromState}
        />
      )}
    </main>
  );
};

export default CommentCard;
