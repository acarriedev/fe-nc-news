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
    <section className="comment-card">
      <h6>
        {author} | {formattedDate}
      </h6>
      <article>{body}</article>
      <div className="comment-card-interact">
        <VoteUpdate votes={votes} id={comment_id} itemToUpdate="comments" />
        {author === username && (
          <CommentDeleter
            comment_id={comment_id}
            removeCommentFromState={removeCommentFromState}
          />
        )}
      </div>
    </section>
  );
};

export default CommentCard;
