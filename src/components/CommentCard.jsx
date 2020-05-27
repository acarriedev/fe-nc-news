import React from "react";
import VoteUpdate from "./VoteUpdate";

const CommentCard = ({ author, created_at, body, votes, comment_id }) => {
  return (
    <main>
      <h6>
        {author} | {created_at}
      </h6>
      <article>{body}</article>
      <VoteUpdate votes={votes} id={comment_id} itemToUpdate="comments" />
    </main>
  );
};

export default CommentCard;
