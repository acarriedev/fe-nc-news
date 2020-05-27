import React from "react";

const CommentCard = ({ author, created_at, body, votes }) => {
  return (
    <main>
      <h6>
        {author} | {created_at}
      </h6>
      <article>{body}</article>
      <p>votes: {votes}</p>
    </main>
  );
};

export default CommentCard;
