import React from "react";
import VoteUpdate from "./VoteUpdate";
import CommentDeleter from "./CommentDeleter";

const CommentCard = ({
  author,
  created_at,
  body,
  votes,
  comment_id,
  username,
  removeCommentFromState,
}) => {
  return (
    <main>
      <h6>
        {author} | {created_at}
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
